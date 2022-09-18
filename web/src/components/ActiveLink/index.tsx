import { NavLinkProps } from 'react-router-dom'

import * as S from './styles'

interface Props extends NavLinkProps {
  title: string
  type: 'primary' | 'secondary' | 'tertiary'
}

export function ActiveLink({ title, type, ...rest }: Props) {
  return (
    <S.ActiveLinkContainer type={type} {...rest}>
      {title}
    </S.ActiveLinkContainer>
  )
}
