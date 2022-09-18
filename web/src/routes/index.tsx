import { useEffect } from 'react'
import { Route, Routes as ReactRoutes, useNavigate } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

import { DefaultLayout } from '../layouts/DefaultLayout'

import { Home } from '../pages/Home'
import { Dashboard } from '../pages/Dashboard'
import { Landing } from '../pages/Landing'
import { History } from '../pages/History'
import { SignIn } from '../pages/SignIn'
import { Teams } from '../pages/Teams'

export function Routes() {
  const { user } = useAuth()

  return (
    <ReactRoutes>
      <Route path="/landing" element={<Landing />} />
      <Route path="/signin" element={<SignIn />} />

      <Route path="/" element={<DefaultLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/teams" element={<Teams />} />
      </Route>
    </ReactRoutes>
  )
}
