import { ReactNode } from 'react'
import { useTheme } from 'styled-components'

import * as S from './styles'

interface TeamMember {
  avatar_url: string
  name: string
  role: string
  role_title: string
}

interface TeamMemberCardProps {
  data: TeamMember
  children: ReactNode
}

export function TeamMemberCard({ data, children }: TeamMemberCardProps) {
  const colors = useTheme()

  return (
    <S.TeamMemberCardContainer>
      <S.UserInfo role={data.role}>
        <img src={data.avatar_url} alt={data.name} />

        <div>
          <strong>{data.name}</strong>

          <span>{data.role_title}</span>
        </div>
      </S.UserInfo>

      <S.ContentWrapper>{children}</S.ContentWrapper>
    </S.TeamMemberCardContainer>
  )
}
