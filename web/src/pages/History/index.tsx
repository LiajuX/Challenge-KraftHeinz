import { useEffect, useState } from 'react'
import { useTheme } from 'styled-components'
import { collection, onSnapshot, query, where } from 'firebase/firestore'

import { useAuth } from '../../hooks/useAuth'

import { database } from '../../services/firebase'
import { User } from '../../contexts/AuthContext'

import { SatisfactionEmoji } from '../../components/SatisfactionEmoji'
import { TeamMemberCard } from '../../components/TeamMemberCard'
import { Modal } from '../../components/Modal'
import { SearchBar } from '../../components/SearchBar'
import {
  EmployeeHistoryModal,
  HistoryProps,
} from './components/EmployeeHistoryModal'

import * as S from './styles'

const historyTest: HistoryProps = {
  name: 'Diego Galvão',
  potential: 'B',
  expectations:
    'Desempenhar ainda mais e principalmente evoluir minhas capacidades administrativas com o foco na liderança de equipe. Continuar a trabalhar minha capacidade comunicativa entre equipe e gerente para melhorar ainda mais!',
  evaluations: [
    {
      id: '3yYoYE2H0FGVlY3lOSSI',
      title:
        'Imagem para publicação no Facebook sobre a Independência do Brasil',
      date: new Date(2022, 5, 10),
      ponctuation: 4,
      comment:
        'Sit amet consectetur adipiscing elit duis tristique. Purus sit amet luctus venenatis lectus magna. Commodo ullamcorper a lacus vestibulum sed arcu non. Diam in arcu cursus euismod quis viverra.',
    },
    {
      id: '3yYoYE2H0FGVlY3lOSSI',
      title:
        'Imagem para publicação no Facebook sobre a Independência do Brasil',
      date: new Date(2022, 5, 10),
      ponctuation: 4,
      comment:
        'Sit amet consectetur adipiscing elit duis tristique. Purus sit amet luctus venenatis lectus magna. Commodo ullamcorper a lacus vestibulum sed arcu non. Diam in arcu cursus euismod quis viverra.',
    },
  ],
  bias_report: [
    {
      employee: {
        id: 'Q8mOYOy2evSPPYL9GV7Ar9MRSN52',
        name: 'Guilherme Borba',
        avatar_url: 'https://github.com/diego3g.png',
        role: 'Marketing',
        role_insensitive: 'marketing',
      },
      bias: -1,
    },
    {
      employee: {
        id: 'ZtrLbGWicKaZuWD3QdtP',
        name: 'Carol Medeiros',
        avatar_url: 'https://github.com/rafaballerini.png',
        role: 'Desenvolvedora',
        role_insensitive: 'dev',
      },
      bias: 4,
    },
    {
      employee: {
        id: 'cs4mgr4s0HBRZfGuVpDG',
        name: 'Vinicíus Amâncio',
        avatar_url: 'https://github.com/luizbatanero.png',
        role: 'Designer',
        role_insensitive: 'design',
      },
      bias: 3,
    },
  ],
}

export function History() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [data, setData] = useState<User[]>([])
  const [searchListData, setSearchListData] = useState<User[]>([])
  const [search, setSearch] = useState('')

  const { user } = useAuth()

  const colors = useTheme()

  const employeesLocalStorageKey = '@kraftheinz:employees'

  function handleOpenHistoryModal() {
    setIsModalOpen(true)
  }

  function handleCLoseHistoryModal() {
    setIsModalOpen(false)
  }

  useEffect(() => {
    const employeesQuery = query(
      collection(database, 'users'),
      where('manager_id', '==', user!.id),
    )

    const unsubscribe = onSnapshot(employeesQuery, (querySnapshot) => {
      const employees: User[] = []

      querySnapshot.forEach((doc) => {
        employees.push({
          id: doc.id,
          ...doc.data(),
        } as User)
      })

      const employeesLocalData = localStorage.getItem(employeesLocalStorageKey)
      const formattedLocalData =
        employeesLocalData && JSON.parse(employeesLocalData)

      setData(employees || formattedLocalData)
      localStorage.setItem(employeesLocalStorageKey, JSON.stringify(employees))
    })

    return () => {
      unsubscribe()
    }
  }, [user])

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

            <S.SearchBarContainer>
              <SearchBar
                placeholder="Pesquisar"
                onChange={(event) => setSearch(event.target.value)}
              />
            </S.SearchBarContainer>
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

      <Modal isOpen={isModalOpen} onCloseModal={handleCLoseHistoryModal}>
        <EmployeeHistoryModal
          data={historyTest}
          onCloseModal={handleCLoseHistoryModal}
        />
      </Modal>
    </>
  )
}
