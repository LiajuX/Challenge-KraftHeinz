import { useState } from 'react'

import { behaviorAttributes } from '../../utils/attributes'

import { SelectButton } from './SelectButton'

import * as S from './styles'

interface SelectButtonProps {
  category: 'behavior'
}

interface Attribute {
  title: string
  action: number
}

export function Multiselect({ category, ...rest }: SelectButtonProps) {
  const [selectedAttributes, setSelectedAttributes] = useState<Attribute[]>([])

  function handleAttributeSelection(attribute: Attribute) {
    setSelectedAttributes((oldState) => [...oldState, attribute])
  }

  return (
    <S.MultiselectContainer>
      {category === 'behavior' &&
        behaviorAttributes.map((attribute) => (
          <SelectButton
            key={attribute.title}
            title={attribute.title}
            isActive={
              !!selectedAttributes.find(
                (selectedAttribute) =>
                  attribute.title === selectedAttribute.title,
              )
            }
            onClick={() => handleAttributeSelection(attribute)}
            {...rest}
          >
            {attribute.title}
          </SelectButton>
        ))}
    </S.MultiselectContainer>
  )
}
