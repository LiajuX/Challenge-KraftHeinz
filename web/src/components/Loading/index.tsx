import { CircleNotch } from 'phosphor-react'

import * as S from './styles'

interface LoadingProps {
  size: number
  color?: string
}

export function Loading({ size, color }: LoadingProps) {
  return (
    <S.LoadingContainer color={color}>
      <CircleNotch size={size} />
    </S.LoadingContainer>
  )
}
