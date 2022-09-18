import { Outlet } from 'react-router-dom'
import { CircleNotch } from 'phosphor-react'

import { useAuth } from '../../hooks/useAuth'

import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'

import * as S from './styles'

export function DefaultLayout() {
  const { user } = useAuth()

  return (
    <S.DefaultLayoutContainer>
      <Sidebar />

      {user ? (
        <main>
          <Header />

          <Outlet />

          <Footer />
        </main>
      ) : (
        <S.EmptyLayoutContainer>
          <CircleNotch size={80} />
        </S.EmptyLayoutContainer>
      )}
    </S.DefaultLayoutContainer>
  )
}
