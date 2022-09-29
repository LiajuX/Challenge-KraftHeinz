import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Alarm } from 'phosphor-react'

import { useAuth } from '../../../hooks/useAuth'

import { FileInput } from '../../FileInput'
import { StaffContent } from './StaffContent'
import { ManagerContent } from './ManagerContent'
import { Button } from '../../Button'

import * as S from './styles'

export interface TaskProps {
  id?: string
  title: string
  description: string
  parent_task_title?: string
  due_date: Date | null
  files?: []
  is_subtask: boolean
  subtasks?: TaskProps[]
}

interface TaskDetailsModalProps {
  data: TaskProps
  onCloseModal: () => void
}

export function TaskEvaluationModal({
  data,
  onCloseModal,
}: TaskDetailsModalProps) {
  const [taskData, setTaskData] = useState<TaskProps>(data)

  const { user } = useAuth()

  const parentTask = data

  const parentTaskShortTitle =
    parentTask.title.split(' ').length <= 3
      ? parentTask.title
      : parentTask.title.split(' ').slice(0, 3).join(' ') + '...'

  return (
    <S.TaskDetailsContainer>
      <header>
        <div>
          {taskData.is_subtask && (
            <>
              <strong
                onClick={() => setTaskData(parentTask)}
                style={{ cursor: 'pointer' }}
              >
                {parentTaskShortTitle}
              </strong>
              <span> / </span>
            </>
          )}

          <strong>{taskData.is_subtask ? taskData.title : 'Entrega'}</strong>
        </div>

        <S.DueDate>
          <Alarm weight="bold" size={20} />

          {taskData.due_date && (
            <time>
              {format(taskData.due_date, 'dd/MM/yyyy', { locale: ptBR })}
            </time>
          )}
        </S.DueDate>
      </header>

      <h3>{taskData.title}</h3>

      {taskData.subtasks ? (
        <>
          <S.TaskInfo>
            <span>Descrição</span>

            <p>{taskData.description}</p>
          </S.TaskInfo>

          <span>Subtarefas</span>
          <S.SubtasksContainer>
            {taskData.subtasks.map((subtask, index) => (
              <>
                <S.SubtaskButton
                  key={`${subtask.title}-${subtask.due_date}`}
                  onClick={() => setTaskData(subtask)}
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
              </>
            ))}
            <S.ButtonContainer>
              <Button
                title="Concluir"
                buttonStyle="secondary"
                onClick={() => {}}
              />
            </S.ButtonContainer>
          </S.SubtasksContainer>
        </>
      ) : (
        <>
          <S.TaskInfo>
            <span>Descrição</span>

            <p>{data.description}</p>

            <span>Arquivos</span>
          </S.TaskInfo>

          <S.FilesContainer>
            {data.files ? <FileInput /> : <FileInput />}
          </S.FilesContainer>

          <hr />

          {user?.is_manager ? (
            <ManagerContent onCloseModal={onCloseModal} />
          ) : (
            <StaffContent onCloseModal={onCloseModal} />
          )}
        </>
      )}
    </S.TaskDetailsContainer>
  )
}
