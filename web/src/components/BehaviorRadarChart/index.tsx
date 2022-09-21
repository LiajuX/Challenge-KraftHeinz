import { useTheme } from 'styled-components'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'

import * as S from './styles'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  Legend,
  LineElement,
  Filler,
  Tooltip,
)

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  options: {
    scales: {
      display: false,
    },
  },
}

export function BehaviorRadarChart() {
  const colors = useTheme()

  const data = {
    labels: [
      'Mente aberta',
      'Percepção',
      'Dedicação',
      'Organização',
      'Amigável',
    ],
    datasets: [
      {
        data: [6, 8, 12, 10, 12],
        backgroundColor: colors['green-500-transparency'],
        borderColor: colors['green-500'],
        borderWidth: 3,
      },
    ],
  }

  return (
    <S.PerformanceCardContainer>
      <Radar options={options} data={data} />
    </S.PerformanceCardContainer>
  )
}
