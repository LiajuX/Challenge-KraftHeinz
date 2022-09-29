import styled from 'styled-components'

export const TeamMemberEvaluationModalContainer = styled.div`
  padding: 1.75rem 4.875rem 2.375rem;

  strong {
    color: ${({ theme }) => theme['grey-300']};

    font-size: 1rem;
  }

  h3 {
    margin: 1.0625rem 0 2.125rem;

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
    margin: 1.0625rem 0 2.125rem;

    font-size: 0.9375rem;
  }
`

export const SliderContainer = styled.div`
  margin: 2rem 1.1875rem;
`

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
