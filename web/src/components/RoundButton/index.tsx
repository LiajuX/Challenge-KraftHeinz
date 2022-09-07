import { ReactNode, useState } from 'react'
import { useTheme } from 'styled-components'
import { Plus } from 'phosphor-react'

import * as S from './styles'

interface RoundButtonProps {
  children: ReactNode
}

export function RoundButton({ children }: RoundButtonProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const colors = useTheme()

  function handleToggleMenuOpening() {
    setIsMenuOpen((state) => !state)
  }

  return (
    <>
      <S.RoundButtonContainer
        onClick={handleToggleMenuOpening}
        isMenuOpen={isMenuOpen}
      >
        <Plus color={colors.white} weight="bold" size={36} />
      </S.RoundButtonContainer>

      <S.ButtonsContainer isMenuOpen={isMenuOpen}>
        {children}
      </S.ButtonsContainer>
    </>
  )
}
