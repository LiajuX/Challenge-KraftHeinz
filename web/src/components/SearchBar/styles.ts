import styled from 'styled-components'

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 19.75rem;
  height: 1.5625rem;

  padding: 0.375rem;
  border: 2px solid ${(props) => props.theme['grey-100']};
  border-radius: 100px;

  color: ${(props) => props.theme['grey-300']};

  :focus {
    border: 1px solid ${(props) => props.theme['blue-800']};

    box-shadow: none;
  }

  svg {
    margin-right: 0.5625rem;
  }

  input {
    flex: 1;

    border: 0;
    border-radius: 100px;

    font-size: 1rem;
    font-weight: bold;

    color: ${(props) => props.theme['grey-300']};
  }
`
