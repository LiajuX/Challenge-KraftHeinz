import { AnchorHTMLAttributes } from 'react'
import { NavLinkProps } from 'react-router-dom'

import * as S from './styles'

interface Props extends NavLinkProps {
  title: string
  linkStyle: 'primary' | 'secondary' | 'tertiary'
}

export function ActiveLink({ title, linkStyle, ...rest }: Props) {
  return (
    <S.ActiveLinkContainer linkStyle={linkStyle} {...rest}>
      {title}
    </S.ActiveLinkContainer>
  )
}
