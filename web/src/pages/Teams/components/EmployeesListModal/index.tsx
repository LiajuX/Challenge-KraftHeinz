import { useEffect, useState } from 'react'

import { SearchBar } from '../../../../components/SearchBar'

import * as S from './styles'

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

interface EmployeesListModalProps {
  onCloseModal: () => void
  selectedEmployee: Employee
  setSelectedEmployee: (employee: Employee) => void
}

const employees: Employee[] = [
  {
    id: '1234789',
    name: 'Diego Galvão',
    username: 'diego3g',
    avatar_url: 'https://avatars.githubusercontent.com/u/4669899?v=4',
    role: 'it',
    role_title: 'TI',
    potential: 'A',
    task_amount: 26,
    last_evaluation: new Date(2022, 6, 18),
  },
  {
    id: '1239',
    name: 'Carol Medeiros',
    username: 'carolmedeiros',
    avatar_url: 'https://github.com/rafaballerini.png',
    role: 'dev',
    role_title: 'Desenvolvedora',
    potential: 'A',
    task_amount: 32,
    last_evaluation: new Date(2022, 6, 20),
  },
  {
    id: '12389',
    name: 'Vinicius Amâncio',
    username: 'viniciusamancio',
    avatar_url: 'https://github.com/luizbatanero.png',
    role: 'design',
    role_title: 'Designer',
    potential: 'C',
    task_amount: 19,
    last_evaluation: new Date(2022, 7, 24),
  },
]

export function EmployeesListModal({
  selectedEmployee,
  setSelectedEmployee,
  onCloseModal,
}: EmployeesListModalProps) {
  const [data, setData] = useState<Employee[]>(employees)
  const [searchListData, setSearchListData] = useState<Employee[]>(employees)
  const [search, setSearch] = useState('')

  function handleSelectEmployee(employee: Employee) {
    setSelectedEmployee(employee)

    onCloseModal()
  }

  useEffect(() => {
    setSearchListData(data.filter((employee) => employee.name.includes(search)))
  }, [data, search])

  return (
    <S.EmployeesListContainer>
      <strong>Adicionar membro</strong>

      <h3>Selecione um membro para adicionar</h3>

      <SearchBar
        placeholder="Pesquisar"
        onChange={(event) => setSearch(event.target.value)}
      />

      <S.TeamMembersContainer>
        {searchListData.map((employee) => (
          <S.TeamMemberButton
            key={employee.id}
            onClick={() => handleSelectEmployee(employee)}
          >
            <S.UserInfo>
              <img src={employee.avatar_url} alt={employee.name} />

              <strong>{employee.name}</strong>
            </S.UserInfo>

            <S.Role role={employee.role}>
              <span>{employee.role_title}</span>
            </S.Role>
          </S.TeamMemberButton>
        ))}
      </S.TeamMembersContainer>
    </S.EmployeesListContainer>
  )
}
