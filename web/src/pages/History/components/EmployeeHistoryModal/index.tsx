import { useState } from 'react'
import { useTheme } from 'styled-components'

import { SatisfactionEmoji } from '../../../../components/SatisfactionEmoji'
import { MultiaxisLineChart } from '../../../../components/MultiaxisLineChart'
import { TeamMemberCard } from '../../../../components/TeamMemberCard'
import { Bias } from '../../../../components/Bias'

import * as S from './styles'

interface BiasReport {
  employee: {
    id: string
    avatar_url: string
    name: string
    role: string
    role_insensitive: string
  }
  bias: number
}

interface Evaluation {
  id: string
  title: string
  date: Date
  ponctuation: number
  comment: string
}

export interface HistoryProps {
  name: string
  potential: 'A' | 'B' | 'C'
  expectations: string
  evaluations: Evaluation[]
  bias_report: BiasReport[]
}

interface TaskDetailsModalProps {
  data: HistoryProps
  onCloseModal: () => void
}

const charts = [
  {
    title: 'Evolução da nota final',
  },
  {
    title: 'Evolução da nota da capacidade de desempenhar um cargo acima',
  },
  {
    title: 'Evolução da nota de satisfação dos princípios de liderança',
  },
  {
    title: 'Evolução da nota de desenvolvimento pessoal',
  },
  {
    title: 'Evolução da nota de satisfação da comunicação',
  },
  {
    title: 'Evolução da nota de proatividade',
  },
  {
    title: 'Evolução do desempenho nas tarefas',
  },
  {
    title: 'Evolução do "capricho" nas tarefas',
  },
]

export function EmployeeHistoryModal({
  data,
  onCloseModal,
}: TaskDetailsModalProps) {
  const [isBiasReportOpen, setIsBiasReportOpen] = useState(false)

  const colors = useTheme()

  const potentialColor =
    data.potential === 'A'
      ? colors['blue-800']
      : data.potential === 'B'
      ? colors['blue-550']
      : colors['blue-200']

  return (
    <S.EmployeeHistoryContainer>
      <header>
        <strong
          style={{ cursor: isBiasReportOpen ? 'pointer' : 'auto' }}
          onClick={() => setIsBiasReportOpen(false)}
        >
          {data.name}
        </strong>

        {isBiasReportOpen && (
          <>
            <span> / </span>

            <strong>Relatório de viés</strong>
          </>
        )}
      </header>

      <h3>
        {isBiasReportOpen ? 'Relatório de viés' : 'Histórico de avaliações'}
      </h3>

      {isBiasReportOpen ? (
        <>
          <span>Descrição</span>

          <p>O relatório de viés desse colaborador para os outros.</p>

          <S.BiasContainer>
            {data.bias_report.map((biasReport) => (
              <S.TeamMemberCardContainer key={biasReport.employee.id}>
                <TeamMemberCard data={biasReport.employee}>
                  <div />

                  <S.BiasWrapper>
                    <span>Viés:</span>

                    <Bias value={biasReport.bias} />
                  </S.BiasWrapper>
                </TeamMemberCard>
              </S.TeamMemberCardContainer>
            ))}
          </S.BiasContainer>
        </>
      ) : (
        <>
          <span>Última avaliação recebida</span>

          <S.PotentialContainer potential={data.potential}>
            <SatisfactionEmoji color={potentialColor} size={34} type="great" />

            <h3>
              Potencial {data.potential === 'A' && 'claro'}{' '}
              {data.potential === 'B' && 'avançando'}{' '}
              {data.potential === 'C' && 'em desenvolvimento'} ({data.potential}
              )
            </h3>
          </S.PotentialContainer>

          <span>Expectativas para os próximos meses</span>

          <p>&quot;{data.expectations}&quot;</p>

          <span>Viés</span>

          <p>Acessar o relatório de viés desse colaborador para outros</p>

          <S.Button onClick={() => setIsBiasReportOpen(true)}>acessar</S.Button>

          <span>Relatórios</span>

          <S.ChartsContainer>
            {charts.map((chart) => (
              <MultiaxisLineChart key={chart.title} title={chart.title} />
            ))}
          </S.ChartsContainer>

          <span>Timeline</span>
        </>
      )}
    </S.EmployeeHistoryContainer>
  )
}
