import { Paperclip } from 'phosphor-react'

import * as S from './styles'

export interface FileType {
  name: string
  url?: string
}

interface FileProps {
  data: FileType
  taskAttached: string
}

export function File({ data, taskAttached }: FileProps) {
  const filename = data.name.split('.')[0]

  const truncatedFilename =
    filename.length <= 48 ? filename : filename.slice(0, 48) + '...'

  const extension = data.name.split('.')[1]

  return (
    <S.FileContainer href={data.url} target="_blank">
      <S.ExtensionWrapper>
        <Paperclip size={20} />
        <span>.{extension}</span>
      </S.ExtensionWrapper>

      <S.FilenameContainer>
        <strong>{truncatedFilename}</strong>
        <span>{taskAttached}</span>
      </S.FilenameContainer>
    </S.FileContainer>
  )
}
