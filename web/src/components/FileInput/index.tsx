import { useState } from 'react'
import { Plus } from 'phosphor-react'

import * as S from './styles'

export function FileInput() {
  const [files, setFiles] = useState([])

  function uploadFiles(event: any) {
    console.log(event.target.files[0])
  }

  return (
    <S.FileInput>
      <label htmlFor="file">
        <Plus size={18} />
      </label>

      <input id="for" type="file" onChange={uploadFiles} multiple />
    </S.FileInput>
  )
}
