import { useState } from 'react'

import { User } from '../../../../contexts/AuthContext'

import { Button } from '../../../../components/Button'
import { Slider } from '../../../../components/Form/Slider'
import { Textarea } from '../../../../components/Form/Textarea'
import { Modal } from '../../../../components/Modal'
import { Multiselect } from '../../../../components/Multiselect'

import * as S from './styles'

interface TeamMemberManagerEvaluationModalProps {
  isOpen: boolean
  onCloseModal: () => void
  member: User
}

export function TeamMemberManagerEvaluationModal({
  isOpen,
  onCloseModal,
  member,
}: TeamMemberManagerEvaluationModalProps) {
  const [adaptabilityEvaluation, setAdaptabilityEvaluation] = useState(2)
  const [leadershipEvaluation, setLeadershipEvaluation] = useState(2)
  const [progressEvaluation, setProgressEvaluation] = useState(2)
  const [communicationEvaluation, setCommunicationEvaluation] = useState(2)
  const [proactivityEvaluation, setProactivityEvaluation] = useState(2)
  const [comment, setComment] = useState('')

  function handleCompleteTeamMemberEvaluation() {
    console.log({
      adaptabilityEvaluation: adaptabilityEvaluation + 1,
      leadershipEvaluation: leadershipEvaluation + 1,
      progressEvaluation: progressEvaluation + 1,
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

        <span>Capacidade do colaborador desempenhar bem em um cargo acima</span>

        <S.SliderContainer>
          <Slider
            currentValue={adaptabilityEvaluation}
            setCurrentValue={setAdaptabilityEvaluation}
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
          Satisfação com o desenvolvimento pessoal (o colaborador se apresenta
          cada vez mais capacitado)
        </span>

        <S.SliderContainer>
          <Slider
            currentValue={progressEvaluation}
            setCurrentValue={setProgressEvaluation}
          />
        </S.SliderContainer>

        <span>Satisfação de comunicação com o gerente</span>

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
