import { useRef, useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'

import { database } from '../../services/firebase'

import { useAuth } from '../../hooks/useAuth'

import { BehaviorRadarChart } from '../../components/BehaviorRadarChart'
import { Textarea } from '../../components/Form/Textarea'
import { Button } from '../../components/Button'
import { PerformanceCard } from '../../components/PerformanceCard'
import { RatingStars } from './components/RatingStars'

import * as S from './styles'

export function Dashboard() {
  const userExpectationsInputRef = useRef(null)

  const { user } = useAuth()

  const [userExpectations, setUserExpectations] = useState(user?.expectations)
  const [isEditingUserExpectations, setIsEditingUserExpectations] =
    useState(false)

  function handleUpdateUserExpectations() {
    setIsEditingUserExpectations(true)
  }

  async function handleConfirmUserExpectationsUpdate() {
    const userRef = doc(database, 'users', user!.id)

    await updateDoc(userRef, {
      expectations: userExpectations,
    })

    setIsEditingUserExpectations(false)
  }

  return (
    <S.DashboardContainer>
      <h1>Sobre você...</h1>

      <S.ContentWrapper>
        <section>
          <h3>Seu potencial atual</h3>

          <PerformanceCard potencialValue={user!.potential} />
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
                  <RatingStars value={user!.ponctuation} />
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
