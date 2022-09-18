import { useTheme } from 'styled-components'

import { useAuth } from '../../hooks/useAuth'

import { UserButton } from './UserButton'
import { Logo } from '../Logo'

import * as S from './styles'

export function Header() {
  const { user } = useAuth()

  const colors = useTheme()

  return (
    <S.HeaderContainer>
      <S.ContentWrapper>
        <Logo color={colors['blue-500']} />

        <UserButton name={user!.name} avatarURL={user!.avatar_url} />
      </S.ContentWrapper>
    </S.HeaderContainer>
  )
}
