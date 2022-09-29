import { useState } from 'react'

import { User } from '../../../../contexts/AuthContext'

import { Button } from '../../../../components/Button'
import { Slider } from '../../../../components/Form/Slider'
import { Textarea } from '../../../../components/Form/Textarea'
import { Modal } from '../../../../components/Modal'
import { Multiselect } from '../../../../components/Multiselect'

import * as S from './styles'

interface TeamMemberEvaluationModalProps {
  isOpen: boolean
  onCloseModal: () => void
  member: User
}

export function TeamMemberEvaluationModal({
  isOpen,
  onCloseModal,
  member,
}: TeamMemberEvaluationModalProps) {
  const [teamWorkEvaluation, setTeamWorkEvaluation] = useState(2)
  const [leadershipEvaluation, setLeadershipEvaluation] = useState(2)
  const [workBehaviorEvaluation, setWorkBehaviorEvaluation] = useState(2)
  const [communicationEvaluation, setCommunicationEvaluation] = useState(2)
  const [proactivityEvaluation, setProactivityEvaluation] = useState(2)
  const [comment, setComment] = useState('')

  function handleCompleteTeamMemberEvaluation() {
    console.log({
      teamWorkEvaluation: teamWorkEvaluation + 1,
      leadershipEvaluation: leadershipEvaluation + 1,
      workBehaviorEvaluation: workBehaviorEvaluation + 1,
      communicationEvaluation: communicationEvaluation + 1,
      proactivityEvaluation: proactivityEvaluation + 1,
      comment,
    })

    onCloseModal()
  }

  return (
    <Modal isOpen={isOpen} onCloseModal={onCloseModal}>
      <S.TeamMemberEvaluationModalContainer>
        <strong>Avaliação 360</strong>
        <h3>{member.name}</h3>

        <span>Como efetuar essa avaliação</span>

        <p>
          A avaliação 360 é uma forma de avaliar a equipe como um todo. Para
          isso, avalie de 0 a 5 a pessoa selecionada nos seguintes aspectos:
        </p>

        <span>Satisfação do trabalho em equipe</span>

        <S.SliderContainer>
          <Slider
            currentValue={teamWorkEvaluation}
            setCurrentValue={setTeamWorkEvaluation}
          />
        </S.SliderContainer>

        <span>Satisfação dos princípios de liderança</span>

        <S.SliderContainer>
          <Slider
            currentValue={leadershipEvaluation}
            setCurrentValue={setLeadershipEvaluation}
          />
        </S.SliderContainer>

        <span>
          Satisfação com a forma de trabalho (agilidade, efetividade e
          adaptabilidade)
        </span>

        <S.SliderContainer>
          <Slider
            currentValue={workBehaviorEvaluation}
            setCurrentValue={setWorkBehaviorEvaluation}
          />
        </S.SliderContainer>

        <span>Satisfação de comunicação com a equipe</span>

        <S.SliderContainer>
          <Slider
            currentValue={communicationEvaluation}
            setCurrentValue={setCommunicationEvaluation}
          />
        </S.SliderContainer>

        <span>
          Proatividade (busca por mudanças de maneira espontânea, sem precisar
          de estímulos externos)
        </span>

        <S.SliderContainer>
          <Slider
            currentValue={proactivityEvaluation}
            setCurrentValue={setProactivityEvaluation}
          />
        </S.SliderContainer>

        <span>
          Selecione as opções que melhor descreve o comportamento dessa pessoa:
        </span>

        <Multiselect category="behavior" />

        <div>
          <label htmlFor="comment">Se quiser, deixe um comentário </label>

          <Textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Digite seu comentário aqui"
          />
        </div>

        <S.ButtonContainer>
          <Button
            title="Concluir"
            buttonStyle="secondary"
            onClick={handleCompleteTeamMemberEvaluation}
          />
        </S.ButtonContainer>
      </S.TeamMemberEvaluationModalContainer>
    </Modal>
  )
}
