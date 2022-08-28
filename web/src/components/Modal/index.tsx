import { ReactNode } from 'react'
import { X } from 'phosphor-react'

import * as S from './styles'

interface ModalProps {
  isOpen: boolean
  onCloseModal: () => void
  children?: ReactNode
}

export function Modal({ isOpen, onCloseModal, children }: ModalProps) {
  return (
    <S.ModalContainer
      isOpen={isOpen}
      overlayClassName="_"
      ariaHideApp={false}
      onRequestClose={onCloseModal}
      overlayElement={(props, contentElement) => (
        <S.Overlay {...props}>{contentElement}</S.Overlay>
      )}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
    >
      <S.ContentWrapper>
        <S.ModalTopBar>
          <X weight="bold" size={18} onClick={onCloseModal} />
        </S.ModalTopBar>

        <section>{children}</section>
      </S.ContentWrapper>
    </S.ModalContainer>
  )
}
