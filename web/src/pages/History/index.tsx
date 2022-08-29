import { useEffect, useState } from 'react'
import { useTheme } from 'styled-components'

import { SatisfactionEmoji } from '../../components/SatisfactionEmoji'
import { TeamMemberCard } from '../../components/TeamMemberCard'
import { SearchBar } from '../../components/SearchBar'
import { Modal } from '../../components/Modal'

import * as S from './styles'

const employees = [
  {
    id: '123456789',
    name: 'Guilherme Carvalho',
    avatar_url: 'https://github.com/diego3g.png',
    role: 'marketing',
    role_title: 'Marketing',
    potential: 'B',
    task_amount: 26,
  },
  {
    id: '123689',
    name: 'Carol Medeiros',
    avatar_url: 'https://github.com/rafaballerini.png',
    role: 'dev',
    role_title: 'Desenvolvedora',
    potential: 'A',
    task_amount: 32,
  },
  {
    id: '1234589',
    name: 'Vinicius Amâncio',
    avatar_url: 'https://github.com/luizbatanero.png',
    role: 'design',
    role_title: 'Designer',
    potential: 'C',
    task_amount: 19,
  },
  {
    id: '345689',
    name: 'Diego Galvão',
    avatar_url: 'https://avatars.githubusercontent.com/u/4669899?v=4',
    role: 'it',
    role_title: 'TI',
    potential: 'A',
    task_amount: 26,
  },
]

interface TeamMember {
  id: string
  name: string
  avatar_url: string
  role: string
  role_title: string
  potential: string
  task_amount: number
}

export function History() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [data, setData] = useState<TeamMember[]>(employees)
  const [searchListData, setSearchListData] = useState<TeamMember[]>(employees)
  const [search, setSearch] = useState('')

  const colors = useTheme()

  function handleOpenHistoryModal() {
    setIsModalOpen(true)
  }

  function handleCLoseHistoryModal() {
    setIsModalOpen(false)
  }

  useEffect(() => {
    setSearchListData(data.filter((employee) => employee.name.includes(search)))
  }, [data, search])

  return (
    <>
      <S.HistoryContainer>
        <h1>Relatório de avaliações</h1>

        <S.ContentWrapper>
          <S.ContentWrapperHeader>
            <h3>Escolha um colaborador para ver sua timeline</h3>

            <SearchBar
              placeholder="Pesquisar"
              onChange={(event) => setSearch(event.target.value)}
            />
          </S.ContentWrapperHeader>

          {searchListData.map((employee) => (
            <S.TeamMemberButton
              key={employee.id}
              onClick={handleOpenHistoryModal}
            >
              <TeamMemberCard data={employee}>
                <span>
                  {employee.task_amount} entregas desde a última avaliação
                </span>

                {employee.potential === 'A' && (
                  <SatisfactionEmoji
                    type="great"
                    size={44}
                    color={colors['blue-800']}
                  />
                )}

                {employee.potential === 'B' && (
                  <SatisfactionEmoji
                    type="good"
                    size={44}
                    color={colors['blue-550']}
                  />
                )}

                {employee.potential === 'C' && (
                  <SatisfactionEmoji
                    type="regular"
                    size={44}
                    color={colors['blue-200']}
                  />
                )}
              </TeamMemberCard>
            </S.TeamMemberButton>
          ))}
        </S.ContentWrapper>
      </S.HistoryContainer>

      <Modal
        isOpen={isModalOpen}
        onCloseModal={handleCLoseHistoryModal}
      ></Modal>
    </>
  )
}
