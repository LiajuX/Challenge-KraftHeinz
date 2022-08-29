import styled from 'styled-components'

export const TaskDetailsContainer = styled.div`
  padding: 1.75rem 4.875rem 2.375rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  strong {
    color: ${({ theme }) => theme['grey-300']};

    font-size: 1rem;
  }

  h3 {
    margin: 1.0625rem 0;

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

  hr {
    height: 1px;

    margin: 2.125rem 0;
    border: none;

    background: ${({ theme }) => theme['grey-100']};
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

export const TaskInfo = styled.div`
  padding-top: 1.0625rem;
`

export const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  margin-top: 1.0625rem;
`

export const AddFileButton = styled.button`
  flex: 1;

  height: 4.5rem;

  border: 2px solid ${({ theme }) => theme['grey-100']};
  border-radius: 9px;

  color: ${({ theme }) => theme['grey-200']};
  background: ${({ theme }) => theme.white};
`

export const DueDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;

  color: ${({ theme }) => theme['green-500']};

  time {
    margin-bottom: 0.0625rem;

    font-size: 1rem;
    font-weight: bold;
  }
`

export const SubtasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const SubtaskButton = styled.button`
  width: 100%;

  margin-bottom: 1rem;
  padding: 0.75rem 2rem 2rem 0.875rem;
  border-radius: 9px;

  background: ${({ theme }) => theme.white};

  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);

  text-align: left;

  &:first-child {
    margin-top: 1rem;
  }

  h3 {
    margin-bottom: 0;
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 1.25rem;
`
