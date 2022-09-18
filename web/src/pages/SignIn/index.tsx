import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'

import { ActiveLink } from '../../components/ActiveLink'
import { Button } from '../../components/Button'
import { Footer } from '../../components/Footer'
import { Input } from '../../components/Form/Input'
import { Logo } from '../../components/Logo'

import girlImg from '../../assets/girl-running.png'

import * as S from './styles'

export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { user, signIn, isSigningIn } = useAuth()

  const navigate = useNavigate()

  async function handleSignIn(event: FormEvent) {
    event.preventDefault()

    signIn(email, password)

    navigate('/home')
  }

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
              <label htmlFor="email">E-mail</label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Insira seu e-mail aqui"
              />
            </div>

            <div className="input-container">
              <label htmlFor="password">Senha</label>
              <Input
                id="password"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Insira sua senha aqui"
              />
            </div>

            <div className="buttons-container">
              <Button
                buttonStyle="secondary"
                title="entrar"
                onClick={handleSignIn}
                isLoading={isSigningIn}
              />

              <Button buttonStyle="primary" title="esqueci minha senha" />

              <ActiveLink type="tertiary" title="voltar" to="/landing" />
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
