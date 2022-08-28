import { Route, Routes } from 'react-router-dom'

import { DefaultLayout } from './layouts/DefaultLayout'

import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { Landing } from './pages/Landing'
import { History } from './pages/History'
import { SignIn } from './pages/SignIn'
import { Teams } from './pages/Teams'

export function Router() {
  return (
    <Routes>
      <Route path="/landing" element={<Landing />} />
      <Route path="/signin" element={<SignIn />} />

      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/teams" element={<Teams />} />
      </Route>
    </Routes>
  )
}
