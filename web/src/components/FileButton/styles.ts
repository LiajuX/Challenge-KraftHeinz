import styled from 'styled-components'

export const FileButtonContainer = styled.div``

export const FileInput = styled.div`
  position: relative;

  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  height: 4.5rem;

  border: 2px solid ${({ theme }) => theme['grey-100']};
  border-radius: 9px;

  color: ${({ theme }) => theme['grey-200']};
  background: ${({ theme }) => theme.white};

  label {
    position: absolute;

    cursor: pointer;
  }

  input {
    opacity: 0;
    width: 100%;
    height: 100%;

    cursor: pointer;
  }
`
