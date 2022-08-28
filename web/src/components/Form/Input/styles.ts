import styled from 'styled-components'

export const InputContainer = styled.input`
  height: 3.25rem;

  padding: 0 0.5rem;
  border: 1px solid ${(props) => props.theme['grey-200']};
  border-radius: 3px;

  font-size: 1rem;

  ::placeholder {
    color: ${(props) => props.theme['grey-200']};
  }

  :focus {
    border: 1px solid ${(props) => props.theme['blue-800']};

    box-shadow: none;
  }
`
