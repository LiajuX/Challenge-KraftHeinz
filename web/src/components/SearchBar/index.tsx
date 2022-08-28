import { InputHTMLAttributes } from 'react'
import { BiSearchAlt } from 'react-icons/bi'

import * as S from './styles'

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {}

export function SearchBar({ ...rest }: SearchBarProps) {
  return (
    <S.InputContainer>
      <BiSearchAlt size={18} />

      <input {...rest} />
    </S.InputContainer>
  )
}
