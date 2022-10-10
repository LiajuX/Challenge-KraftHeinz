import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  Timestamp,
  where,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { useDropzone } from 'react-dropzone'
import { Alarm, Plus, X } from 'phosphor-react'
import { IoCheckmarkCircleOutline } from 'react-icons/io5'
import DatePicker from 'react-datepicker'

import { useAuth } from '../../../../hooks/useAuth'
import { User } from '../../../../contexts/AuthContext'

import { database, storage } from '../../../../services/firebase'

import { Button } from '../../../../components/Button'
import { FileInput } from '../../../../components/FileInput'
import { File, FileType } from '../../../../components/File'

import reportImg from '../../../../assets/report.svg'
import cameraImg from '../../../../assets/camera.svg'
import videoImg from '../../../../assets/video.svg'

import * as S from './styles'
import { TaskType } from '../../../../components/Task'

interface TaskDetailsModalProps {
  onCloseModal: () => void
}

interface Icon {
  name: 'report' | 'camera' | 'video'
  path: string
}

const icons: Icon[] = [
  {
    name: 'report',
    path: reportImg,
  },
  {
    name: 'camera',
    path: cameraImg,
  },
  {
    name: 'video',
    path: videoImg,
  },
]

export function NewTaskModal({ onCloseModal }: TaskDetailsModalProps) {
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState<null | Date>(null)
  const [description, setDescription] = useState('')
  const [files, setFiles] = useState<FileType[]>([])
  const [hasSubtasks, setHasSubtasks] = useState(false)
  const [subtasks, setSubtasks] = useState<TaskType[]>([])
  const [availableEmployees, setAvailableEmployees] = useState<User[]>([])
  const [employeeAssignedTo, setEmployeeAssignedTo] = useState('')
  const [taskIcon, setTaskIcon] = useState({} as Icon)
  const [isSendingData, setIsSendingData] = useState(false)

  const { user } = useAuth()

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isFocused,
    isDragReject,
  } = useDropzone()

  const employeesLocalStorageKey = '@kraftheinz:employees'

  const isButtonDisabled = user?.is_manager
    ? !(
        !!title &&
        !!dueDate &&
        !!description &&
        !!taskIcon &&
        !!employeeAssignedTo
      )
    : !(!!title && !!description && !!taskIcon)

  function handleAddNewSubtask() {
    setSubtasks((oldValue) => [
      ...oldValue,
      {
        id: uuidv4(),
        title: '',
        description: '',
        due_date: null,
        assigned_to: user?.id,
        is_subtask: true,
      } as TaskType,
    ])
  }

  function handleRemoveNewSubtask(currentSubtask: TaskType) {
    const filteredSubtasks = subtasks.filter(
      (subtask) => subtask.id !== currentSubtask.id,
    )

    setSubtasks(filteredSubtasks)
  }

  function handleEmployeeSelection(employeeId: string) {
    if (employeeId === employeeAssignedTo) {
      setEmployeeAssignedTo('')
    } else {
      setEmployeeAssignedTo(employeeId)
    }
  }

  function handleIconSelection(icon: Icon) {
    if (taskIcon.name === icon.name) {
      setTaskIcon({} as Icon)
    } else {
      setTaskIcon(icon)
    }
  }

  const handleSubtaskTitleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, currentSubtask: TaskType) => {
      const subtaskUpdated = {
        ...currentSubtask,
        title: event.target.value,
      }

      const subtasksUpdated = subtasks.map((subtask) => {
        if (subtask.id !== currentSubtask.id) {
          return subtask
        } else {
          return subtaskUpdated
        }
      })

      setSubtasks(subtasksUpdated)
    },
    [subtasks],
  )

  const handleSubtaskDueDateChange = useCallback(
    (date: Date, currentSubtask: TaskType) => {
      const subtaskUpdated = {
        ...currentSubtask,
        due_date: date,
      }

      const subtasksUpdated = subtasks.map((subtask) => {
        if (subtask.id !== currentSubtask.id) {
          return subtask
        } else {
          return subtaskUpdated
        }
      })

      setSubtasks(subtasksUpdated)
    },
    [subtasks],
  )

  const handleSubtaskDescriptionChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>, currentSubtask: TaskType) => {
      const subtaskUpdated = {
        ...currentSubtask,
        description: event.target.value,
      }

      const subtasksUpdated = subtasks.map((subtask) => {
        if (subtask.id !== currentSubtask.id) {
          return subtask
        } else {
          return subtaskUpdated
        }
      })

      setSubtasks(subtasksUpdated)
    },
    [subtasks],
  )

  const sendFilesToCloudStorage = useCallback(
    async (taskId: string) => {
      const storedFiles: FileType[] = []

      acceptedFiles.forEach(async (file) => {
        const storageRef = ref(
          storage,
          `/attachments/${user?.id}/tasks/${taskId}/${file.name}`,
        )

        const uploadFileTask = uploadBytesResumable(storageRef, file)

        uploadFileTask.on(
          'state_changed',
          (snapshot) => {},
          (error) => {
            console.log(error.message)
          },
          () => {
            getDownloadURL(uploadFileTask.snapshot.ref).then((downloadURL) => {
              const newFile = { name: file.name, url: downloadURL }

              storedFiles.push(newFile)

              setFiles([...storedFiles])
            })
          },
        )
      })
    },
    [acceptedFiles, user?.id],
  )

  const handleCreateNewTask = useCallback(async () => {
    setIsSendingData(true)

    const taskRef = collection(database, 'tasks')

    await addDoc(taskRef, {
      title,
      due_date: Timestamp.fromDate(user!.is_manager ? dueDate! : new Date()),
      managed_by: user!.is_manager ? user!.id : user!.manager_id,
      is_extra: !user!.is_manager,
      description,
      is_subtask: false,
      assigned_to: user!.is_manager ? employeeAssignedTo : user!.id,
      icon: taskIcon.name,
      subtasks: hasSubtasks ? subtasks : null,
    })
      .then((taskCreated) => {
        if (acceptedFiles.length > 0) {
          sendFilesToCloudStorage(taskCreated.id)
        }
      })
      .catch(() => {
        window.alert('Não foi possível criar nova tarefa!')
      })
      .finally(() => {
        setIsSendingData(false)
        onCloseModal()
      })
  }, [
    acceptedFiles.length,
    description,
    dueDate,
    employeeAssignedTo,
    hasSubtasks,
    onCloseModal,
    sendFilesToCloudStorage,
    subtasks,
    taskIcon.name,
    title,
    user,
  ])

  useEffect(() => {
    const employeesQuery = query(
      collection(database, 'users'),
      where('manager_id', '==', user!.id),
    )

    const unsubscribe = onSnapshot(employeesQuery, (querySnapshot) => {
      const employees: User[] = []

      querySnapshot.forEach((doc) => {
        employees.push({
          id: doc.id,
          ...doc.data(),
        } as User)
      })

      const employeesLocalData = localStorage.getItem(employeesLocalStorageKey)
      const formattedLocalData =
        employeesLocalData && JSON.parse(employeesLocalData)

      setAvailableEmployees(employees || formattedLocalData)
      localStorage.setItem(employeesLocalStorageKey, JSON.stringify(employees))
    })

    return () => {
      unsubscribe()
    }
  }, [user])

  return (
    <S.NewTaskContainer>
      <header>
        <strong>Nova entrega</strong>

        <S.DueDate>
          <label htmlFor="date-picker">
            <Alarm weight="bold" size={20} />
          </label>

          <DatePicker
            id="date-picker"
            dateFormat="dd/MM/yyyy"
            selected={dueDate}
            placeholderText="Selecione um prazo"
            closeOnScroll={(e) => e.target === document}
            onChange={(date: Date) => setDueDate(date)}
          />
        </S.DueDate>
      </header>

      <S.TitleInput
        value={title}
        placeholder="Clique para adicionar um título"
        onChange={(e) => setTitle(e.target.value)}
      />

      <span>Descrição</span>

      <S.Textarea
        value={description}
        placeholder="Cliquei aqui para adicionar descrição"
        onChange={(e) => setDescription(e.target.value)}
      />

      <span>Arquivos</span>

      <S.FilesContainer>
        {acceptedFiles.map((file) => (
          <File
            key={file.name}
            data={{ name: file.name }}
            taskAttached="Entrega"
          />
        ))}

        <FileInput
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          acceptedFiles={acceptedFiles}
          isDragReject={isDragReject}
          isFocused={isFocused}
        />
      </S.FilesContainer>

      {user?.is_manager && (
        <>
          <span>Subtarefas</span>

          <S.CheckboxContainer
            onClick={() => setHasSubtasks((oldValue) => !oldValue)}
            isActive={hasSubtasks}
          >
            <div />
            <span>Possui subtarefas</span>
          </S.CheckboxContainer>

          {hasSubtasks &&
            subtasks.length > 0 &&
            subtasks.map((subtask, index) => (
              <S.SubtaskContainer key={subtask.id}>
                <header>
                  <div>
                    <strong>Nova entrega</strong>
                    <span> / </span>
                    <strong>Nova subtarefa {index + 1}</strong>
                  </div>

                  <button onClick={() => handleRemoveNewSubtask(subtask)}>
                    <X weight="bold" size={18} onClick={() => {}} />
                  </button>
                </header>

                <S.SubtaskDueDateContainer>
                  <S.DueDate>
                    <label htmlFor="subtask-date-picker">
                      <Alarm weight="bold" size={20} />
                    </label>

                    <DatePicker
                      id="subtask-date-picker"
                      dateFormat="dd/MM/yyyy"
                      selected={subtask.due_date}
                      maxDate={dueDate}
                      placeholderText="Selecione um prazo"
                      onChange={(date: Date) =>
                        handleSubtaskDueDateChange(date, subtask)
                      }
                    />
                  </S.DueDate>
                </S.SubtaskDueDateContainer>

                <S.TitleInput
                  defaultValue={subtask.title}
                  placeholder="Clique para adicionar um título"
                  onChange={(event) => handleSubtaskTitleChange(event, subtask)}
                />

                <span>Descrição</span>

                <S.Textarea
                  defaultValue={subtask.description}
                  placeholder="Cliquei aqui para adicionar descrição"
                  onChange={(event) =>
                    handleSubtaskDescriptionChange(event, subtask)
                  }
                />
              </S.SubtaskContainer>
            ))}

          {hasSubtasks && (
            <S.AddNewSubtask onClick={handleAddNewSubtask}>
              <Plus size={24} />
            </S.AddNewSubtask>
          )}

          <span>Colaborador</span>

          <S.ButtonsContainer>
            {availableEmployees.map((employee) => (
              <S.AvatarContainer
                key={employee.id}
                isActive={employeeAssignedTo === employee.id}
                onClick={() => handleEmployeeSelection(employee.id)}
              >
                <img src={employee.avatar_url} alt={employee.name} />

                {employeeAssignedTo === employee.id && (
                  <IoCheckmarkCircleOutline size={58} />
                )}
              </S.AvatarContainer>
            ))}
          </S.ButtonsContainer>
        </>
      )}

      <span>Ícone</span>

      <S.ButtonsContainer>
        {icons.map((icon) => (
          <S.IconContainer
            key={icon.name}
            iconStyle={icon.name}
            isActive={taskIcon.name === icon.name}
            onClick={() => handleIconSelection(icon)}
          >
            <img src={icon.path} alt="Ícone da tarefa" />

            {taskIcon.name === icon.name && (
              <IoCheckmarkCircleOutline size={58} />
            )}
          </S.IconContainer>
        ))}
      </S.ButtonsContainer>

      <S.ButtonContainer>
        <Button
          title="Postar"
          buttonStyle="secondary"
          isLoading={isSendingData}
          disabled={isButtonDisabled}
          onClick={handleCreateNewTask}
        />
      </S.ButtonContainer>
    </S.NewTaskContainer>
  )
}
