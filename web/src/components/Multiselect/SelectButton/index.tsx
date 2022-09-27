import { ButtonHTMLAttributes, useState } from 'react'

import * as S from './styles'

interface SelectButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  isActive: boolean
}

export function SelectButton({ title, isActive, ...rest }: SelectButtonProps) {
  return (
    <S.SelectButtonContainer isActive={isActive} {...rest}>
      {title}
    </S.SelectButtonContainer>
  )
}
