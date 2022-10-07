import { useCallback, useState } from 'react'
import { doc, getDoc, Timestamp, updateDoc } from 'firebase/firestore'

import { database } from '../../../../services/firebase'
import { useAuth } from '../../../../hooks/useAuth'

import { Slider } from '../../../Form/Slider'
import { Attribute, Multiselect } from '../../../Multiselect'
import { TaskType } from '../..'
import { Button } from '../../../Button'

import * as S from './styles'

interface StaffContentProps {
  task: TaskType
  parentTaskId: string
  onCloseModal: () => void
}

export function StaffContent({
  task,
  parentTaskId,
  onCloseModal,
}: StaffContentProps) {
  const [managerEvaluation, setManagerEvaluation] = useState(2)
  const [managerEvaluationComment, setManagerEvaluationComment] = useState('')
  const [workstationEvaluation, setWorkstationEvaluation] = useState(2)
  const [workstationEvaluationComment, setWorkstationEvaluationComment] =
    useState('')
  const [selectedAttributes, setSelectedAttributes] = useState<Attribute[]>([])
  const [isCompletingTask, setIsCompletingTask] = useState(false)

  const { user } = useAuth()

  async function handleCompleteTask() {
    setIsCompletingTask(true)

    const managerId = String(user?.manager_id)

    const managerRef = doc(database, 'users', managerId)
    const userRef = doc(database, 'users', user!.id)
    const taskRef = doc(
      database,
      'tasks',
      task.is_subtask ? parentTaskId : task.id,
    )

    const managerDocSnap = await getDoc(managerRef)

    if (managerDocSnap.exists()) {
      const managerOldAttributes = managerDocSnap.data().attributes
      const managerUpdatedAttributes = managerOldAttributes

      selectedAttributes.forEach((attribute) => {
        let currentValue = managerOldAttributes[attribute.category].amount

        currentValue += attribute.action

        managerUpdatedAttributes[attribute.category].amount = currentValue
      })

      await updateDoc(managerRef, {
        attributes: managerUpdatedAttributes,
      })
    }

    const userDocSnap = await getDoc(userRef)

    if (userDocSnap.exists()) {
      const taskEvaluations = []

      const userOldTasksEvaluations = userDocSnap.data().evaluated_tasks

      if (userOldTasksEvaluations) {
        taskEvaluations.push(...userOldTasksEvaluations)
      }

      const newTaskEvaluation = {
        id: task?.id,
        title: task?.title,
        is_extra: task?.is_extra || false,
        finished_date: Timestamp.fromDate(new Date()),
        evaluations: {
          manager: managerEvaluation + 1,
          workstation: workstationEvaluation + 1,
        },
        comments: {
          manager: managerEvaluationComment,
          workstation: workstationEvaluationComment,
        },
      }

      taskEvaluations.push(newTaskEvaluation)

      await updateDoc(userRef, {
        task_amount: userDocSnap.data().task_amount + 1,
        evaluated_tasks: taskEvaluations,
      })
    }

    if (!task.is_subtask) {
      await updateDoc(taskRef, {
        finished_date: Timestamp.fromDate(new Date()),
      })
    } else {
      const taskDocSnap = await getDoc(taskRef)

      if (taskDocSnap.exists()) {
        const subtaskOpened = taskDocSnap
          .data()
          .subtasks.find((subtask: TaskType) => subtask.id === task.id)

        const restOfTheSubtasks = taskDocSnap
          .data()
          .subtasks.find((subtask: TaskType) => subtask.id !== task.id)

        const updatedSubtask = { ...subtaskOpened, finished_date: new Date() }

        await updateDoc(taskRef, {
          ...taskDocSnap.data(),
          subtasks: [restOfTheSubtasks, updatedSubtask],
        })
      }
    }

    setIsCompletingTask(false)
    onCloseModal()
  }

  function handleAttributeSelection(selectedAttribute: Attribute) {
    const isThisAttributeAlreadySelected = selectedAttributes.find(
      (attribute) => attribute.title === selectedAttribute.title,
    )

    if (isThisAttributeAlreadySelected) {
      const filteredAtributes = selectedAttributes.filter(
        (attribute) => attribute.title !== selectedAttribute.title,
      )

      setSelectedAttributes(filteredAtributes)
    }

    if (!isThisAttributeAlreadySelected) {
      setSelectedAttributes((oldState) => [...oldState, selectedAttribute])
    }
  }

  return (
    <S.StaffContentContainer>
      <strong>Feedback</strong>
      <h3>Avalie a sua satisfação em relação a execução da tarefa</h3>

      <span>Avalie o seu gerente</span>

      <S.SliderContainer>
        <Slider
          currentValue={managerEvaluation}
          setCurrentValue={setManagerEvaluation}
        />
      </S.SliderContainer>

      <span>
        Selecione as opções que melhor descrevem o comportamento do gerente:
      </span>

      <Multiselect
        category="behavior"
        selectedAttributes={selectedAttributes}
        handleAttributeSelection={handleAttributeSelection}
      />

      <div>
        <label htmlFor="manager-comment">Se quiser, deixe um comentário</label>

        <S.TextareaComponent
          id="manager-comment"
          value={managerEvaluationComment}
          onChange={(e) => setManagerEvaluationComment(e.target.value)}
          placeholder="Digite seu comentário aqui"
        />
      </div>

      <span>Avalie a estação de trabalho utilizada</span>

      <S.SliderContainer>
        <Slider
          currentValue={workstationEvaluation}
          setCurrentValue={setWorkstationEvaluation}
        />
      </S.SliderContainer>

      <div>
        <label htmlFor="workstation-comment">
          Se quiser, deixe um comentário
        </label>

        <S.TextareaComponent
          id="workstation-comment"
          value={workstationEvaluationComment}
          onChange={(e) => setWorkstationEvaluationComment(e.target.value)}
          placeholder="Digite seu comentário aqui"
        />
      </div>

      <S.ButtonContainer>
        <Button
          title="Concluir"
          buttonStyle="secondary"
          onClick={handleCompleteTask}
          disabled={selectedAttributes.length === 0}
          isLoading={isCompletingTask}
        />
      </S.ButtonContainer>
    </S.StaffContentContainer>
  )
}
