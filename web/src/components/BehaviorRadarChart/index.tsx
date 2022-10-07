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

import { useAuth } from '../../hooks/useAuth'

import { Loading } from '../Loading'

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
  responsive: true,
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
  const { user } = useAuth()

  const colors = useTheme()

  const openMind = user?.attributes.open_mind.amount
  const perception = user?.attributes.perception.amount
  const dedication = user?.attributes.dedication.amount
  const organization = user?.attributes.organization.amount
  const friendly = user?.attributes.friendly.amount

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
        data: [openMind, perception, dedication, organization, friendly],
        backgroundColor: colors['green-500-transparency'],
        borderColor: colors['green-500'],
        borderWidth: 3,
      },
    ],
  }

  if (!user) {
    return <Loading size={32} />
  }

  return (
    <S.PerformanceCardContainer>
      <Radar options={options} data={data} />
    </S.PerformanceCardContainer>
  )
}
