import { behaviorAttributes } from '../../utils/attributes'

import { SelectButton } from './SelectButton'

import * as S from './styles'

export interface Attribute {
  id: string
  title: string
  action: number
  category: string
}

interface MultiselectProps {
  category: 'behavior'
  selectedAttributes: Attribute[]
  handleAttributeSelection: (selectedAttribute: Attribute) => void
}

export function Multiselect({
  category,
  selectedAttributes,
  handleAttributeSelection,
  ...rest
}: MultiselectProps) {
  return (
    <S.MultiselectContainer>
      {category === 'behavior' &&
        behaviorAttributes.map((attribute) => (
          <S.SelectButtonContainer key={attribute.id}>
            <SelectButton
              title={attribute.options[0].title}
              isActive={
                !!selectedAttributes.find(
                  (selectedAttribute) =>
                    attribute.options[0].title === selectedAttribute.title,
                )
              }
              onClick={() => handleAttributeSelection(attribute.options[0])}
              {...rest}
            >
              {attribute.options[0].title}
            </SelectButton>

            <SelectButton
              title={attribute.options[1].title}
              isActive={
                !!selectedAttributes.find(
                  (selectedAttribute) =>
                    attribute.options[1].title === selectedAttribute.title,
                )
              }
              onClick={() => handleAttributeSelection(attribute.options[1])}
              {...rest}
            >
              {attribute.options[1].title}
            </SelectButton>
          </S.SelectButtonContainer>
        ))}
    </S.MultiselectContainer>
  )
}
