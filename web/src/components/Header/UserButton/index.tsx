import { SignOut } from 'phosphor-react'
import { NavLink, useNavigate } from 'react-router-dom'

import { useAuth } from '../../../hooks/useAuth'

import * as S from './styles'

interface UserButtonProps {
  name: string
  avatarURL: string
}

export function UserButton({ name, avatarURL }: UserButtonProps) {
  const { signOut } = useAuth()

  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()

    navigate('/landing')
  }

  return (
    <NavLink to="landing">
      <S.UserButtonContainer>
        <img src={avatarURL} alt="Foto do usuário" />

        <span>{name}</span>

        <button onClick={handleSignOut}>
          <SignOut weight="bold" size={24} />
        </button>
      </S.UserButtonContainer>
    </NavLink>
  )
}
