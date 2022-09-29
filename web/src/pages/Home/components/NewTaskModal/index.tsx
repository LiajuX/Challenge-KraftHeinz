import { useEffect, useState } from 'react'
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  Timestamp,
  where,
} from 'firebase/firestore'
import { addDays, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Alarm, Plus } from 'phosphor-react'
import { IoCheckmarkCircleOutline } from 'react-icons/io5'

import { useAuth } from '../../../../hooks/useAuth'
import { User } from '../../../../contexts/AuthContext'

import { TaskProps } from '../../../../components/Task/TaskEvaluationModal'
import { Button } from '../../../../components/Button'
import { FileInput } from '../../../../components/FileInput'

import reportImg from '../../../../assets/report.svg'
import cameraImg from '../../../../assets/camera.svg'
import videoImg from '../../../../assets/video.svg'

import * as S from './styles'
import { database } from '../../../../services/firebase'

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

const username = 'jakelinycarvalho'

export function NewTaskModal({ onCloseModal }: TaskDetailsModalProps) {
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState<null | Date>(null)
  const [description, setDescription] = useState('')
  const [hasSubtasks, setHasSubtasks] = useState(false)
  const [subtasks, setSubtasks] = useState<TaskProps[]>([])
  const [availableEmployees, setAvailableEmployees] = useState<User[]>([])
  const [employeeAssignedTo, setEmployeeAssignedTo] = useState('')
  const [taskIcon, setTaskIcon] = useState({} as Icon)

  const { user } = useAuth()

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
    setSubtasks((oldValue) => [...oldValue, {} as TaskProps])
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

  async function handleCreateTask() {
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
      finished_date: user!.is_manager ? null : Timestamp.fromDate(new Date()),
    })
      .then(() => {
        onCloseModal()
      })
      .catch(() => {
        window.alert('Não foi possível criar nova tarefa!')
      })
  }

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

        {user?.is_manager && (
          <S.DueDate>
            <Alarm weight="bold" size={20} />

            <input
              id="due-date"
              type="text"
              placeholder="Selecione um prazo"
              onFocus={(e) => (e.target.type = 'date')}
              value={
                dueDate
                  ? format(addDays(dueDate, 1), 'yyyy-MM-dd', { locale: ptBR })
                  : undefined
              }
              onChange={(e) => setDueDate(new Date(e.target.value))}
              min="2018-01-01"
            />
          </S.DueDate>
        )}
      </header>

      <S.TitleInput
        value={title}
        placeholder="Clique para adicionar um título"
        onChange={(e) => setTitle(e.target.value)}
      />

      <span>Descrição</span>

      <textarea
        value={description}
        placeholder="Cliquei aqui para adicionar descrição"
        onChange={(e) => setDescription(e.target.value)}
      />

      <span>Arquivos</span>

      <S.FilesContainer>
        <FileInput />
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
              <S.SubtaskButton
                key={`${subtask.title}-${subtask.due_date}`}
                onClick={() => {}}
              >
                <header>
                  <strong>Subtarefa {index + 1}</strong>
                  <S.DueDate>
                    <Alarm weight="bold" size={20} />

                    {subtask.due_date ? (
                      <time>
                        {format(subtask.due_date, 'dd/MM/yyyy', {
                          locale: ptBR,
                        })}
                      </time>
                    ) : (
                      <span>Selecione um prazo</span>
                    )}
                  </S.DueDate>
                </header>

                <h3>{subtask.title || 'Clique para adicionar um nome'}</h3>
              </S.SubtaskButton>
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
          disabled={isButtonDisabled}
          onClick={handleCreateTask}
        />
      </S.ButtonContainer>
    </S.NewTaskContainer>
  )
}
