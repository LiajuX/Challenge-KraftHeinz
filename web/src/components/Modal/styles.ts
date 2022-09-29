import styled from 'styled-components'
import ReactModal from 'react-modal'

export const ModalContainer = styled(ReactModal)``

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.1);

  z-index: 20;
`

export const ContentWrapper = styled.div`
  width: 43.75rem;
  height: 75vh;

  border-radius: 9px;

  background: ${({ theme }) => theme.white};

  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 0px;
  }

  section {
    margin-top: 3.125rem;
  }
`

export const ModalTopBar = styled.div`
  position: fixed;

  display: flex;
  justify-content: flex-end;

  width: 43.75rem;

  padding: 1rem;
  border-radius: 9px 9px 0 0;

  z-index: 30;

  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme['gradient-modal']};

  svg {
    cursor: pointer;
  }
`
