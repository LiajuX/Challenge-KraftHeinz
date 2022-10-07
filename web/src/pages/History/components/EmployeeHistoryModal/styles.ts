import styled, { css } from 'styled-components'

export const EmployeeHistoryContainer = styled.div`
  padding: 1.75rem 4.875rem 2.375rem;

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
