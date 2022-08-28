import { ButtonHTMLAttributes, useState } from 'react'

import * as S from './styles'

interface SelectButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
}

export function SelectButton({ title, ...rest }: SelectButtonProps) {
  const [isActive, setIsActive] = useState(false)

  return (
    <S.SelectButtonContainer
      isActive={isActive}
      onClick={() => setIsActive((state) => !state)}
      {...rest}
    >
      {title}
    </S.SelectButtonContainer>
  )
}
