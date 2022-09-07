import { useState } from 'react'
import { useTheme } from 'styled-components'

import { Task, TaskType } from '../../components/Task'
import { PerformanceCard } from '../../components/PerformanceCard'
import { BehaviorRadarChart } from '../../components/BehaviorRadarChart'
import { RoundButton } from '../../components/RoundButton'
import { MenuOptionButton } from '../../components/RoundButton/MenuOptionButton'
import { Modal } from '../../components/Modal'
import { NewTaskModal } from './components/NewTaskModal'

import * as S from './styles'

const tasks: TaskType[] = [
  {
    id: '1234568',
    title: 'Imagem para publicação no Facebook sobre a Independência do Brasil',
    isSubtask: false,
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint, doloribus. Aspernatur quibusdam facere quas, quasi unde eius rerum suscipit, alias saepe, ipsam officiis recusandae non architecto explicabo laboriosam veniam consequuntur.',
    due_date: new Date(),
    icon: 'camera',
    assigned_to: 'guilhermec',
  },
  {
    id: '1234567',
    title: 'Vídeo para o criativo da campanha de marketing do Facebook Ads',
    isSubtask: false,
    description:
      'Auctor augue mauris augue neque gravida in. Consectetur adipiscing elit ut aliquam purus sit. Sed sed risus pretium quam. Sit amet consectetur adipiscing elit duis tristique. Purus sit amet luctus venenatis lectus magna. Commodo ullamcorper a lacus vestibulum sed arcu non. Diam in arcu cursus euismod quis viverra. Interdum posuere lorem ipsum dolor sit amet. Arcu non odio euismod lacinia at quis risus sed vulputate. Justo donec enim diam vulputate ut pharetra sit amet. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin. Orci a scelerisque purus semper eget duis at tellus. Sit amet consectetur adipiscing elit ut aliquam.',
    subtasks: [
      {
        id: '123456',
        title: 'Entrega do pacote de fotos 1',
        parent_task_title:
          'Vídeo para o criativo da campanha de marketing do Facebook Ads',
        isSubtask: true,
        description:
          'Auctor augue mauris augue neque gravida in. Consectetur adipiscing elit ut aliquam purus sit. Sed sed risus pretium quam. Sit amet consectetur adipiscing elit duis tristique. Purus sit amet luctus venenatis lectus magna. Commodo ullamcorper a lacus vestibulum sed arcu non. Diam in arcu cursus euismod quis viverra. Interdum posuere lorem ipsum dolor sit amet. Arcu non odio euismod lacinia at quis risus sed vulputate. Justo donec enim diam vulputate ut pharetra sit amet. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin. Orci a scelerisque purus semper eget duis at tellus. Sit amet consectetur adipiscing elit ut aliquam.',
        due_date: new Date(2022, 8, 1),
        assigned_to: 'guilhermec',
      },
      {
        id: '123066',
        title: 'Entrega do pacote de fotos 2',
        parent_task_title:
          'Vídeo para o criativo da campanha de marketing do Facebook Ads',
        isSubtask: true,
        description:
          'Auctor augue mauris augue neque gravida in. Consectetur adipiscing elit ut aliquam purus sit. Sed sed risus pretium quam. Sit amet consectetur adipiscing elit duis tristique. Purus sit amet luctus venenatis lectus magna. Commodo ullamcorper a lacus vestibulum sed arcu non. Diam in arcu cursus euismod quis viverra. Interdum posuere lorem ipsum dolor sit amet. Arcu non odio euismod lacinia at quis risus sed vulputate. Justo donec enim diam vulputate ut pharetra sit amet. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin. Orci a scelerisque purus semper eget duis at tellus. Sit amet consectetur adipiscing elit ut aliquam.',
        due_date: new Date(2022, 8, 2),
        assigned_to: 'guilhermec',
      },
    ],
    due_date: new Date(2022, 8, 2),
    icon: 'video',
    assigned_to: 'guilhermec',
  },
  {
    id: '123456',
    title: 'Relatório do desempenho da equipe semanal',
    isSubtask: false,
    description:
      'Desenvolver um relatório com os desempenhos individuais de cada membro da equipe junto com a opinião do potencial de cada um.',
    due_date: new Date(2022, 9, 23),
    icon: 'report',
    assigned_to: 'guilhermec',
  },
]

export function Home() {
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false)

  const colors = useTheme()

  const isManager = true

  function handleOpenNewTaskModal() {
    setIsNewTaskModalOpen(true)
  }

  function handleCLoseNewTaskModal() {
    setIsNewTaskModalOpen(false)
  }

  return (
    <>
      <S.HomeContainer>
        <h1>Bem vinda, Jakeliny!</h1>

        <S.ContentWrapper>
          <section>
            <h3>Entregas pendentes</h3>

            {tasks.map((task) => (
              <Task key={task.id} data={task} />
            ))}
          </section>

          <section>
            <h3>Seu potencial atual</h3>

            <PerformanceCard potencialValue="B" />

            {isManager && (
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
          title={isManager ? 'Nova tarefa' : 'Nova tarefa extra'}
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
