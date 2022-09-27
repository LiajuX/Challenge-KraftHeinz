import { useState } from 'react'

import { User } from '../../../../contexts/AuthContext'

import { database } from '../../../../services/firebase'

import { EmployeesList } from '../EmployeesList'
import { Button } from '../../../../components/Button'

import * as S from './styles'

interface CreateNewTeamModalProps {
  onCloseModal: () => void
  isSubteam: boolean
}

export function CreateNewTeamModal({
  isSubteam,
  onCloseModal,
}: CreateNewTeamModalProps) {
  const [title, setTitle] = useState('')
  const [selectedMembers, setSelectedMembers] = useState<User[]>([])

  const areThereSelectedMembers = selectedMembers.length > 0
  const isTitleEmpty = title.trim().length === 0

  function handleStopAddingNewMembers() {
    onCloseModal()
  }

  return (
    <S.CreateNewTeamModalContainer>
      <strong>Nova {isSubteam ? 'sub-equipe' : 'equipe'}</strong>

      <S.TitleInput
        value={title}
        placeholder={`Clique para adicionar um nome para ${
          isSubteam ? 'sub-equipe' : 'equipe'
        }`}
        onChange={(e) => setTitle(e.target.value)}
      />

      <EmployeesList
        selectedNewMembers={selectedMembers}
        setSelectedNewMembers={setSelectedMembers}
      />

      <S.ButtonContainer>
        <Button
          buttonStyle="secondary"
          title="concluir"
          disabled={!(areThereSelectedMembers && !isTitleEmpty)}
          onClick={handleStopAddingNewMembers}
        />
      </S.ButtonContainer>
    </S.CreateNewTeamModalContainer>
  )
}
