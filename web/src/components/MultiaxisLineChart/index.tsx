import { useTheme } from 'styled-components'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

import * as S from './styles'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

export const evaluationChartOptions = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      display: true,
      grid: {
        drawOnChartArea: true,
      },
    },
    y: {
      display: true,
      type: 'linear' as const,
      position: 'left' as const,
      grid: {
        drawOnChartArea: true,
      },
      ticks: {
        min: 1,
        max: 5,
        stepSize: 1,
      },
    },
  },
}

export const potentialChartOptions = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      display: true,
      grid: {
        drawOnChartArea: true,
      },
    },
    y1: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
      grid: {
        drawOnChartArea: true,
      },
      ticks: {
        min: 1,
        max: 3,
        stepSize: 1,
        callback: function (label: number) {
          switch (label) {
            case 1:
              return 'C'
            case 2:
              return 'B'
            case 3:
              return 'A'
          }
        },
      },
    },
  },
}

interface MultiaxisLineChartProps {
  title: string
}

export function MultiaxisLineChart({ title }: MultiaxisLineChartProps) {
  const colors = useTheme()

  const labels = ['05/02', '05/04', '05/06', '05/08', '05/10', '05/12']

  const evaluationData = {
    labels,
    datasets: [
      {
        label: 'Nota',
        data: [4, 1, 3, 4, 5, 4],
        pointRadius: 6,
        borderColor: colors['grey-100'],
        backgroundColor: function (context: any) {
          const index = context.dataIndex
          const value = context.dataset.data[index]
          switch (value) {
            case 1:
              return colors['red-700']
            case 2:
              return colors['red-500']
            case 3:
              return colors['orange-500']
            case 4:
              return colors['green-500']
            case 5:
              return colors['green-700']
          }
        },
        yAxisID: 'y',
      },
    ],
  }

  const potentialData = {
    labels,
    datasets: [
      {
        label: 'Potencial',
        data: [2, 1, 2, 2, 3, 2],
        pointRadius: 6,
        borderColor: colors['grey-100'],
        backgroundColor: function (context: any) {
          const index = context.dataIndex
          const value = context.dataset.data[index]
          switch (value) {
            case 1:
              return colors['blue-200']
            case 2:
              return colors['blue-550']
            case 3:
              return colors['blue-800']
          }
        },
        yAxisID: 'y1',
      },
    ],
  }

  return (
    <S.MultiaxisLineChartContainer>
      <h4>{title}</h4>

      <strong>Nota:</strong>

      <S.EvaluationChart
        options={evaluationChartOptions}
        data={evaluationData}
      />

      <strong>Potencial:</strong>
      <S.PotentialChart options={potentialChartOptions} data={potentialData} />
    </S.MultiaxisLineChartContainer>
  )
}
