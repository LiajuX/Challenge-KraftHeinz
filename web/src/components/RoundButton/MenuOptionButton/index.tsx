import { ButtonHTMLAttributes } from 'react'
import { useTheme } from 'styled-components'
import { PencilSimple } from 'phosphor-react'

import { Icon } from '../../Icon'

import * as S from './styles'

interface MenuOptionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  color: string
  icon: 'task' | 'pen' | 'group'
}

export function MenuOptionButton({
  title,
  color,
  icon,
  ...rest
}: MenuOptionButtonProps) {
  const colors = useTheme()

  return (
    <S.MenuOptionButtonContainer {...rest}>
      {title}

      <S.IconContainer color={color}>
        {icon === 'pen' ? (
          <PencilSimple color={colors.white} weight="bold" size={32} />
        ) : (
          <Icon icon={icon} size={32} />
        )}
      </S.IconContainer>
    </S.MenuOptionButtonContainer>
  )
}
