import { useState } from 'react'
import { Button } from '../../../Button'
import { Slider } from '../../../Form/Slider'
import { Multiselect } from '../../../Multiselect'

import * as S from './styles'

interface ManagerContentProps {
  onCloseModal: () => void
}

export function ManagerContent({ onCloseModal }: ManagerContentProps) {
  const [adaptabilityEvaluation, setAdaptabilityEvaluation] = useState(2)
  const [leadershipEvaluation, setLeadershipEvaluation] = useState(2)
  const [personalDevelopmentEvaluation, setPersonalDevelopmentEvaluation] =
    useState(2)
  const [communicationEvaluation, setCommunicationEvaluation] = useState(2)
  const [proactivityEvaluation, setProactivityEvaluation] = useState(2)
  const [comment, setComment] = useState('')

  function handleCompleteTask() {
    console.log({
      adaptabilityEvaluation: adaptabilityEvaluation + 1,
      leadershipEvaluation: leadershipEvaluation + 1,
      personalDevelopmentEvaluation: personalDevelopmentEvaluation + 1,
      communicationEvaluation: communicationEvaluation + 1,
      proactivityEvaluation: proactivityEvaluation + 1,
      comment,
    })

    onCloseModal()
  }

  return (
    <S.ManagerContentContainer>
      <strong>Feedback</strong>
      <h3>Avalie o colaborador com base nessa entrega em relacação a:</h3>

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

      <span>Satisfação no quesito de desenvolvimento pessoal</span>

      <S.SliderContainer>
        <Slider
          currentValue={personalDevelopmentEvaluation}
          setCurrentValue={setPersonalDevelopmentEvaluation}
        />
      </S.SliderContainer>

      <span>Satisfação de comunicação do colaborador com o gerente</span>

      <S.SliderContainer>
        <Slider
          currentValue={communicationEvaluation}
          setCurrentValue={setCommunicationEvaluation}
        />
      </S.SliderContainer>

      <span>Proatividade</span>

      <S.SliderContainer>
        <Slider
          currentValue={proactivityEvaluation}
          setCurrentValue={setProactivityEvaluation}
        />
      </S.SliderContainer>

      <span>
        Selecione as opções que melhor descreve o comportamento do colaborador:
      </span>

      <Multiselect category="behavior" />

      <div>
        <label htmlFor="comment">
          Deixe um comentário para se lembrar das observações realizadas ao
          efetuar a avaliação de desempenho
        </label>

        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Digite seu comentário aqui"
        />
      </div>

      <S.ButtonContainer>
        <Button
          title="CONCLUIR TAREFA"
          buttonStyle="secondary"
          onClick={handleCompleteTask}
        />
      </S.ButtonContainer>
    </S.ManagerContentContainer>
  )
}
