import styled from 'styled-components'

export const TaskDetailsContainer = styled.div`
  padding: 1.75rem 4.875rem 2.375rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      display: inline-block;

      margin: 0 0.5rem;

      color: ${({ theme }) => theme['grey-200']};

      font-size: 1.1875rem;
      font-weight: bold;
    }
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
`

export const TaskInfo = styled.div`
  padding-top: 1.0625rem;
`

export const FilesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  margin-top: 1.0625rem;
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
