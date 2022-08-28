import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Alarm, Plus } from 'phosphor-react'

import { StaffContent } from './StaffContent'
import { ManagerContent } from './ManagerContent'

import * as S from './styles'

export interface TaskDetailsProps {
  title: string
  description: string
  due_date: Date
  files?: []
}

interface TaskDetailsModalProps {
  data: TaskDetailsProps
  onCloseModal: () => void
}

export function TaskEvaluationModal({
  data,
  onCloseModal,
}: TaskDetailsModalProps) {
  const isManager = true

  return (
    <S.TaskDetailsContainer>
      <header>
        <strong>Entrega</strong>

        <S.DueDate>
          <Alarm weight="bold" size={20} />

          <time>{format(data.due_date, 'dd/MM/yyyy', { locale: ptBR })}</time>
        </S.DueDate>
      </header>

      <h3>{data.title}</h3>

      <S.TaskInfo>
        <span>Descrição</span>

        <p>{data.description}</p>

        <span>Arquivos</span>
      </S.TaskInfo>

      <S.ButtonsContainer>
        <S.AddFileButton>
          <Plus size={18} />
        </S.AddFileButton>
      </S.ButtonsContainer>

      <hr />

      {isManager ? (
        <ManagerContent onCloseModal={onCloseModal} />
      ) : (
        <StaffContent onCloseModal={onCloseModal} />
      )}
    </S.TaskDetailsContainer>
  )
}
