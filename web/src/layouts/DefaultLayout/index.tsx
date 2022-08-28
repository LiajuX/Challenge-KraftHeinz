import { Outlet } from 'react-router-dom'

import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'

import * as S from './styles'

export function DefaultLayout() {
  return (
    <S.DefaultLayoutContainer>
      <Sidebar />

      <main>
        <Header />

        <Outlet />

        <Footer />
      </main>
    </S.DefaultLayoutContainer>
  )
}
