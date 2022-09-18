import { useEffect, useState } from 'react'
import { Plus } from 'phosphor-react'
import { useTheme } from 'styled-components'
import { format, differenceInDays, addDays } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { useAuth } from '../../hooks/useAuth'

import { TeamMemberCard } from '../../components/TeamMemberCard'
import { SearchBar } from '../../components/SearchBar'
import { Button } from '../../components/Button'
import { TeamMemberEvaluationModal } from './components/TeamMemberEvaluationModal'
import { RoundButton } from '../../components/RoundButton'
import { TeamMemberManagerEvaluationModal } from './components/TeamMemberManagerEvaluationModal'
import { MenuOptionButton } from '../../components/RoundButton/MenuOptionButton'
import { Modal } from '../../components/Modal'
import { EmployeesListModal } from './components/EmployeesListModal'

import * as S from './styles'

const teams = [
  {
    id: '123456789',
    name: 'Seção de pesquisa e desenvolvimento',
    members: [
      {
        id: '123456789',
        name: 'Diego Galvão',
        avatar_url: 'https://avatars.githubusercontent.com/u/4669899?v=4',
        role: 'it',
        role_title: 'TI',
        potential: 'A',
        task_amount: 26,
        last_evaluation: new Date(2022, 6, 18),
      },
      {
        id: '123689',
        name: 'Carol Medeiros',
        avatar_url: 'https://github.com/rafaballerini.png',
        role: 'dev',
        role_title: 'Desenvolvedora',
        potential: 'A',
        task_amount: 32,
        last_evaluation: new Date(2022, 6, 20),
      },
      {
        id: '1234589',
        name: 'Vinicius Amâncio',
        avatar_url: 'https://github.com/luizbatanero.png',
        role: 'design',
        role_title: 'Designer',
        potential: 'C',
        task_amount: 19,
        last_evaluation: new Date(2022, 7, 24),
      },
    ],
  },
  {
    id: '123456798',
    name: 'Equipe de desenvolvimento de produtos',
    members: [
      {
        id: '123456789',
        name: 'Diego Galvão',
        avatar_url: 'https://avatars.githubusercontent.com/u/4669899?v=4',
        role: 'it',
        role_title: 'TI',
        potential: 'A',
        task_amount: 26,
        last_evaluation: new Date(2022, 6, 18),
      },
      {
        id: '1234589',
        name: 'Vinicius Amâncio',
        avatar_url: 'https://github.com/luizbatanero.png',
        role: 'design',
        role_title: 'Designer',
        potential: 'C',
        task_amount: 19,
        last_evaluation: new Date(2022, 7, 24),
      },
    ],
  },
]

export interface TeamMember {
  id: string
  name: string
  avatar_url: string
  role: string
  role_title: string
  potential: string
  task_amount: number
  last_evaluation: Date
}

interface TeamsProps {
  id: string
  name: string
  members: TeamMember[]
}

interface Employee {
  id: string
  name: string
  username: string
  avatar_url: string
  role: string
  role_title: string
  potential: 'A' | 'B' | 'C'
  task_amount: number
  last_evaluation: Date
}

export function Teams() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditingTeams, setIsEditingTeams] = useState(false)
  const [data, setData] = useState<TeamsProps[]>(teams)
  const [searchListData, setSearchListData] = useState<TeamsProps[]>(teams)
  const [currentMember, setCurrentMember] = useState<TeamMember>(
    {} as TeamMember,
  )
  const [isEmployeesListModalOpen, setIsEmployeesListModalOpen] =
    useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState({} as Employee)
  const [search, setSearch] = useState('')

  const { user } = useAuth()

  const colors = useTheme()

  console.log(selectedEmployee)

  function handleOpenTeamMemberEvaluationModal(member: TeamMember) {
    setCurrentMember(member)
    setIsModalOpen(true)
  }

  function handleCloseTeamMemberEvaluationModal() {
    setIsModalOpen(false)
  }

  function handleEditTeams() {
    setIsEditingTeams(true)
  }

  function handleStopEditingTeams() {
    setIsEditingTeams(false)
  }

  function handleOpenEmployeesListModal() {
    setIsEmployeesListModalOpen(true)
  }

  function handleCloseEmployeesListModal() {
    setIsEmployeesListModalOpen(false)
  }

  useEffect(() => {
    setSearchListData(data.filter((team) => team.name.includes(search)))
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

          {searchListData.map((team) => (
            <S.TeamContainer key={team.id}>
              <h3>
                {team.name} {isEditingTeams && ' (clique para editar)'}
              </h3>

              {team.members.map((member) => (
                <S.TeamMemberCardContainer key={member.id}>
                  <TeamMemberCard data={member}>
                    <S.EvaluationTimeContainer>
                      <span>
                        Última avaliação em{' '}
                        {format(member.last_evaluation, 'dd/MM/yyyy', {
                          locale: ptBR,
                        })}
                      </span>

                      <span>
                        Tempo até nova avaliação:{' '}
                        {differenceInDays(new Date(), member.last_evaluation) >=
                        31
                          ? 'Disponível'
                          : differenceInDays(
                              addDays(member.last_evaluation, 31),
                              new Date(),
                            ) + ' dias'}
                      </span>
                    </S.EvaluationTimeContainer>

                    {isEditingTeams ? (
                      <S.DeleteButton>remover</S.DeleteButton>
                    ) : differenceInDays(new Date(), member.last_evaluation) >
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
                    )}

                    {user?.is_manager ? (
                      <TeamMemberManagerEvaluationModal
                        member={currentMember}
                        isOpen={isModalOpen}
                        onCloseModal={handleCloseTeamMemberEvaluationModal}
                      />
                    ) : (
                      <TeamMemberEvaluationModal
                        member={currentMember}
                        isOpen={isModalOpen}
                        onCloseModal={handleCloseTeamMemberEvaluationModal}
                      />
                    )}
                  </TeamMemberCard>
                </S.TeamMemberCardContainer>
              ))}

              {isEditingTeams && (
                <S.AddNewMemberButton onClick={handleOpenEmployeesListModal}>
                  <Plus size={18} />
                </S.AddNewMemberButton>
              )}
            </S.TeamContainer>
          ))}
        </S.ContentWrapper>
      </S.TeamsContainer>

      {user?.is_manager && (
        <RoundButton>
          {isEditingTeams ? (
            <MenuOptionButton
              title="Parar de editar"
              icon="settings"
              color={colors['red-500']}
              onClick={handleStopEditingTeams}
            />
          ) : (
            <MenuOptionButton
              title="Editar equipes"
              icon="settings"
              color={colors['green-500']}
              onClick={handleEditTeams}
            />
          )}

          <MenuOptionButton
            title="Nova sub-equipe"
            icon="group"
            color={colors['blue-500']}
          />

          <MenuOptionButton
            title="Nova equipe"
            icon="group"
            color={colors['blue-600']}
          />
        </RoundButton>
      )}

      <Modal
        isOpen={isEmployeesListModalOpen}
        onCloseModal={handleCloseEmployeesListModal}
      >
        <EmployeesListModal
          onCloseModal={handleCloseEmployeesListModal}
          selectedEmployee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
        />
      </Modal>
    </>
  )
}
