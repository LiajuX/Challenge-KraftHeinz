import styled from 'styled-components'
import { Line } from 'react-chartjs-2'

export const MultiaxisLineChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 2rem 2.25rem;
  border-radius: 9px;

  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);

  h4 {
    max-width: 20rem;

    margin-bottom: 1rem;

    text-align: center;
  }

  strong {
    width: 100%;
    text-align: left;

    font-size: 1rem;
    font-weight: 600;

    margin-bottom: 1rem;
  }
`

export const EvaluationChart = styled(Line)`
  max-height: 9rem;

  margin-bottom: 1rem;
`

export const PotentialChart = styled(Line)`
  max-height: 6rem;
`
