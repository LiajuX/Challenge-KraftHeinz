import { useTheme } from 'styled-components'

import { UserButton } from './UserButton'
import { Logo } from '../Logo'

import * as S from './styles'

export function Header() {
  const colors = useTheme()

  return (
    <S.HeaderContainer>
      <S.ContentWrapper>
        <Logo color={colors['blue-500']} />

        <UserButton
          name="Jakeliny Carvalho"
          avatarURL="https://github.com/jakeliny.png"
        />
      </S.ContentWrapper>
    </S.HeaderContainer>
  )
}
