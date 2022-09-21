import { ButtonHTMLAttributes } from 'react'
import { useTheme } from 'styled-components'

import { Loading } from '../Loading'

import { ButtonContainer } from './styles'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  isLoading?: boolean
  buttonStyle: 'primary' | 'secondary' | 'tertiary'
}

export function Button({ title, isLoading, buttonStyle, ...rest }: Props) {
  const colors = useTheme()

  return (
    <ButtonContainer buttonStyle={buttonStyle} disabled={isLoading} {...rest}>
      {isLoading ? (
        <Loading
          size={24}
          color={buttonStyle === 'tertiary' ? colors['grey-200'] : colors.white}
        />
      ) : (
        title
      )}
    </ButtonContainer>
  )
}
