import { useEffect, useState } from 'react'
import { useTheme } from 'styled-components'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'

import { database } from '../../services/firebase'

import { useAuth } from '../../hooks/useAuth'

import { Subtask, Task, TaskType } from '../../components/Task'
import { PerformanceCard } from '../../components/PerformanceCard'
import { BehaviorRadarChart } from '../../components/BehaviorRadarChart'
import { RoundButton } from '../../components/RoundButton'
import { MenuOptionButton } from '../../components/RoundButton/MenuOptionButton'
import { Modal } from '../../components/Modal'
import { NewTaskModal } from './components/NewTaskModal'

import * as S from './styles'
import { Loading } from '../../components/Loading'

export function Home() {
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false)
  const [tasks, setTasks] = useState<TaskType[]>([])

  const { user } = useAuth()

  const colors = useTheme()

  const firstName = user?.name.split(' ')[0]

  function handleOpenNewTaskModal() {
    setIsNewTaskModalOpen(true)
  }

  function handleCLoseNewTaskModal() {
    setIsNewTaskModalOpen(false)
  }

  useEffect(() => {
    const tasksQuery = query(
      collection(database, 'tasks'),
      where('assigned_to', '==', user!.id),
      orderBy('due_date', user!.is_manager ? 'desc' : 'asc'),
    )

    const unsubscribe = onSnapshot(tasksQuery, (querySnapshot) => {
      const storedTasks: TaskType[] = []
      const subtasks: Subtask[] = []

      querySnapshot.forEach((doc) => {
        if (doc.data().subtasks) {
          doc.data().subtasks.forEach((subtask: any) => {
            const subtaskDataFormatted = {
              ...subtask,
              due_date: subtask.due_date.toDate(),
            }

            subtasks.push(subtaskDataFormatted)
          })
        }

        const task = {
          ...doc.data(),
          id: doc.id,
          due_date: doc.data().due_date.toDate(),
          subtasks,
        } as TaskType

        storedTasks.push(task)
      })

      setTasks(storedTasks)

      return () => {
        unsubscribe()
      }
    })
  }, [user])

  console.log(tasks)

  return (
    <>
      <S.HomeContainer>
        <h1>
          {user?.genre === 'other'
            ? 'Olá, '
            : user?.genre === 'male'
            ? 'Bem-vindo'
            : 'Bem-vinda'}
          , {firstName}
        </h1>

        <S.ContentWrapper>
          <section>
            <h3>Entregas pendentes</h3>

            {tasks ? (
              tasks.map((task) => <Task key={task.id} data={task} />)
            ) : (
              <Loading size={64} />
            )}
          </section>

          <section>
            <h3>Seu potencial atual</h3>

            <PerformanceCard potencialValue={user!.potential} />

            {user?.is_manager && (
              <S.ChartContainer>
                <h3>O que dizem de você</h3>

                <BehaviorRadarChart />
              </S.ChartContainer>
            )}
          </section>
        </S.ContentWrapper>
      </S.HomeContainer>

      <RoundButton>
        <MenuOptionButton
          title={user?.is_manager ? 'Nova tarefa' : 'Nova tarefa extra'}
          icon="task"
          color={colors['orange-500']}
          onClick={handleOpenNewTaskModal}
        />
      </RoundButton>

      <Modal isOpen={isNewTaskModalOpen} onCloseModal={handleCLoseNewTaskModal}>
        <NewTaskModal onCloseModal={handleCLoseNewTaskModal} />
      </Modal>
    </>
  )
}
