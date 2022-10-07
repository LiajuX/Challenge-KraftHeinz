import * as S from './styles'

interface BiasProps {
  value: number
}

export function Bias({ value }: BiasProps) {
  console.log(value)
  return (
    <S.BiasContainer>
      <S.BiasDivider />

      <S.BiasAmount value={value} />
    </S.BiasContainer>
  )
}
