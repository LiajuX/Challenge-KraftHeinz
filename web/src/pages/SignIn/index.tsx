import { ActiveLink } from '../../components/ActiveLink'
import { Button } from '../../components/Button'
import { Footer } from '../../components/Footer'
import { Input } from '../../components/Form/Input'
import { Logo } from '../../components/Logo'

import girlImg from '../../assets/girl-running.png'

import * as S from './styles'

export function SignIn() {
  return (
    <S.SignInContainer>
      <S.Header>
        <Logo />
      </S.Header>

      <main>
        <h1>Insira suas credenciais.</h1>

        <S.ContentWrapper>
          <form>
            <div className="input-container">
              <label htmlFor="username">Nome de usuário</label>
              <Input
                id="username"
                type="text"
                placeholder="Insira seu nome de usuário aqui"
              />
            </div>

            <div className="input-container">
              <label htmlFor="password">Senha</label>
              <Input
                id="password"
                type="text"
                placeholder="Insira sua senha aqui"
              />
            </div>

            <div className="buttons-container">
              <ActiveLink linkStyle="secondary" title="Entrar" to="/" />

              <Button buttonStyle="primary" title="esqueci minha senha" />

              <ActiveLink linkStyle="tertiary" title="voltar" to="/landing" />
            </div>
          </form>

          <img
            src={girlImg}
            alt="Ilustração de uma menina correndo com papéis na mão"
          />
        </S.ContentWrapper>
      </main>

      <Footer />
    </S.SignInContainer>
  )
}
