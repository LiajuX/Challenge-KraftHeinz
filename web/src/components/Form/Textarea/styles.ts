import styled from 'styled-components'

export const TextareaContainer = styled.textarea`
  width: 100%;
  min-height: 6.125rem;

  padding: 0.3rem 0.5rem;
  border: 2px solid ${({ theme }) => theme['grey-100']};
  border-radius: 9px;

  font-size: 0.75rem;

  resize: none;

  &:focus {
    border-color: ${({ theme }) => theme['blue-500']};

    box-shadow: none;
  }

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
`
