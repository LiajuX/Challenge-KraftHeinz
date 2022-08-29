import { useRef, useState } from 'react'

import { BehaviorRadarChart } from '../../components/BehaviorRadarChart'
import { Button } from '../../components/Button'
import { PerformanceCard } from '../../components/PerformanceCard'
import { RatingStars } from './components/RatingStars'

import * as S from './styles'

const expectations =
  'Desempenhar ainda mais e principalmente evoluir minhas capacidades administrativas com o foco na liderança de equipe. Continuar a trabalhar minha capacidade comunicativa entre equipe e gerente para melhorar ainda mais!'

export function Dashboard() {
  const userExpectationsInputRef = useRef(null)

  const [userExpectations, setUserExpectations] = useState(expectations)
  const [isEditingUserExpectations, setIsEditingUserExpectations] =
    useState(false)

  function handleUpdateUserExpectations() {
    setIsEditingUserExpectations(true)
  }

  function handleConfirmUserExpectationsUpdate() {
    setIsEditingUserExpectations(false)
  }

  return (
    <S.DashboardContainer>
      <h1>Sobre você...</h1>

      <S.ContentWrapper>
        <section>
          <h3>Seu potencial atual</h3>

          <PerformanceCard potencialValue="B" />
        </section>

        <section>
          <h3>Expectativas para os próximos meses</h3>

          <S.Card>
            <S.ExpectationsCardContainer>
              <S.Quote isFocused={isEditingUserExpectations}>
                <span>“</span>

                <textarea
                  ref={userExpectationsInputRef}
                  value={userExpectations}
                  onChange={(e) => setUserExpectations(e.target.value)}
                  disabled={!isEditingUserExpectations}
                  maxLength={220}
                />

                <span>“</span>
              </S.Quote>

              {!isEditingUserExpectations && (
                <Button
                  title="Atualizar"
                  buttonStyle="secondary"
                  onClick={handleUpdateUserExpectations}
                />
              )}

              {isEditingUserExpectations && (
                <Button
                  title="Confirmar"
                  buttonStyle="secondary"
                  onClick={handleConfirmUserExpectationsUpdate}
                />
              )}
            </S.ExpectationsCardContainer>
          </S.Card>
        </section>

        <section>
          <h3>O que dizem de você</h3>

          <BehaviorRadarChart />
        </section>

        <section>
          <h3>Sua pontuação</h3>

          <S.Card>
            <S.PonctuationCardContainer>
              <S.PonctuationMessageContainer>
                <strong>Pontuação geral</strong>

                <S.RatingStarsContainer>
                  <RatingStars value={4.5} />
                </S.RatingStarsContainer>

                <p>
                  De acordo com as avaliações recebidas, você vai muito bem!
                </p>

                <p>
                  Continue a utilizar das boas práticas e melhorar os aspectos
                  que precisam de melhoria!
                </p>

                <p>
                  Analise o gráfico radar a esquerda e identifique os pontos que
                  ainda possuem espaço para melhoria e logo logo poderá receber
                  uma proposta! ;)
                </p>
              </S.PonctuationMessageContainer>
            </S.PonctuationCardContainer>
          </S.Card>
        </section>
      </S.ContentWrapper>
    </S.DashboardContainer>
  )
}
