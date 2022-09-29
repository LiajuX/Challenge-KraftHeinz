import { RefObject, TextareaHTMLAttributes } from 'react'

import * as S from './styles'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  ref?: RefObject<HTMLTextAreaElement>
}

export function Textarea({ ...rest }: TextareaProps) {
  return <S.TextareaContainer {...rest} />
}
