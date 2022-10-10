import { useCallback, useEffect, useState } from 'react'
import { useTheme } from 'styled-components'
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import ptBR from 'date-fns/locale/pt-BR'
import { format } from 'date-fns'

import { useAuth } from '../../../../hooks/useAuth'
import { User } from '../../../../contexts/AuthContext'

import { database } from '../../../../services/firebase'

import { TeamMember } from '../../../Teams'
import { TeamMemberEvaluation } from '../../../Teams/components/TeamMemberEvaluationModal'
import { EvaluatedTask } from '../../../../components/Task/TaskEvaluationModal/ManagerContent'
import { SatisfactionEmoji } from '../../../../components/SatisfactionEmoji'
import { MultiaxisLineChart } from '../../../../components/MultiaxisLineChart'
import { TeamMemberCard } from '../../../../components/TeamMemberCard'
import { Bias } from '../../../../components/Bias'

import * as S from './styles'
import { Loading } from '../../../../components/Loading'

interface BiasReport {
  employee: {
    id: string
    avatar_url: string
    name: string
    role: string
    role_insensitive: string
  }
  bias: number
}

interface Evaluation {
  id: string
  title: string
  date: Date
  ponctuation: number
  comment: string
}

interface TaskDetailsModalProps {
  userData: User
  onCloseModal: () => void
}

const charts = [
  {
    title: 'Evolução da nota final',
    labels: ['09/02', '09/04', '09/06', '09/08', '09/10'],
    ponctuationData: [2, 3, 3, 4, 5],
    potentialDataValues: [1, 2, 2, 3, 3],
  },
  {
    title: 'Evolução do potencial de desempenhar um cargo acima',
    labels: ['09/02', '09/04', '09/06', '09/08', '09/10'],
    ponctuationData: [2, 4, 3, 4, 4],
    potentialDataValues: [1, 2, 2, 2, 3],
  },
  {
    title: 'Evolução da nota de satisfação dos princípios de liderança',
    labels: ['09/02', '09/04', '09/06', '09/08', '09/10'],
    ponctuationData: [2, 4, 5, 4, 5],
    potentialDataValues: [1, 2, 3, 3, 3],
  },
  {
    title: 'Evolução do potencial de desenvolvimento pessoal',
    labels: ['09/02', '09/04', '09/06', '09/08', '09/10'],
    ponctuationData: [3, 3, 4, 4, 5],
    potentialDataValues: [2, 2, 2, 3, 3],
  },
  {
    title: 'Evolução da capacidade de comunicação',
    labels: ['09/02', '09/04', '09/06', '09/08', '09/10'],
    ponctuationData: [2, 4, 4, 4, 5],
    potentialDataValues: [1, 2, 3, 3, 3],
  },
  {
    title: 'Evolução da nota de proatividade',
    labels: ['09/02', '09/04', '09/06', '09/08', '09/10'],
    ponctuationData: [3, 3, 3, 4, 4],
    potentialDataValues: [2, 2, 3, 2, 3],
  },
  {
    title: 'Evolução do desempenho nas tarefas',
    labels: ['09/02', '09/04', '09/06', '09/08', '09/10'],
    ponctuationData: [2, 4, 3, 4, 5],
    potentialDataValues: [1, 2, 2, 3, 3],
  },
  {
    title: 'Evolução do "capricho" nas tarefas',
    labels: ['09/02', '09/04', '09/06', '09/08', '09/10'],
    ponctuationData: [2, 3, 2, 4, 4],
    potentialDataValues: [1, 1, 2, 2, 3],
  },
]

export function EmployeeHistoryModal({ userData }: TaskDetailsModalProps) {
  const [userTasks, setUserTasks] = useState<EvaluatedTask[] | undefined>([])
  const [biasReportData, setBiasReportData] = useState<TeamMember[]>([])
  const [biasReportDataFormatted, setBiasReportDataFormatted] = useState<
    TeamMember[]
  >([])
  const [isBiasReportOpen, setIsBiasReportOpen] = useState(false)

  const { user } = useAuth()

  const colors = useTheme()

  const potentialColor =
    userData.potential === 'A'
      ? colors['blue-800']
      : userData.potential === 'B'
      ? colors['blue-550']
      : colors['blue-200']

  function getPonctuationColor(ponctuation: number) {
    switch (ponctuation) {
      case 1:
        return colors['red-700']
      case 2:
        return colors['red-500']
      case 3:
        return colors['orange-500']
      case 4:
        return colors['green-500']
      case 5:
        return colors['green-700']
      default:
        return colors['grey-300']
    }
  }

  useEffect(() => {
    const userRef = doc(database, 'users', userData.id)

    const unsubscribe = async () => {
      const userDocSnap = await getDoc(userRef)

      const evaluatedTasks: EvaluatedTask[] = []

      if (userDocSnap.exists()) {
        userDocSnap.data().evaluated_tasks?.forEach((task: EvaluatedTask) => {
          if (task.is_evaluated) {
            evaluatedTasks.push({
              ...task,
              finished_date: task.finished_date.toDate(),
            })
          }
        })

        setUserTasks(evaluatedTasks)
      }
    }

    return () => {
      unsubscribe()
    }
  }, [userData])

  const getUserTeamEvaluations = useCallback(
    async (userId: string) => {
      const userRef = doc(database, 'users', userId)

      const userDocSnap = await getDoc(userRef)

      if (userDocSnap.exists()) {
        const isThereAnAvaliationOfTheCurrentUser = userDocSnap
          .data()
          ?.team_evaluations?.find(
            (teamEvaluation: TeamMemberEvaluation) =>
              teamEvaluation.evaluator === userData.id,
          )

        return isThereAnAvaliationOfTheCurrentUser
      }
    },
    [userData],
  )

  const handleGetBiasReport = useCallback(() => {
    setIsBiasReportOpen(true)

    const employeesQuery = query(
      collection(database, 'teams'),
      where('managed_by', '==', user!.id),
    )

    const unsubscribe = onSnapshot(employeesQuery, async (querySnapshot) => {
      const teamMembers: TeamMember[] = []

      querySnapshot.forEach((doc) => {
        const isCurrentUserInThisTeam = !!doc
          .data()
          .members.find((member: TeamMember) => member.id === userData.id)

        if (isCurrentUserInThisTeam) {
          doc.data().members.forEach(async (member: TeamMember) => {
            if (
              member.id !== userData.id &&
              member.id !== userData.manager_id
            ) {
              const evaluationsOfTheCurrentUserToThisMember =
                await getUserTeamEvaluations(member.id)

              teamMembers.push({
                id: member.id,
                name: member.name,
                avatar_url: member.avatar_url,
                role: member.role,
                role_insensitive: member.role_insensitive,
                bias: evaluationsOfTheCurrentUserToThisMember
                  ? evaluationsOfTheCurrentUserToThisMember.bias
                  : null,
              })
            }
          })
        }
      })

      setBiasReportData(teamMembers)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    const setTeamMembers = new Set()

    const biasReportWithoutDuplicateData = biasReportData.filter((report) => {
      const duplicate = setTeamMembers.has(report.id)

      setTeamMembers.add(report.id)

      return !duplicate
    })

    setBiasReportDataFormatted(biasReportWithoutDuplicateData)
  }, [biasReportData])

  return (
    <S.EmployeeHistoryContainer>
      <header>
        <strong
          style={{ cursor: isBiasReportOpen ? 'pointer' : 'auto' }}
          onClick={() => setIsBiasReportOpen(false)}
        >
          {userData.name}
        </strong>

        {isBiasReportOpen && (
          <>
            <span> / </span>

            <strong>Relatório de viés</strong>
          </>
        )}
      </header>

      <h3>
        {isBiasReportOpen ? 'Relatório de viés' : 'Histórico de avaliações'}
      </h3>

      {isBiasReportOpen ? (
        <>
          <span>Descrição</span>

          <p>O relatório de viés desse colaborador para os outros.</p>

          <S.BiasContainer>
            {biasReportDataFormatted ? (
              biasReportDataFormatted.map((biasReport) => (
                <S.TeamMemberCardContainer key={biasReport.id}>
                  <TeamMemberCard data={biasReport}>
                    <div />

                    <S.BiasWrapper>
                      {biasReport.bias ? (
                        <>
                          <span>Viés:</span>
                          <Bias value={biasReport.bias} />
                        </>
                      ) : (
                        <span>Sem dados de viés</span>
                      )}
                    </S.BiasWrapper>
                  </TeamMemberCard>
                </S.TeamMemberCardContainer>
              ))
            ) : (
              <Loading size={64} />
            )}
          </S.BiasContainer>
        </>
      ) : (
        <>
          <span>Última avaliação recebida</span>

          <S.PotentialContainer potential={userData.potential}>
            <SatisfactionEmoji color={potentialColor} size={34} type="great" />

            <h3>
              Potencial {userData.potential === 'A' && 'claro'}{' '}
              {userData.potential === 'B' && 'avançando'}{' '}
              {userData.potential === 'C' && 'em desenvolvimento'} (
              {userData.potential})
            </h3>
          </S.PotentialContainer>

          <span>Expectativas para os próximos meses</span>

          <p>&quot;{userData.expectations}&quot;</p>

          <span>Viés</span>

          <p>Acessar o relatório de viés desse colaborador para outros</p>

          <S.Button onClick={handleGetBiasReport}>acessar</S.Button>

          <span>Relatórios</span>

          <S.ChartsContainer>
            {charts.map((chart) => (
              <MultiaxisLineChart
                key={chart.title}
                title={chart.title}
                labels={chart.labels}
                ponctuationData={chart.ponctuationData}
                potentialDataValues={chart.potentialDataValues}
              />
            ))}
          </S.ChartsContainer>

          <span>Timeline</span>

          {userTasks && userTasks.length > 0 && (
            <S.TasksContainer>
              <S.TaskTimeline />

              <S.TasksWrapper>
                {userTasks?.map((task) => (
                  <S.TaskContainer key={task.id}>
                    <S.TaskWrapper>
                      <S.PonctuationData>
                        <S.PonctuationContainer
                          color={getPonctuationColor(task.ponctuation)}
                        >
                          <span>Nota: {task.ponctuation}</span>

                          <time>
                            {format(task.finished_date, 'dd/MM', {
                              locale: ptBR,
                            })}
                          </time>
                        </S.PonctuationContainer>

                        <S.PonctuationBullet
                          color={getPonctuationColor(task.ponctuation)}
                        />
                      </S.PonctuationData>
                    </S.TaskWrapper>

                    <S.TaskWrapper>
                      <S.TitleContainer>
                        {task.is_extra && <p>EXTRA</p>}

                        <h4>{task.title}</h4>
                      </S.TitleContainer>

                      <span>Comentário</span>
                      <p>{task.manager_observations}</p>
                    </S.TaskWrapper>
                  </S.TaskContainer>
                ))}
              </S.TasksWrapper>
            </S.TasksContainer>
          )}

          {!userTasks ||
            (userTasks.length === 0 && (
              <S.EmptyTaskList>
                <strong>Nenhuma tarefa</strong>
                <p>
                  Atribua tarefas a esse colaborador para que elas apareçam aqui
                </p>
              </S.EmptyTaskList>
            ))}
        </>
      )}
    </S.EmployeeHistoryContainer>
  )
}
