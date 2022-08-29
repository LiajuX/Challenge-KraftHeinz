import { useEffect, useState } from 'react'
import { format, differenceInDays, addDays } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { TeamMemberCard } from '../../components/TeamMemberCard'

import { SearchBar } from '../../components/SearchBar'
import { Modal } from '../../components/Modal'

import * as S from './styles'
import { Button } from '../../components/Button'
import { TeamMemberEvaluationModal } from './components/TeamMemberEvaluationModal'

const teams = [
  {
    id: '123456789',
    name: 'Seção de pesquisa e desenvolvimento',
    members: [
      {
        id: '345689',
        name: 'Jakeliny Carvalho',
        avatar_url: 'https://github.com/jakeliny.png',
        role: 'manager',
        role_title: 'Gerente',
        potential: 'B',
        task_amount: 40,
        last_evaluation: new Date(2022, 7, 30),
      },
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
        id: '345689',
        name: 'Jakeliny Carvalho',
        avatar_url: 'https://github.com/jakeliny.png',
        role: 'manager',
        role_title: 'Gerente',
        potential: 'B',
        task_amount: 40,
        last_evaluation: new Date(2022, 7, 30),
      },
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

export function Teams() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [data, setData] = useState<TeamsProps[]>(teams)
  const [searchListData, setSearchListData] = useState<TeamsProps[]>(teams)
  const [currentMember, setCurrentMember] = useState<TeamMember>(
    {} as TeamMember,
  )
  const [search, setSearch] = useState('')

  function handleOpenTeamMemberEvaluationModal(member: TeamMember) {
    setCurrentMember(member)
    setIsModalOpen(true)
  }

  function handleCloseTeamMemberEvaluationModal() {
    setIsModalOpen(false)
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
            <SearchBar
              placeholder="Pesquisar"
              onChange={(event) => setSearch(event.target.value)}
            />
          </S.ContentWrapperHeader>

          {searchListData.map((team) => (
            <S.TeamContainer key={team.id}>
              <h3>{team.name}</h3>

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

                    {differenceInDays(new Date(), member.last_evaluation) >
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

                    <TeamMemberEvaluationModal
                      member={currentMember}
                      isOpen={isModalOpen}
                      onCloseModal={handleCloseTeamMemberEvaluationModal}
                    />
                  </TeamMemberCard>
                </S.TeamMemberCardContainer>
              ))}
            </S.TeamContainer>
          ))}
        </S.ContentWrapper>
      </S.TeamsContainer>
    </>
  )
}
