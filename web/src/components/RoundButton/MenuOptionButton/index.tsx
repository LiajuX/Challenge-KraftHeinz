import { ButtonHTMLAttributes } from 'react'
import { useTheme } from 'styled-components'
import { FiSettings } from 'react-icons/fi'

import { Icon } from '../../Icon'

import * as S from './styles'

interface MenuOptionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  color: string
  icon: 'task' | 'settings' | 'group'
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
        {icon === 'settings' ? (
          <FiSettings color={colors.white} size={32} />
        ) : (
          <Icon icon={icon} size={32} />
        )}
      </S.IconContainer>
    </S.MenuOptionButtonContainer>
  )
}
