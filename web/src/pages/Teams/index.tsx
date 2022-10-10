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

import { database } from '../../services/firebase'

import { Button } from '../../components/Button'
import { Loading } from '../../components/Loading'
import { TeamMemberCard } from '../../components/TeamMemberCard'
import { SearchBar } from '../../components/SearchBar'
import {
  TeamMemberEvaluation,
  TeamMemberEvaluationModal,
} from './components/TeamMemberEvaluationModal'
import { RoundButton } from '../../components/RoundButton'
import { MenuOptionButton } from '../../components/RoundButton/MenuOptionButton'
import { Modal } from '../../components/Modal'
import { CreateNewTeamModal } from './components/CreateNewTeamModal'
import { AddNewMemberModal } from './components/AddNewMemberModal'

import * as S from './styles'

export interface TeamMember {
  id: string
  name: string
  avatar_url: string
  role: string
  role_insensitive: string
  bias?: number
  team_evaluations?: TeamMemberEvaluation[]
}

export interface TeamProps {
  id: string
  title: string
  is_subteam: boolean
  members: TeamMember[]
  managed_by: string
}

export function Teams() {
  const [data, setData] = useState<TeamProps[]>([])
  const [searchListData, setSearchListData] = useState<TeamProps[]>([])
  const [search, setSearch] = useState('')
  const [isEditingTeams, setIsEditingTeams] = useState(false)

  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false)
  const [currentMemberEvaluating, setCurrentMemberEvaluating] =
    useState<TeamMember>({} as TeamMember)

  const [isAddNewMemberModalOpen, setIsAddNewMemberModalOpen] = useState(false)
  const [teamIdCurrentlyEditing, setTeamIdCurrentlyEditing] = useState('')
  const [teamMembersCurrentlyEditing, setTeamMembersCurrentlyEditing] =
    useState<TeamMember[]>([])

  const [isCreateNewTeamModalOpen, setIsCreateNewTeamModalOpen] =
    useState(false)
  const [isNewTeamASubteam, setIsNewTeamASubteam] = useState(false)

  const { user } = useAuth()

  const colors = useTheme()

  const teamsLocalStorageKey = '@kraftheinz:teams'

  function handleOpenTeamMemberEvaluationModal(member: TeamMember) {
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

  function handleOpenAddNewMemberModal(
    teamId: string,
    teamMembers: TeamMember[],
  ) {
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

    const usersQuery = query(
      collection(database, 'users'),
      where('manager_id', '==', user!.is_manager ? user!.id : user!.manager_id),
    )

    const unsubscribe = onSnapshot(employeesQuery, async (querySnapshot) => {
      const teams: TeamProps[] = []

      querySnapshot.forEach((doc) => {
        const isCurrentUserInThisTeam = !!doc
          .data()
          .members.find((member: TeamMember) => member.id === user!.id)

        const isThereAnAvaliationOfTheCurrentUser = !!doc
          .data()
          .members.forEach((member: TeamMember) =>
            member?.team_evaluations?.find(
              (teamEvaluation: TeamMemberEvaluation) =>
                teamEvaluation.evaluator === user?.id,
            ),
          )

        if (isCurrentUserInThisTeam) {
          if (isThereAnAvaliationOfTheCurrentUser) {
            teams.push({
              id: doc.id,
              ...doc.data(),
            } as TeamProps)
          } else {
            teams.push({
              id: doc.id,
              ...doc.data(),
              members: doc.data().members.map((member: TeamMember) => {
                return { ...member, team_evaluations: null }
              }),
            } as TeamProps)
          }
        }

        onSnapshot(usersQuery, (usersQuerySnapshot) => {
          teams.forEach((team) => {
            usersQuerySnapshot.forEach((userDoc) => {
              if (userDoc.data().team_evaluations) {
                const evaluations = userDoc
                  .data()
                  .team_evaluations?.find(
                    (teamEvaluation: TeamMemberEvaluation) =>
                      teamEvaluation.evaluator === user?.id,
                  )

                const userEvaluations = {
                  id: userDoc.id,
                  evaluations: evaluations ? [evaluations] : null,
                }

                if (userEvaluations.evaluations) {
                  userEvaluations.evaluations.map((evaluation) => {
                    return (evaluation.last_evaluation =
                      evaluation.last_evaluation.toDate())
                  })

                  team.members.forEach((member) => {
                    if (member.id === userEvaluations.id) {
                      if (userEvaluations.evaluations) {
                        member.team_evaluations = [
                          ...userEvaluations.evaluations,
                        ]
                      }
                    }
                  })
                } else {
                  return team
                }
              }
            })
          })

          const teamsLocalData = localStorage.getItem(teamsLocalStorageKey)
          const formattedLocalData =
            teamsLocalData && JSON.parse(teamsLocalData)

          setData(teams || formattedLocalData)
          setSearchListData(teams || formattedLocalData)
          localStorage.setItem(teamsLocalStorageKey, JSON.stringify(teams))
        })
      })
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
                            {member.team_evaluations
                              ? `Última avaliação em ${format(
                                  member.team_evaluations[0].last_evaluation,
                                  'dd/MM/yyyy',
                                  {
                                    locale: ptBR,
                                  },
                                )}`
                              : 'Sem dados de avaliação'}
                          </span>

                          {member.team_evaluations ? (
                            <span>
                              Tempo até nova avaliação:{' '}
                              {team.is_subteam
                                ? differenceInDays(
                                    new Date(),
                                    member.team_evaluations[0].last_evaluation,
                                  ) >= 30
                                  ? 'Disponível'
                                  : differenceInDays(
                                      addDays(
                                        member.team_evaluations[0]
                                          .last_evaluation,
                                        30,
                                      ),
                                      new Date(),
                                    ) + ' dias'
                                : differenceInDays(
                                    new Date(),
                                    member.team_evaluations[0].last_evaluation,
                                  ) >= 60
                                ? 'Disponível'
                                : differenceInDays(
                                    addDays(
                                      member.team_evaluations[0]
                                        .last_evaluation,
                                      60,
                                    ),
                                    new Date(),
                                  ) + ' dias'}
                            </span>
                          ) : (
                            <span>Disponível</span>
                          )}
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

                        {!isEditingTeams &&
                          member.team_evaluations &&
                          team.is_subteam &&
                          (differenceInDays(
                            new Date(),
                            member.team_evaluations[0].last_evaluation,
                          ) > 30 ? (
                            <Button
                              title="Avaliar"
                              buttonStyle="secondary"
                              onClick={() =>
                                handleOpenTeamMemberEvaluationModal(member)
                              }
                            />
                          ) : (
                            <S.DisabledButton>Avaliar</S.DisabledButton>
                          ))}

                        {!isEditingTeams &&
                          member.team_evaluations &&
                          !team.is_subteam &&
                          (differenceInDays(
                            new Date(),
                            member.team_evaluations[0].last_evaluation,
                          ) > 60 ? (
                            <Button
                              title="Avaliar"
                              buttonStyle="secondary"
                              onClick={() =>
                                handleOpenTeamMemberEvaluationModal(member)
                              }
                            />
                          ) : (
                            <S.DisabledButton>Avaliar</S.DisabledButton>
                          ))}

                        {!isEditingTeams && !member.team_evaluations && (
                          <Button
                            title="Avaliar"
                            buttonStyle="secondary"
                            onClick={() =>
                              handleOpenTeamMemberEvaluationModal(member)
                            }
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
        isOpen={isEvaluationModalOpen}
        onCloseModal={handleCloseTeamMemberEvaluationModal}
      >
        <TeamMemberEvaluationModal
          member={currentMemberEvaluating}
          onCloseModal={handleCloseTeamMemberEvaluationModal}
        />
      </Modal>

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
