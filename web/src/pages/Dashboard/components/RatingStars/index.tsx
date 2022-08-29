import { useTheme } from 'styled-components'
import { Star, StarHalf } from 'phosphor-react'

import * as S from './styles'

interface RatingStarsProps {
  value: number
}

export function RatingStars({ value }: RatingStarsProps) {
  const colors = useTheme()

  const hasHalfStar = value % 1 !== 0 && value % 1 <= 0.5

  const hasExtraStar = value % 1 >= 0.51

  return (
    <S.RatingStarsContainer>
      {Array.from({ length: value }, (_, index) => (
        <Star key={index} size={22} weight="fill" color={colors['green-500']} />
      ))}

      {hasHalfStar && (
        <StarHalf size={22} weight="fill" color={colors['green-500']} />
      )}

      {hasExtraStar && (
        <Star size={22} weight="fill" color={colors['green-500']} />
      )}
    </S.RatingStarsContainer>
  )
}
