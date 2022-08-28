import { useState } from 'react'

import { Slider } from '../../../Form/Slider'
import { Multiselect } from '../../../Multiselect'
import { Button } from '../../../Button'

import * as S from './styles'

interface StaffContentProps {
  onCloseModal: () => void
}

export function StaffContent({ onCloseModal }: StaffContentProps) {
  const [managerEvaluation, setManagerEvaluation] = useState(2)
  const [managerEvaluationComment, setManagerEvaluationComment] = useState('')
  const [workstationEvaluation, setWorkstationEvaluation] = useState(2)
  const [workstationEvaluationComment, setWorkstationEvaluationComment] =
    useState('')

  function handleCompleteTask() {
    console.log({
      managerEvaluation: managerEvaluation + 1,
      managerEvaluationComment,
      workstationEvaluation: workstationEvaluation + 1,
      workstationEvaluationComment,
    })

    onCloseModal()
  }

  return (
    <S.StaffContentContainer>
      <strong>Feedback</strong>
      <h3>Avalie a sua satisfação em relação a execução da tarefa</h3>

      <span>Avalie o seu gerente</span>

      <S.SliderContainer>
        <Slider
          currentValue={managerEvaluation}
          setCurrentValue={setManagerEvaluation}
        />
      </S.SliderContainer>

      <span>
        Selecione as opções que melhor descrevem o comportamento do gerente:
      </span>

      <Multiselect category="behavior" />

      <div>
        <label htmlFor="manager-comment">Se quiser, deixe um comentário</label>

        <textarea
          id="manager-comment"
          value={managerEvaluationComment}
          onChange={(e) => setManagerEvaluationComment(e.target.value)}
          placeholder="Digite seu comentário aqui"
        />
      </div>

      <span>Avalie a estação de trabalho utilizada</span>

      <S.SliderContainer>
        <Slider
          currentValue={workstationEvaluation}
          setCurrentValue={setWorkstationEvaluation}
        />
      </S.SliderContainer>

      <div>
        <label htmlFor="workstation-comment">
          Se quiser, deixe um comentário
        </label>

        <textarea
          id="workstation-comment"
          value={workstationEvaluationComment}
          onChange={(e) => setWorkstationEvaluationComment(e.target.value)}
          placeholder="Digite seu comentário aqui"
        />
      </div>

      <S.ButtonContainer>
        <Button
          title="Concluir"
          buttonStyle="secondary"
          onClick={handleCompleteTask}
        />
      </S.ButtonContainer>
    </S.StaffContentContainer>
  )
}
