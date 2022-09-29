import { useEffect, useState } from 'react'
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { Plus } from 'phosphor-react'
import { useTheme } from 'styled-components'
import { format, differenceInDays, addDays } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { useAuth } from '../../hooks/useAuth'

import { User } from '../../contexts/AuthContext'

import { database } from '../../services/firebase'

import { Loading } from '../../components/Loading'
import { TeamMemberCard } from '../../components/TeamMemberCard'
import { SearchBar } from '../../components/SearchBar'
import { TeamMemberEvaluationModal } from './components/TeamMemberEvaluationModal'
import { RoundButton } from '../../components/RoundButton'
import { TeamMemberManagerEvaluationModal } from './components/TeamMemberManagerEvaluationModal'
import { MenuOptionButton } from '../../components/RoundButton/MenuOptionButton'
import { Modal } from '../../components/Modal'
import { CreateNewTeamModal } from './components/CreateNewTeamModal'
import { AddNewMemberModal } from './components/AddNewMemberModal'

import * as S from './styles'

interface TeamProps {
  id: string
  title: string
  is_subteam: boolean
  members: User[]
  managed_by: string
}

export function Teams() {
  const [data, setData] = useState<TeamProps[]>([])
  const [searchListData, setSearchListData] = useState<TeamProps[]>([])
  const [search, setSearch] = useState('')
  const [isEditingTeams, setIsEditingTeams] = useState(false)

  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false)
  const [currentMemberEvaluating, setCurrentMemberEvaluating] = useState<User>(
    {} as User,
  )

  const [isAddNewMemberModalOpen, setIsAddNewMemberModalOpen] = useState(false)
  const [teamIdCurrentlyEditing, setTeamIdCurrentlyEditing] = useState('')
  const [teamMembersCurrentlyEditing, setTeamMembersCurrentlyEditing] =
    useState<User[]>([])

  const [isCreateNewTeamModalOpen, setIsCreateNewTeamModalOpen] =
    useState(false)
  const [isNewTeamASubteam, setIsNewTeamASubteam] = useState(false)

  const { user } = useAuth()

  const colors = useTheme()

  const teamsLocalStorageKey = '@kraftheinz:teams'

  function handleOpenTeamMemberEvaluationModal(member: User) {
    setCurrentMemberEvaluating(member)
    setIsEvaluationModalOpen(true)
  }

  function handleCloseTeamMemberEvaluationModal() {
    setIsEvaluationModalOpen(false)
  }

  function handleEditTeams() {
    setIsEditingTeams(true)
  }

  function handleStopEditingTeams() {
    setIsEditingTeams(false)
  }

  function handleOpenAddNewMemberModal(teamId: string, teamMembers: User[]) {
    setIsAddNewMemberModalOpen(true)
    setTeamIdCurrentlyEditing(teamId)
    setTeamMembersCurrentlyEditing(teamMembers)
  }

  function handleCloseAddNewMemberModal() {
    setIsAddNewMemberModalOpen(false)
  }

  function handleOpenCreateNewTeamModal(isSubteam: boolean) {
    setIsCreateNewTeamModalOpen(true)
    setIsNewTeamASubteam(isSubteam)
  }

  function handleCloseCreateNewTeamModal() {
    setIsCreateNewTeamModalOpen(false)
  }

  async function handleDeleteTeamMember(team: TeamProps, teamMemberId: string) {
    const updatedTeamMembers = team.members.filter(
      (teamMember) => teamMember.id !== teamMemberId,
    )
    const teamMemberRef = doc(database, 'teams', team.id)

    await updateDoc(teamMemberRef, {
      members: updatedTeamMembers,
    })
  }

  useEffect(() => {
    const employeesQuery = query(
      collection(database, 'teams'),
      where('managed_by', '==', user!.is_manager ? user!.id : user!.manager_id),
    )

    const unsubscribe = onSnapshot(employeesQuery, (querySnapshot) => {
      const teams: TeamProps[] = []

      querySnapshot.forEach((doc) => {
        const isCurrentUserInThisTeam = !!doc
          .data()
          .members.find((member: User) => member.id === user!.id)

        if (isCurrentUserInThisTeam) {
          teams.push({
            id: doc.id,
            ...doc.data(),
          } as TeamProps)
        }
      })

      const teamsLocalData = localStorage.getItem(teamsLocalStorageKey)
      const formattedLocalData = teamsLocalData && JSON.parse(teamsLocalData)

      setData(teams || formattedLocalData)
      setSearchListData(teams || formattedLocalData)
      localStorage.setItem(teamsLocalStorageKey, JSON.stringify(teams))
    })

    return () => {
      unsubscribe()
    }
  }, [user])

  useEffect(() => {
    setSearchListData(data.filter((team) => team.title.includes(search)))
  }, [data, search])

  return (
    <>
      <S.TeamsContainer>
        <h1>Equipes</h1>

        <S.ContentWrapper>
          <S.ContentWrapperHeader>
            <S.SearchBarContainer>
              <SearchBar
                placeholder="Pesquisar"
                onChange={(event) => setSearch(event.target.value)}
              />
            </S.SearchBarContainer>
          </S.ContentWrapperHeader>

          {searchListData ? (
            searchListData.map((team) => (
              <S.TeamContainer key={team.id}>
                <h3>
                  {team.title} {isEditingTeams && ' (clique para editar)'}
                </h3>

                {team.members
                  ?.filter((member) => member.id !== user?.id)
                  .map((member) => (
                    <S.TeamMemberCardContainer key={member.id}>
                      <TeamMemberCard data={member}>
                        <S.EvaluationTimeContainer>
                          <span>
                            Última avaliação em{' '}
                            {/* format(member.last_evaluation, 'dd/MM/yyyy', {
                          locale: ptBR,
                        }) */}
                          </span>

                          {/* <span>
                        Tempo até nova avaliação:{' '}
                        {differenceInDays(new Date(), member.last_evaluation) >=
                        31
                          ? 'Disponível'
                          : differenceInDays(
                              addDays(member.last_evaluation, 31),
                              new Date(),
                            ) + ' dias'}
                      </span> */}
                        </S.EvaluationTimeContainer>

                        {isEditingTeams && (
                          <S.DeleteButton
                            onClick={() =>
                              handleDeleteTeamMember(team, member.id)
                            }
                          >
                            remover
                          </S.DeleteButton>
                        )}
                        {/*  : differenceInDays(new Date(), member.last_evaluation) >
                      30 ? (
                      <Button
                        title="Avaliar"
                        buttonStyle="secondary"
                        onClick={() =>
                          handleOpenTeamMemberEvaluationModal(member)
                        }
                      />
                    ) : (
                      <S.DisabledButton>avaliar</S.DisabledButton>
                    )} */}

                        {user?.is_manager ? (
                          <TeamMemberManagerEvaluationModal
                            member={currentMemberEvaluating}
                            isOpen={isEvaluationModalOpen}
                            onCloseModal={handleCloseTeamMemberEvaluationModal}
                          />
                        ) : (
                          <TeamMemberEvaluationModal
                            member={currentMemberEvaluating}
                            isOpen={isEvaluationModalOpen}
                            onCloseModal={handleCloseTeamMemberEvaluationModal}
                          />
                        )}
                      </TeamMemberCard>
                    </S.TeamMemberCardContainer>
                  ))}

                {isEditingTeams && (
                  <S.AddNewMemberButton
                    onClick={() =>
                      handleOpenAddNewMemberModal(team.id, team.members)
                    }
                  >
                    <Plus size={18} />
                  </S.AddNewMemberButton>
                )}
              </S.TeamContainer>
            ))
          ) : (
            <Loading size={80} />
          )}
        </S.ContentWrapper>
      </S.TeamsContainer>

      {user?.is_manager && (
        <RoundButton>
          {isEditingTeams ? (
            <MenuOptionButton
              title="Parar de editar"
              icon="pen"
              color={colors['red-500']}
              onClick={handleStopEditingTeams}
            />
          ) : (
            <MenuOptionButton
              title="Editar equipes"
              icon="pen"
              color={colors['green-500']}
              onClick={handleEditTeams}
            />
          )}

          <MenuOptionButton
            title="Nova sub-equipe"
            icon="group"
            color={colors['blue-500']}
            onClick={() => handleOpenCreateNewTeamModal(true)}
          />

          <MenuOptionButton
            title="Nova equipe"
            icon="group"
            color={colors['blue-600']}
            onClick={() => handleOpenCreateNewTeamModal(false)}
          />
        </RoundButton>
      )}

      <Modal
        isOpen={isCreateNewTeamModalOpen}
        onCloseModal={handleCloseCreateNewTeamModal}
      >
        <CreateNewTeamModal
          onCloseModal={handleCloseCreateNewTeamModal}
          isSubteam={isNewTeamASubteam}
        />
      </Modal>

      <Modal
        isOpen={isAddNewMemberModalOpen}
        onCloseModal={handleCloseAddNewMemberModal}
      >
        <AddNewMemberModal
          onCloseModal={handleCloseAddNewMemberModal}
          teamId={teamIdCurrentlyEditing}
          currentMembers={teamMembersCurrentlyEditing}
        />
      </Modal>
    </>
  )
}
