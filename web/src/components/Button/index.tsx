import { ButtonHTMLAttributes } from 'react'
import { CircleNotch } from 'phosphor-react'

import { ButtonContainer } from './styles'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  isLoading?: boolean
  buttonStyle: 'primary' | 'secondary' | 'tertiary'
}

export function Button({ title, isLoading, buttonStyle, ...rest }: Props) {
  return (
    <ButtonContainer buttonStyle={buttonStyle} {...rest}>
      {isLoading ? <CircleNotch size={24} /> : title}
    </ButtonContainer>
  )
}
