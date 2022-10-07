import { useState } from 'react'

import { Button } from '../../../Button'
import { Slider } from '../../../Form/Slider'
import { Attribute, Multiselect } from '../../../Multiselect'

import * as S from './styles'

interface ManagerContentProps {
  onCloseModal: () => void
}

export function ManagerContent({ onCloseModal }: ManagerContentProps) {
  const [performanceEvaluation, setPerformanceEvaluation] = useState(2)
  const [whimEvaluation, setWhimEvaluation] = useState(2)
  const [comment, setComment] = useState('')
  const [selectedAttributes, setSelectedAttributes] = useState<Attribute[]>([])

  function handleCompleteTask() {
    console.log({
      performanceEvaluation: performanceEvaluation + 1,
      whimEvaluation: whimEvaluation + 1,
      comment,
    })

    onCloseModal()
  }

  function handleAttributeSelection(selectedAttribute: Attribute) {
    const isThisAttributeAlreadySelected = selectedAttributes.find(
      (attribute) => attribute.title === selectedAttribute.title,
    )

    if (isThisAttributeAlreadySelected) {
      const filteredAtributes = selectedAttributes.filter(
        (attribute) => attribute.title !== selectedAttribute.title,
      )

      setSelectedAttributes(filteredAtributes)
    }

    if (!isThisAttributeAlreadySelected) {
      setSelectedAttributes((oldState) => [...oldState, selectedAttribute])
    }
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

      <span>Atenção aos detalhes e dedicação</span>

      <S.SliderContainer>
        <Slider
          currentValue={whimEvaluation}
          setCurrentValue={setWhimEvaluation}
        />
      </S.SliderContainer>

      <section>
        <span>
          Selecione as opções que melhor descreve o comportamento do
          colaborador:
        </span>

        <Multiselect
          category="behavior"
          selectedAttributes={selectedAttributes}
          handleAttributeSelection={handleAttributeSelection}
        />
      </section>

      <section>
        <label htmlFor="comment">
          Deixe um comentário para se lembrar das observações realizadas ao
          efetuar a avaliação de desempenho
        </label>

        <S.TextareaComponent
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
