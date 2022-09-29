import { useState } from 'react'
import { Button } from '../../../Button'
import { Slider } from '../../../Form/Slider'
import { Textarea } from '../../../Form/Textarea'
import { Multiselect } from '../../../Multiselect'

import * as S from './styles'

interface ManagerContentProps {
  onCloseModal: () => void
}

export function ManagerContent({ onCloseModal }: ManagerContentProps) {
  const [performanceEvaluation, setPerformanceEvaluation] = useState(2)
  const [dedicationEvaluation, setDedicationEvaluation] = useState(2)
  const [comment, setComment] = useState('')

  function handleCompleteTask() {
    console.log({
      performanceEvaluation: performanceEvaluation + 1,
      dedicationEvaluation: dedicationEvaluation + 1,
      comment,
    })

    onCloseModal()
  }

  return (
    <S.ManagerContentContainer>
      <strong>Feedback</strong>
      <h3>Avalie o colaborador com base nessa entrega em relacação a:</h3>

      <span>Desempenho na execução da tarefa</span>

      <S.SliderContainer>
        <Slider
          currentValue={performanceEvaluation}
          setCurrentValue={setPerformanceEvaluation}
        />
      </S.SliderContainer>

      <span>Satisfação dos princípios de liderança</span>

      <S.SliderContainer>
        <Slider
          currentValue={dedicationEvaluation}
          setCurrentValue={setDedicationEvaluation}
        />
      </S.SliderContainer>

      <section>
        <span>
          Selecione as opções que melhor descreve o comportamento do
          colaborador:
        </span>

        <Multiselect category="behavior" />
      </section>

      <section>
        <label htmlFor="comment">
          Deixe um comentário para se lembrar das observações realizadas ao
          efetuar a avaliação de desempenho
        </label>

        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Digite seu comentário aqui"
        />
      </section>

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
