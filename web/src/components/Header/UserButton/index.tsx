import { SignOut } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

import * as S from './styles'

interface UserButtonProps {
  name: string
  avatarURL: string
}

export function UserButton({ name, avatarURL }: UserButtonProps) {
  return (
    <NavLink to="landing">
      <S.UserButtonContainer>
        <img src={avatarURL} alt="Foto do usuário" />

        <span>{name}</span>

        <button>
          <SignOut weight="bold" size={24} />
        </button>
      </S.UserButtonContainer>
    </NavLink>
  )
}
