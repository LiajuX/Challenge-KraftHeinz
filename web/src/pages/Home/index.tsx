import { Task, TaskType } from '../../components/Task'
import { PerformanceCard } from '../../components/PerformanceCard'
import { BehaviorRadarChart } from '../../components/BehaviorRadarChart'

import * as S from './styles'

const tasks: TaskType[] = [
  {
    id: '123456',
    title: 'Relatório do desempenho da equipe semanal',
    description:
      'Desenvolver um relatório com os desempenhos individuais de cada membro da equipe junto com a opinião do potencial de cada um.',
    due_date: new Date(2022, 9, 23),
    icon: 'report',
    assigned_to: 'guilhermec',
  },
  {
    id: '1234567',
    title: 'Vídeo para o criativo da campanha de marketing do Facebook Ads',
    description:
      'Auctor augue mauris augue neque gravida in. Consectetur adipiscing elit ut aliquam purus sit. Sed sed risus pretium quam. Sit amet consectetur adipiscing elit duis tristique. Purus sit amet luctus venenatis lectus magna. Commodo ullamcorper a lacus vestibulum sed arcu non. Diam in arcu cursus euismod quis viverra. Interdum posuere lorem ipsum dolor sit amet. Arcu non odio euismod lacinia at quis risus sed vulputate. Justo donec enim diam vulputate ut pharetra sit amet. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin. Orci a scelerisque purus semper eget duis at tellus. Sit amet consectetur adipiscing elit ut aliquam.',
    due_date: new Date(),
    icon: 'video',
    assigned_to: 'guilhermec',
  },
  {
    id: '1234568',
    title: 'Imagem para publicação no Facebook sobre a Independência do Brasil',
    description:
      'Criar uma imagem celebrando o dia da Independência do Brasil.',
    due_date: new Date(2022, 7, 19),
    icon: 'camera',
    assigned_to: 'guilhermec',
  },
]

export function Home() {
  const isManager = true

  return (
    <S.HomeContainer>
      <h1>Bem vindo, Guilherme!</h1>

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
  )
}
