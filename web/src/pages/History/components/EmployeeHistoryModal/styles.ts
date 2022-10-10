import styled, { css } from 'styled-components'

export const EmployeeHistoryContainer = styled.div`
  padding: 1.75rem 4.875rem 5rem;

  span {
    display: inline-block;

    margin: 2.25rem 0 0.5rem;

    color: ${({ theme }) => theme['grey-200']};

    font-size: 1.1875rem;
    font-weight: bold;
  }

  header {
    display: flex;
    align-items: center;

    margin-bottom: 1.75rem;

    span {
      display: inline-block;

      margin: 0 0.5rem;

      color: ${({ theme }) => theme['grey-200']};

      font-size: 1.1875rem;
      font-weight: bold;
    }

    strong {
      color: ${({ theme }) => theme['grey-300']};

      font-size: 1rem;
    }
  }

  h3 {
    color: ${({ theme }) => theme['blue-800']};

    font-size: 1.25rem;
  }

  span,
  label {
    display: block;

    color: ${({ theme }) => theme['grey-300']};

    font-size: 0.75rem;
    font-weight: bold;
  }

  p {
    font-size: 0.9375rem;
  }
`

interface PotentialProps {
  potential: 'A' | 'B' | 'C'
}

export const PotentialContainer = styled.div<PotentialProps>`
  display: flex;
  align-items: center;
  gap: 1rem;

  margin: 1rem 0 0 0.875rem;

  h3 {
    color: ${({ potential, theme }) =>
      potential === 'A'
        ? theme['blue-800']
        : potential === 'B'
        ? theme['blue-550']
        : theme['blue-200']};
  }
`

export const ChartsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  margin-top: 1rem;
`

export const Button = styled.button`
  height: 2.125rem;

  margin-top: 0.5rem;
  padding: 0 2rem;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme['grey-200']};

  background: transparent;

  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;

  transition: all 0.4s;

  &:hover {
    border-color: ${({ theme }) => theme.black};
  }
`

export const BiasContainer = styled.div`
  margin: 2.25rem 0 3rem;
`

export const TeamMemberCardContainer = styled.div`
  margin-bottom: 0.8125rem;
`

export const BiasWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.125rem;

  margin-right: 1.25rem;

  span {
    margin: 0;
  }
`

export const TasksContainer = styled.div`
  position: relative;

  padding-top: 2.625rem;
`

export const TasksWrapper = styled.div``

export const TaskTimeline = styled.div`
  position: absolute;
  top: 0;
  left: calc(15.625% - 0.85rem);

  width: 5px;
  height: 100%;

  margin-top: 1rem;
  border-radius: 2px;

  background: ${({ theme }) => theme['grey-100']};
`

export const TaskContainer = styled.div`
  display: grid;
  grid-template-columns: 1.25fr 6.75fr;
  align-items: flex-start;
  gap: 0.5rem;

  margin-bottom: 1rem;

  span {
    margin: 0.6rem 0 0.25rem;
  }

  p {
    font-size: 0.75rem;
  }
`

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;

  h4 {
    font-size: 1rem;
  }

  p {
    color: ${({ theme }) => theme['green-500']};
  }
`

export const TaskWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  &:first-child {
    align-items: flex-end;
  }
`

interface PonctuationContainerProps {
  color: string
}

export const PonctuationContainer = styled.div<PonctuationContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  span {
    margin: 0 !important;

    color: ${({ color }) => color};

    text-transform: uppercase;
  }

  time {
    font-size: 1rem;

    color: ${({ theme }) => theme['grey-300']};
  }
`

export const PonctuationData = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
`

export const PonctuationBullet = styled.div<PonctuationContainerProps>`
  width: 1.25rem;
  height: 1.25rem;

  border-radius: 50%;

  background: ${({ color }) => color};

  z-index: 40;
`

export const EmptyTaskList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding: 3rem 0;

  color: ${({ theme }) => theme['grey-300']};
`
