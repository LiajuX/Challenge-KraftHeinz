import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { AuthContextProvider } from './contexts/AuthContext'

import { Routes } from './routes'

import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AuthContextProvider>

      <GlobalStyle />
    </ThemeProvider>
  )
}
