import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Alarm } from 'phosphor-react'
import { doc, Timestamp, updateDoc } from 'firebase/firestore'

import { useAuth } from '../../../hooks/useAuth'

import { database } from '../../../services/firebase'

import { TaskType } from '..'
import { File } from '../../File'
import { FileInput } from '../../FileInput'
import { StaffContent } from './StaffContent'
import { ManagerContent } from './ManagerContent'
import { Button } from '../../Button'

import * as S from './styles'

interface TaskDetailsModalProps {
  data: TaskType
  onCloseModal: () => void
}

export function TaskEvaluationModal({
  data,
  onCloseModal,
}: TaskDetailsModalProps) {
  const [taskData, setTaskData] = useState<TaskType>(data)
  const [isCompletingTask, setIsCompletingTask] = useState(false)

  const { user } = useAuth()

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isFocused,
    isDragReject,
  } = useDropzone()

  const parentTask = data

  const parentTaskShortTitle =
    parentTask.title.split(' ').length <= 3
      ? parentTask.title
      : parentTask.title.split(' ').slice(0, 3).join(' ') + '...'

  const subtasksNotFinished = user!.is_manager
    ? taskData.subtasks?.find((subtask) => !subtask.is_evaluated)
    : taskData.subtasks?.find((subtask) => !subtask.finished_date)

  async function handleCompleteTaskWithSubtask() {
    setIsCompletingTask(true)

    if (!subtasksNotFinished && !user?.is_manager) {
      const taskRef = doc(database, 'tasks', taskData.id)

      await updateDoc(taskRef, {
        finished_date: Timestamp.fromDate(new Date()),
      })
    }

    if (!subtasksNotFinished && user?.is_manager) {
      const taskRef = doc(database, 'tasks', taskData.id)

      await updateDoc(taskRef, {
        is_evaluated: true,
      })
    }

    setIsCompletingTask(false)
    onCloseModal()
  }

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
              <S.SubtaskButton
                key={`${subtask.id}-${index}`}
                onClick={() => setTaskData(subtask)}
                disabled={
                  (!user?.is_manager && !!subtask.finished_date) ||
                  subtask.is_evaluated
                }
                finished={
                  (!user?.is_manager && !!subtask.finished_date) ||
                  subtask.is_evaluated
                }
              >
                <header>
                  <strong>Subtarefa {index + 1}</strong>

                  <S.DueDate
                    finished={
                      (!user?.is_manager && !!subtask.finished_date) ||
                      (user?.is_manager && subtask.is_evaluated)
                    }
                  >
                    <Alarm weight="bold" size={20} />

                    {user?.is_manager
                      ? subtask.due_date &&
                        !subtask.is_evaluated && (
                          <time>
                            {format(subtask.due_date, 'dd/MM/yyyy', {
                              locale: ptBR,
                            })}
                          </time>
                        )
                      : !subtask.finished_date &&
                        subtask.due_date && (
                          <time>
                            {format(subtask.due_date, 'dd/MM/yyyy', {
                              locale: ptBR,
                            })}
                          </time>
                        )}

                    {!user?.is_manager && subtask.finished_date && (
                      <strong>ENTREGUE</strong>
                    )}

                    {user?.is_manager && subtask.is_evaluated && (
                      <strong>AVALIADO</strong>
                    )}
                  </S.DueDate>
                </header>

                <h3>{subtask.title}</h3>
              </S.SubtaskButton>
            ))}
            <S.ButtonContainer>
              <Button
                title="Concluir"
                buttonStyle="secondary"
                onClick={handleCompleteTaskWithSubtask}
                disabled={!!subtasksNotFinished}
                isLoading={isCompletingTask}
              />
            </S.ButtonContainer>
          </S.SubtasksContainer>
        </>
      ) : (
        <>
          <S.TaskInfo>
            <span>Descrição</span>

            <p>{taskData.description}</p>

            <span>Arquivos</span>
          </S.TaskInfo>

          <S.FilesContainer>
            {!taskData.files && (
              <FileInput
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                acceptedFiles={acceptedFiles}
                isDragReject={isDragReject}
                isFocused={isFocused}
              />
            )}

            {taskData.files?.length === 0 && (
              <FileInput
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                acceptedFiles={acceptedFiles}
                isDragReject={isDragReject}
                isFocused={isFocused}
              />
            )}

            {taskData.files?.map((file) => (
              <File
                key={file.name}
                data={{ name: file.name, url: file.url }}
                taskAttached={
                  taskData.is_subtask ? 'Entrega parcial' : 'Entrega'
                }
              />
            ))}

            {taskData.files && taskData.files.length > 0 && (
              <FileInput
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                acceptedFiles={acceptedFiles}
                isDragReject={isDragReject}
                isFocused={isFocused}
              />
            )}
          </S.FilesContainer>

          <hr />

          {user?.is_manager ? (
            <ManagerContent
              task={taskData}
              parentTaskId={parentTask.id}
              onCloseModal={onCloseModal}
            />
          ) : (
            <StaffContent
              task={taskData}
              parentTaskId={parentTask.id}
              onCloseModal={onCloseModal}
            />
          )}
        </>
      )}
    </S.TaskDetailsContainer>
  )
}
