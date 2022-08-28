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
          name="Guilherme Carvalho"
          avatarURL="https://github.com/diego3g.png"
        />
      </S.ContentWrapper>
    </S.HeaderContainer>
  )
}
