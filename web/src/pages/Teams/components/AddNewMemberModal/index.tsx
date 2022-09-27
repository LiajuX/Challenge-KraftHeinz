import { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'

import { database } from '../../../../services/firebase'

import { User } from '../../../../contexts/AuthContext'

import { EmployeesList } from '../EmployeesList'
import { Button } from '../../../../components/Button'

import * as S from './styles'

interface AddNewMemberModalProps {
  onCloseModal: () => void
  teamId: string
  currentMembers: User[]
}

export function AddNewMemberModal({
  teamId,
  currentMembers,
  onCloseModal,
}: AddNewMemberModalProps) {
  const [selectedMembers, setSelectedMembers] = useState<User[]>([])

  async function handleAddNewMembers() {
    const teamRef = doc(database, 'teams', teamId)

    await updateDoc(teamRef, {
      members: selectedMembers,
    })
      .then(() => {
        onCloseModal()
      })
      .catch(() => {
        window.alert('Não foi possível adicionar novos usuários!')
      })
  }

  return (
    <S.AddNewMemberModalContainer>
      <strong>Adicionar membro</strong>

      <h3>Selecione um membro para adicionar</h3>

      <EmployeesList
        selectedNewMembers={selectedMembers}
        setSelectedNewMembers={setSelectedMembers}
        unavailableMembers={currentMembers}
      />

      <S.ButtonContainer>
        <Button
          buttonStyle="secondary"
          title="concluir"
          disabled={selectedMembers.length === 0}
          onClick={handleAddNewMembers}
        />
      </S.ButtonContainer>
    </S.AddNewMemberModalContainer>
  )
}
