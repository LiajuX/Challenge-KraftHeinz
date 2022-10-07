import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Plus } from 'phosphor-react'

import * as S from './styles'

interface FileInputProps {
  getRootProps: any
  getInputProps: any
  acceptedFiles: File[]
  isFocused: boolean
  isDragReject: boolean
}

export function FileInput({
  getRootProps,
  getInputProps,
  acceptedFiles,
  isFocused,
  isDragReject,
}: FileInputProps) {
  return (
    <S.FileInputContainer {...getRootProps({ isFocused, isDragReject })}>
      <label htmlFor="file">
        <Plus size={18} />
      </label>

      <input id="for" type="file" {...getInputProps()} />
    </S.FileInputContainer>
  )
}
