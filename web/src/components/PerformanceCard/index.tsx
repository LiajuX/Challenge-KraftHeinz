import happyFaceImg from '../../assets/happy.svg'
import smileFaceImg from '../../assets/smile.svg'
import unhappyFaceImg from '../../assets/unhappy.svg'

import * as S from './styles'

interface PerformanceCardProps {
  potencialValue: 'A' | 'B' | 'C'
}

const PERFORMANCE_CARD_DATA = {
  A: {
    icon: happyFaceImg,
    heading: 'Seu potencial é claro para o gestor!',
    description:
      'O seu potencial é claro para nós. Você se destacou em suas entregas e se mostrou capaz. Continue assim e logo receberá uma nova proposta!',
  },
  B: {
    icon: smileFaceImg,
    heading: 'Seu potencial está avançando!',
    description:
      'Percebemos que seus potencial está avançando com cada entrega. Continue assim e busque melhorar ainda mais!',
  },
  C: {
    icon: unhappyFaceImg,
    heading: 'Seu potencial ainda está desenvolvendo!',
    description:
      'Foi observado que seu potencial ainda está se desenvolvendo, busque melhorar seus aspectos comportamentais!',
  },
}

export function PerformanceCard({ potencialValue }: PerformanceCardProps) {
  return (
    <S.PerformanceCardContainer>
      <img src={PERFORMANCE_CARD_DATA[potencialValue].icon} alt="" />

      <S.PerformanceCardDetails potencialValue={potencialValue}>
        <strong>{PERFORMANCE_CARD_DATA[potencialValue].heading}</strong>

        <p>{PERFORMANCE_CARD_DATA[potencialValue].description}</p>
      </S.PerformanceCardDetails>
    </S.PerformanceCardContainer>
  )
}
