import { useEffect, useState } from 'react'
import { useTheme } from 'styled-components'
import { collection, onSnapshot, query, where } from 'firebase/firestore'

import { useAuth } from '../../hooks/useAuth'

import { database } from '../../services/firebase'
import { User } from '../../contexts/AuthContext'

import { Bias } from '../../components/Bias'
import { SatisfactionEmoji } from '../../components/SatisfactionEmoji'
import { TeamMemberCard } from '../../components/TeamMemberCard'
import { Modal } from '../../components/Modal'
import { SearchBar } from '../../components/SearchBar'
import { EmployeeHistoryModal } from './components/EmployeeHistoryModal'

import * as S from './styles'

export function History() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [data, setData] = useState<User[]>([])
  const [searchListData, setSearchListData] = useState<User[]>([])
  const [selectedEmployee, setSelectedEmployee] = useState({} as User)
  const [search, setSearch] = useState('')

  const { user } = useAuth()

  const colors = useTheme()

  const employeesLocalStorageKey = '@kraftheinz:employees'

  function handleOpenHistoryModal(employee: User) {
    setIsModalOpen(true)
    setSelectedEmployee(employee)
  }

  function handleCloseHistoryModal() {
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
              onClick={() => handleOpenHistoryModal(employee)}
            >
              <TeamMemberCard data={employee}>
                <span>
                  {employee.task_amount} entregas desde a última avaliação
                </span>

                <S.EvaluationDataContainer>
                  {employee.manager_bias && (
                    <div>
                      <span>Seu viés com esse colaborador:</span>
                      <Bias value={employee.manager_bias} />
                    </div>
                  )}

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
                </S.EvaluationDataContainer>
              </TeamMemberCard>
            </S.TeamMemberButton>
          ))}
        </S.ContentWrapper>

        <Modal isOpen={isModalOpen} onCloseModal={handleCloseHistoryModal}>
          <EmployeeHistoryModal
            userData={selectedEmployee}
            onCloseModal={handleCloseHistoryModal}
          />
        </Modal>
      </S.HistoryContainer>
    </>
  )
}
