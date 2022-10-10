import { doc, getDoc, Timestamp, updateDoc } from 'firebase/firestore'
import { useState } from 'react'

import { TaskType } from '../..'
import { database } from '../../../../services/firebase'
import { Button } from '../../../Button'
import { Slider } from '../../../Form/Slider'
import { Attribute, Multiselect } from '../../../Multiselect'

import * as S from './styles'

export interface EvaluatedTask {
  id: string
  title: string
  is_extra: boolean
  finished_date: any
  ponctuation: number
  evaluations: {
    manager: number
    workstation: number
    whim: number
    overall: number
  }
  comments: {
    manager?: string
    workstation?: string
  }
  manager_observations: string
  is_evaluated?: boolean
}

interface ManagerContentProps {
  task: TaskType
  parentTaskId: string
  onCloseModal: () => void
}

export function ManagerContent({
  task,
  parentTaskId,
  onCloseModal,
}: ManagerContentProps) {
  const [performanceEvaluation, setPerformanceEvaluation] = useState(2)
  const [whimEvaluation, setWhimEvaluation] = useState(2)
  const [comment, setComment] = useState('')
  const [selectedAttributes, setSelectedAttributes] = useState<Attribute[]>([])
  const [isCompletingTask, setIsCompletingTask] = useState(false)

  async function handleCompleteTask() {
    setIsCompletingTask(true)

    const userRef = doc(database, 'users', task.assigned_to)
    const taskRef = doc(
      database,
      'tasks',
      task.is_subtask ? parentTaskId : task.id,
    )

    const userDocSnap = await getDoc(userRef)

    if (userDocSnap.exists()) {
      const userOldAttributes = userDocSnap.data().attributes
      const userUpdatedAttributes = userOldAttributes

      const taskEvaluations = []

      const userOldTasksEvaluations = userDocSnap.data().evaluated_tasks
      const userOldTasksWithoutCurrentTask = userOldTasksEvaluations?.filter(
        (evaluatedtask: EvaluatedTask) => evaluatedtask.id !== task.id,
      )

      if (userOldTasksWithoutCurrentTask) {
        taskEvaluations.push(...userOldTasksWithoutCurrentTask)
      }

      const currentTaskEvaluations: EvaluatedTask = userDocSnap
        .data()
        .evaluated_tasks?.find(
          (taskEvaluation: EvaluatedTask) => taskEvaluation.id === task.id,
        )

      currentTaskEvaluations.evaluations.overall = performanceEvaluation + 1
      currentTaskEvaluations.evaluations.whim = whimEvaluation + 1
      currentTaskEvaluations.manager_observations = comment
      currentTaskEvaluations.is_evaluated = true

      taskEvaluations.push(currentTaskEvaluations)

      selectedAttributes.forEach((attribute) => {
        let currentValue = userOldAttributes[attribute.category].amount

        currentValue += attribute.action

        userUpdatedAttributes[attribute.category].amount = currentValue
      })

      await updateDoc(userRef, {
        attributes: userUpdatedAttributes,
        evaluated_tasks: taskEvaluations,
      })
    }

    if (!task.is_subtask) {
      await updateDoc(taskRef, {
        is_evaluated: true,
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

        const updatedSubtask = { ...subtaskOpened, is_evaluated: true }

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
    <S.ManagerContentContainer>
      <strong>Feedback</strong>
      <h3>Avalie o colaborador com base nessa entrega em relacação a:</h3>

      <span>Desempenho na execução da tarefa</span>

      <S.SliderContainer>
        <Slider
          currentValue={performanceEvaluation}
          setCurrentValue={setPerformanceEvaluation}
        />
      </S.SliderContainer>

      <span>Atenção aos detalhes e dedicação</span>

      <S.SliderContainer>
        <Slider
          currentValue={whimEvaluation}
          setCurrentValue={setWhimEvaluation}
        />
      </S.SliderContainer>

      <section>
        <span>
          Selecione as opções que melhor descreve o comportamento do
          colaborador:
        </span>

        <Multiselect
          category="behavior"
          selectedAttributes={selectedAttributes}
          handleAttributeSelection={handleAttributeSelection}
        />
      </section>

      <section>
        <label htmlFor="comment">
          Deixe um comentário para se lembrar das observações realizadas ao
          efetuar a avaliação de desempenho
        </label>

        <S.TextareaComponent
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Digite seu comentário aqui"
        />
      </section>

      <S.ButtonContainer>
        <Button
          title="CONCLUIR TAREFA"
          buttonStyle="secondary"
          onClick={handleCompleteTask}
          isLoading={isCompletingTask}
        />
      </S.ButtonContainer>
    </S.ManagerContentContainer>
  )
}
