import { useState } from 'react'
import { useTheme } from 'styled-components'
import { format, isToday, isThisWeek } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Alarm } from 'phosphor-react'

import { TaskEvaluationModal } from './TaskEvaluationModal'
import { Modal } from '../Modal'

import reportImg from '../../assets/report.svg'
import cameraImg from '../../assets/camera.svg'
import videoImg from '../../assets/video.svg'

import * as S from './styles'

export interface TaskType {
  id: string
  title: string
  description: string
  subtasks?: []
  due_date: Date
  files?: []
  finished_date?: Date
  icon: 'report' | 'camera' | 'video'
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

  const colors = useTheme()

  const isManager = false

  const dueDateColor = isManager
    ? colors['grey-300']
    : isToday(data.due_date)
    ? colors['red-500']
    : isThisWeek(data.due_date) && !isToday(data.due_date)
    ? colors['orange-500']
    : colors['grey-300']

  const truncateDescription =
    data.description.split(' ').length <= 21
      ? data.description
      : data.description.split(' ').slice(0, 21).join(' ') + '...'

  function handleOpenEvaluationModal() {
    setIsModalOpen(true)
  }

  function handleCLoseEvaluationModal() {
    setIsModalOpen(false)
  }

  return (
    <>
      <S.TaskContainer onClick={handleOpenEvaluationModal}>
        <S.IconContainer iconStyle={data.icon}>
          <img src={icon[data.icon]} alt="Ícone da tarefa" />
        </S.IconContainer>

        <S.TaskDetails>
          <strong>{data.title}</strong>

          <p>{truncateDescription}</p>
        </S.TaskDetails>

        <S.DueDate color={dueDateColor}>
          <Alarm weight="bold" size={20} />

          <time>{format(data.due_date, 'dd/MM/yyyy', { locale: ptBR })}</time>
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
