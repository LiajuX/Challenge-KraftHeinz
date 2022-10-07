import styled from 'styled-components'

export const FileContainer = styled.div.attrs({
  classname: 'dropzone',
})`
  position: relative;

  flex: 1;
  display: flex;
  align-items: center;

  width: 16rem;
  height: 4.5rem;

  border-radius: 9px;

  color: ${({ theme }) => theme['grey-200']};
  background: ${({ theme }) => theme.white};

  label {
    position: absolute;

    cursor: pointer;
  }

  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`

export const ExtensionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;

  height: 100%;

  padding: 0 1.5rem;
  border-radius: 9px 0 0 9px;

  background: ${({ theme }) => theme['green-500']};
  color: ${({ theme }) => theme.white};

  span {
    color: ${({ theme }) => theme.white} !important;
  }
`

export const FilenameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin: 1rem;

  strong {
    color: ${({ theme }) => theme.black} !important;

    font-size: 0.75rem !important;
  }

  span {
    color: ${({ theme }) => theme['grey-200']} !important;

    font-weight: normal !important;
  }
`
