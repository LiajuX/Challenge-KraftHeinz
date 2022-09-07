import { useEffect, useState } from 'react'
import { addDays, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Alarm, Plus } from 'phosphor-react'
import { IoCheckmarkCircleOutline } from 'react-icons/io5'

import { Button } from '../../../../components/Button'
import { Modal } from '../../../../components/Modal'
import { Subtask } from '../../../../components/Task/TaskEvaluationModal'

import reportImg from '../../../../assets/report.svg'
import cameraImg from '../../../../assets/camera.svg'
import videoImg from '../../../../assets/video.svg'

import * as S from './styles'

interface TaskDetailsModalProps {
  onCloseModal: () => void
}

interface Icon {
  name: 'report' | 'camera' | 'video'
  path: string
}

interface Employee {
  id: string
  name: string
  username: string
  avatar_url: string
  role: string
  role_title: string
  potential: 'A' | 'B' | 'C'
  task_amount: number
  last_evaluation: Date
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

const teamMembers: Employee[] = [
  {
    id: '1234789',
    name: 'Diego Galvão',
    username: 'diego3g',
    avatar_url: 'https://avatars.githubusercontent.com/u/4669899?v=4',
    role: 'it',
    role_title: 'TI',
    potential: 'A',
    task_amount: 26,
    last_evaluation: new Date(2022, 6, 18),
  },
  {
    id: '1239',
    name: 'Carol Medeiros',
    username: 'carolmedeiros',
    avatar_url: 'https://github.com/rafaballerini.png',
    role: 'dev',
    role_title: 'Desenvolvedora',
    potential: 'A',
    task_amount: 32,
    last_evaluation: new Date(2022, 6, 20),
  },
  {
    id: '12389',
    name: 'Vinicius Amâncio',
    username: 'viniciusamancio',
    avatar_url: 'https://github.com/luizbatanero.png',
    role: 'design',
    role_title: 'Designer',
    potential: 'C',
    task_amount: 19,
    last_evaluation: new Date(2022, 7, 24),
  },
]

const username = 'jakelinycarvalho'

export function NewTaskModal({ onCloseModal }: TaskDetailsModalProps) {
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState<null | Date>(null)
  const [description, setDescription] = useState('')
  const [hasSubtasks, setHasSubtasks] = useState(false)
  const [subtasks, setSubtasks] = useState<Subtask[]>([])
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('')
  const [newSubtaskDescription, setNewSubtaskDescription] = useState('')
  const [newSubtaskDueDate, setNewSubtaskDueDate] = useState<null | Date>(null)
  const [employeeAssignedTo, setEmployeeAssignedTo] = useState('')
  const [taskIcon, setTaskIcon] = useState({} as Icon)

  const isManager = true

  function handleToggleHasSubtasks() {
    setHasSubtasks((state) => !state)
  }

  function handleIconSelection(icon: Icon) {
    setTaskIcon(icon)
  }

  function handleCreateTask() {
    console.log({
      title,
      dueDate,
      description,
      hasSubtasks,
      employeeAssignedTo,
      taskIcon: taskIcon.name,
      subtasks,
    })

    onCloseModal()
  }

  function handleCreateExtraTask() {
    console.log({
      title,
      due_date: new Date(),
      isExtra: true,
      description,
      employeeAssignedTo: username,
      taskIcon: taskIcon.name,
    })

    onCloseModal()
  }

  return (
    <S.NewTaskContainer>
      <header>
        <strong>Nova entrega</strong>

        {isManager && (
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
        <S.AddFileButton>
          <Plus size={18} />
        </S.AddFileButton>
      </S.FilesContainer>

      {isManager && (
        <>
          <span>Subtarefas</span>

          <S.CheckboxContainer
            onClick={handleToggleHasSubtasks}
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

                    {subtask.due_date && (
                      <time>
                        {format(subtask.due_date, 'dd/MM/yyyy', {
                          locale: ptBR,
                        })}
                      </time>
                    )}
                  </S.DueDate>
                </header>

                <h3>{subtask.title}</h3>
              </S.SubtaskButton>
            ))}

          {hasSubtasks && (
            <S.AddNewSubtask>
              <Plus size={24} />
            </S.AddNewSubtask>
          )}

          <span>Colaborador</span>

          <S.ImagesContainer>
            {teamMembers.map((teamMember) => (
              <S.AvatarContainer
                key={teamMember.name}
                isActive={employeeAssignedTo === teamMember.username}
                onClick={() => setEmployeeAssignedTo(teamMember.username)}
              >
                <img src={teamMember.avatar_url} alt={teamMember.name} />

                {employeeAssignedTo === teamMember.username && (
                  <IoCheckmarkCircleOutline size={58} />
                )}
              </S.AvatarContainer>
            ))}
          </S.ImagesContainer>
        </>
      )}

      <span>Ícone</span>

      <S.ImagesContainer>
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
      </S.ImagesContainer>

      <S.ButtonContainer>
        <Button
          title="Postar"
          buttonStyle="secondary"
          onClick={isManager ? handleCreateTask : handleCreateExtraTask}
        />
      </S.ButtonContainer>
    </S.NewTaskContainer>
  )
}
