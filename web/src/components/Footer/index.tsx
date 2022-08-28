import { useTheme } from 'styled-components'

import { Logo } from '../Logo'

import infinityLogo from '../../assets/logo-infinity.svg'

import * as S from './styles'

export function Footer() {
  const colors = useTheme()

  return (
    <S.FooterContainer>
      <S.ContentWrapper>
        <ul>
          <li>
            <a href="#">Política de privacidade</a>
          </li>

          <li>
            <a href="#">Ajuda</a>
          </li>

          <li>
            <a href="#">Créditos</a>
          </li>
        </ul>

        <S.Copyright>
          <Logo color={colors.white} size={22} />
          <span>© 2022 The Kraft Heinz Company. All rights reserved.</span>
        </S.Copyright>

        <S.PoweredBy>
          Powered by <img src={infinityLogo} alt="Infinity" />
        </S.PoweredBy>
      </S.ContentWrapper>
    </S.FooterContainer>
  )
}
