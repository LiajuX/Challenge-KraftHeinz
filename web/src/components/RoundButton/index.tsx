import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTheme } from 'styled-components'
import { Plus } from 'phosphor-react'

import * as S from './styles'

export function RoundButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const currentRoute = useLocation()
  const { pathname } = currentRoute

  const colors = useTheme()
  const isManager = false

  return (
    <S.RoundButtonContainer onClick={() => setIsMenuOpen((state) => !state)}>
      <Plus color={colors.white} weight="bold" size={36} />
    </S.RoundButtonContainer>
  )
}
