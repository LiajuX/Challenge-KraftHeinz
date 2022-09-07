import { useState } from 'react'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Alarm, Plus } from 'phosphor-react'

import { StaffContent } from './StaffContent'
import { ManagerContent } from './ManagerContent'
import { Button } from '../../Button'
import { Modal } from '../../Modal'

import * as S from './styles'

export interface Subtask {
  title: string
  parent_task_title: string
  isSubtask: boolean
  description: string
  due_date: Date | null
  files?: []
}

export interface TaskDetailsProps {
  title: string
  description: string
  parent_task_title?: string
  due_date: Date | null
  files?: []
  isSubtask: boolean
  subtasks?: Subtask[]
}

interface TaskDetailsModalProps {
  data: TaskDetailsProps
  onCloseModal: () => void
}

export function TaskEvaluationModal({
  data,
  onCloseModal,
}: TaskDetailsModalProps) {
  const [isSubtaskModalOpen, setIsSubtaskModalOpen] = useState(false)
  const [subtaskData, setSubtaskData] = useState<Subtask>({} as Subtask)

  const isManager = true

  const taskHeader = data.isSubtask
    ? data.parent_task_title!.split(' ').length <= 3
      ? data.parent_task_title
      : data.parent_task_title!.split(' ').slice(0, 3).join(' ') +
        '...' +
        ' / ' +
        data.title
    : 'Entrega'

  function handleOpenSubtaskEvaluationModal(task: Subtask) {
    setSubtaskData(task)
    setIsSubtaskModalOpen(true)
  }

  function handleCLoseSubtaskEvaluationModal() {
    setIsSubtaskModalOpen(false)
  }

  return (
    <S.TaskDetailsContainer>
      <header>
        <strong>{taskHeader}</strong>

        <S.DueDate>
          <Alarm weight="bold" size={20} />

          {data.due_date && (
            <time>{format(data.due_date, 'dd/MM/yyyy', { locale: ptBR })}</time>
          )}
        </S.DueDate>
      </header>

      <h3>{data.title}</h3>

      {data.subtasks ? (
        <>
          <S.TaskInfo>
            <span>Descrição</span>

            <p>{data.description}</p>
          </S.TaskInfo>

          <span>Subtarefas</span>
          <S.SubtasksContainer>
            {data.subtasks.map((subtask, index) => (
              <>
                <S.SubtaskButton
                  key={`${subtask.title}-${subtask.due_date}`}
                  onClick={() => handleOpenSubtaskEvaluationModal(subtask)}
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

                <Modal
                  isOpen={isSubtaskModalOpen}
                  onCloseModal={handleCLoseSubtaskEvaluationModal}
                >
                  <TaskEvaluationModal
                    onCloseModal={handleCLoseSubtaskEvaluationModal}
                    data={subtaskData}
                  />
                </Modal>
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

          <S.ButtonsContainer>
            <S.AddFileButton>
              <Plus size={18} />
            </S.AddFileButton>
          </S.ButtonsContainer>

          <hr />

          {isManager ? (
            <ManagerContent onCloseModal={onCloseModal} />
          ) : (
            <StaffContent onCloseModal={onCloseModal} />
          )}
        </>
      )}
    </S.TaskDetailsContainer>
  )
}
