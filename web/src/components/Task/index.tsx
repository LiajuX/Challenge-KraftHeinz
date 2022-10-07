import { useState } from 'react'
import { useTheme } from 'styled-components'
import { format, isToday, isThisWeek, isBefore } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Alarm } from 'phosphor-react'

import { useAuth } from '../../hooks/useAuth'

import { TaskEvaluationModal } from './TaskEvaluationModal'
import { FileType } from '../File'
import { Modal } from '../Modal'

import reportImg from '../../assets/report.svg'
import cameraImg from '../../assets/camera.svg'
import videoImg from '../../assets/video.svg'

import * as S from './styles'
import { truncateText } from '../../utils/truncateText'

export interface TaskType {
  id: string
  title: string
  description: string
  subtasks?: TaskType[]
  due_date: Date | null
  is_extra?: boolean
  files?: FileType[]
  finished_date?: Date
  is_subtask: boolean
  icon?: 'report' | 'camera' | 'video'
  assigned_to: string
}

interface Props {
  data: TaskType
}

const icon = {
  report: reportImg,
  camera: cameraImg,
  video: videoImg,
}

export function Task({ data }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { user } = useAuth()

  const colors = useTheme()

  const defaultIcon = 'report'

  const dueDateColor = user?.is_manager
    ? colors['grey-300']
    : (data.due_date && isToday(data.due_date)) ||
      (data.due_date && isBefore(data.due_date, new Date()))
    ? colors['red-500']
    : data.due_date &&
      isThisWeek(data.due_date) &&
      data.due_date &&
      !isToday(data.due_date)
    ? colors['orange-500']
    : colors['grey-300']

  const truncateDescription = truncateText(data.description, 21)

  function handleOpenEvaluationModal() {
    setIsModalOpen(true)
  }

  function handleCLoseEvaluationModal() {
    setIsModalOpen(false)
  }

  return (
    <>
      <S.TaskContainer onClick={handleOpenEvaluationModal}>
        <S.IconContainer iconStyle={data.icon || defaultIcon}>
          <img src={icon[data.icon || defaultIcon]} alt="Ícone da tarefa" />
        </S.IconContainer>

        <S.TaskDetails>
          <strong>{data.title}</strong>

          <p>{truncateDescription}</p>
        </S.TaskDetails>

        <S.DueDate color={dueDateColor}>
          <Alarm weight="bold" size={20} />

          {data.due_date && (
            <time>{format(data.due_date, 'dd/MM/yyyy', { locale: ptBR })}</time>
          )}
        </S.DueDate>
      </S.TaskContainer>

      <Modal isOpen={isModalOpen} onCloseModal={handleCLoseEvaluationModal}>
        <TaskEvaluationModal
          onCloseModal={handleCLoseEvaluationModal}
          data={data}
        />
      </Modal>
    </>
  )
}
