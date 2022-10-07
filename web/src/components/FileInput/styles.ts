import styled from 'styled-components'

export const FileInputContainer = styled.div.attrs({
  classname: 'dropzone',
})`
  position: relative;

  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  height: 4.5rem;

  border: 2px solid ${({ theme }) => theme['grey-100']};
  border-radius: 9px;

  background: ${({ theme }) => theme.white};

  cursor: pointer;
  outline: none;
  transition: all 0.2s;

  label {
    position: absolute;

    color: ${({ theme }) => theme['grey-200']} !important;

    cursor: pointer;
  }

  &:hover {
    border-style: dashed;
  }
`
