import { BehaviorRadarChart } from '../../components/BehaviorRadarChart'
import { Button } from '../../components/Button'
import { PerformanceCard } from '../../components/PerformanceCard'

import * as S from './styles'

const userExpectations =
  'Desempenhar ainda mais e principalmente evoluir minhas capacidades administrativas com o foco na liderança de equipe. Continuar a trabalhar minha capacidade comunicativa entre equipe e gerente para melhorar ainda mais!'

export function Dashboard() {
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
              <p>
                <span>“</span>
                <div>{userExpectations}</div>
                <span>“</span>
              </p>

              <Button title="Atualizar" buttonStyle="secondary" />
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
            <strong>Pontuação geral</strong>

            <p>De acordo com as avaliações recebidas, você vai muito bem!</p>

            <p>
              Continue a utilizar das boas práticas e melhorar os aspectos que
              precisam de melhoria!
            </p>

            <p>
              Analise o gráfico radar a esquerda e identifique os pontos que
              ainda possuem espaço para melhoria e logo logo poderá receber uma
              proposta! ;)
            </p>
          </S.Card>
        </section>
      </S.ContentWrapper>
    </S.DashboardContainer>
  )
}
