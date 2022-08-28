import { ButtonHTMLAttributes } from 'react'

import { ButtonContainer } from './styles'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  buttonStyle: 'primary' | 'secondary' | 'tertiary'
}

export function Button({ title, buttonStyle, ...rest }: Props) {
  return (
    <ButtonContainer buttonStyle={buttonStyle} {...rest}>
      {title}
    </ButtonContainer>
  )
}
