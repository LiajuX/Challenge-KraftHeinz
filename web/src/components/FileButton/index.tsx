import { Plus } from 'phosphor-react'

import * as S from './styles'

export function FileButton() {
  return (
    <S.FileInput>
      <label htmlFor="file">
        <Plus size={18} />
      </label>

      <input id="for" type="file" multiple />
    </S.FileInput>
  )
}
