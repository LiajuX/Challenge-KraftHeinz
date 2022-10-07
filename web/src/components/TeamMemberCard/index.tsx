import { ReactNode } from 'react'

import * as S from './styles'

interface TeamMember {
  avatar_url: string
  name: string
  role: string
  role_insensitive: string
}

interface TeamMemberCardProps {
  data: TeamMember
  children: ReactNode
}

export function TeamMemberCard({ data, children }: TeamMemberCardProps) {
  return (
    <S.TeamMemberCardContainer>
      <S.UserInfo role={data.role_insensitive}>
        <img src={data.avatar_url} alt={data.name} />

        <div>
          <strong>{data.name}</strong>

          <span>{data.role}</span>
        </div>
      </S.UserInfo>

      <S.ContentWrapper>{children}</S.ContentWrapper>
    </S.TeamMemberCardContainer>
  )
}
