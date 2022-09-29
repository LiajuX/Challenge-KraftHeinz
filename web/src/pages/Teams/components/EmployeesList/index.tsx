import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { IoCheckmarkCircleOutline } from 'react-icons/io5'

import { useAuth } from '../../../../hooks/useAuth'

import { User } from '../../../../contexts/AuthContext'
import { database } from '../../../../services/firebase'

import { SearchBar } from '../../../../components/SearchBar'

import * as S from './styles'

interface EmployeesListModalProps {
  selectedNewMembers: User[]
  unavailableMembers?: User[]
  setSelectedNewMembers: (employees: User[]) => void
}

export function EmployeesList({
  selectedNewMembers,
  unavailableMembers,
  setSelectedNewMembers,
}: EmployeesListModalProps) {
  const [data, setData] = useState<User[]>([])
  const [searchListData, setSearchListData] = useState<User[]>([])
  const [search, setSearch] = useState('')
  const [selectedMembers, setSelectedMembers] = useState<User[]>(
    unavailableMembers || selectedNewMembers,
  )

  const { user } = useAuth()

  const employeesLocalStorageKey = '@kraftheinz:employees'

  function handleSelectEmployee(employee: User) {
    if (selectedMembers.find((member) => member.id === employee.id)) {
      setSelectedMembers(
        selectedMembers.filter((member) => member.id !== employee.id),
      )
    } else {
      setSelectedMembers((oldValue) => [...oldValue, employee])
    }
  }

  useEffect(() => {
    setSelectedNewMembers(selectedMembers)
  }, [selectedMembers, setSelectedNewMembers])

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
      setSearchListData(employees || formattedLocalData)
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
    <S.EmployeesListContainer>
      <SearchBar
        placeholder="Pesquisar"
        onChange={(event) => setSearch(event.target.value)}
      />

      <S.TeamMembersContainer>
        {searchListData.map((employee) => (
          <S.TeamMemberButton
            key={employee.id}
            isActive={
              !!selectedMembers.find((member) => member.id === employee.id)
            }
            onClick={() => handleSelectEmployee(employee)}
          >
            <S.UserInfo>
              <S.ImageContainer>
                {!!selectedMembers.find(
                  (member) => member.id === employee.id,
                ) && <IoCheckmarkCircleOutline size={42} />}

                <img src={employee.avatar_url} alt={employee.name} />
              </S.ImageContainer>

              <strong>{employee.name}</strong>
            </S.UserInfo>

            <S.Role role={employee.role_insensitive}>
              <span>{employee.role}</span>
            </S.Role>
          </S.TeamMemberButton>
        ))}
      </S.TeamMembersContainer>
    </S.EmployeesListContainer>
  )
}
