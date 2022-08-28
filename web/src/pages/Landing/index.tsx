import { Logo } from '../../components/Logo'
import { ActiveLink } from '../../components/ActiveLink'
import { Footer } from '../../components/Footer'

import BackgroundImg from '../../assets/landing-background.png'

import * as S from './styles'

export function Landing() {
  return (
    <>
      <S.LandingContainer>
        <S.Header>
          <Logo />
        </S.Header>
        <main>
          <section>
            <h1>
              Plataforma <br /> smart para postagem de <br /> tarefas.
            </h1>

            <ActiveLink title="Entrar" linkStyle="primary" to="/signin" />
          </section>

          <img
            src={BackgroundImg}
            alt="Ilustração de pessoas montando um quebra-cabeça em grupo"
          />
        </main>
      </S.LandingContainer>

      <Footer />
    </>
  )
}
