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

  textarea {
    width: 100%;
    min-height: 6.125rem;

    margin: 2rem 0;
    padding: 0.3rem 0.5rem;
    border: 2px solid ${({ theme }) => theme['grey-100']};
    border-radius: 9px;

    font-size: 0.75rem;

    resize: none;

    &::placeholder {
      color: ${({ theme }) => theme['grey-200']};
    }

    ::-webkit-scrollbar {
      width: 5px;
    }

    ::-webkit-scrollbar-track {
      margin: 0.5rem;
      border-radius: 2.5rem;

      background: ${(props) => props.theme['grey-100']};
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 2.5rem;

      background: ${(props) => props.theme['grey-200']};
    }
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