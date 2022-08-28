import { ButtonHTMLAttributes, useState } from 'react'

import {
  behaviorAttributes,
  teamAttributes,
  workstationAttributes,
} from '../../utils/attributes'

import { SelectButton } from './SelectButton'

import * as S from './styles'

interface SelectButtonProps {
  category: 'behavior' | 'team' | 'workstation'
}

export function Multiselect({ category, ...rest }: SelectButtonProps) {
  return (
    <S.MultiselectContainer>
      {category === 'behavior' &&
        behaviorAttributes.map((attribute) => (
          <SelectButton key={attribute.title} title={attribute.title} {...rest}>
            {attribute.title}
          </SelectButton>
        ))}

      {category === 'team' &&
        teamAttributes.map((attribute) => (
          <SelectButton key={attribute.title} title={attribute.title} {...rest}>
            {attribute.title}
          </SelectButton>
        ))}

      {category === 'workstation' &&
        workstationAttributes.map((attribute) => (
          <SelectButton key={attribute.title} title={attribute.title} {...rest}>
            {attribute.title}
          </SelectButton>
        ))}
    </S.MultiselectContainer>
  )
}
