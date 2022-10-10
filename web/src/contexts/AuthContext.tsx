import { createContext, ReactNode, useState, useEffect } from 'react'
import {
  signInWithEmailAndPassword,
  signOut as signOutFromApp,
} from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'

import { auth, database } from '../services/firebase'

import { TeamMemberEvaluation } from '../pages/Teams/components/TeamMemberEvaluationModal'

interface UserAttributes {
  open_mind: {
    amount: number
  }
  friendly: {
    amount: number
  }
  organization: {
    amount: number
  }
  dedication: {
    amount: number
  }
  perception: {
    amount: number
  }
}

interface EvaluatedTask {
  id: string
  title: string
  is_extra: boolean
  finished_date: Date
  comments: {
    manager?: string
    workstation?: string
  }
  evaluations: {
    manager: number
    workstation: number
    overall: number
    whim: number
  }
}

export interface User {
  id: string
  name: string
  avatar_url: string
  expectations?: string
  ponctuation: number
  is_manager: boolean
  manager_bias?: number
  manager_id?: string
  role: string
  role_insensitive: string
  evaluated_tasks?: EvaluatedTask[]
  team_evaluations?: TeamMemberEvaluation[]
  potential: 'A' | 'B' | 'C'
  task_amount?: number
  genre: 'male' | 'female' | 'other'
  attributes: UserAttributes
}

interface AuthContextData {
  user: User | null
  isSigningIn: boolean
  signIn: (username: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isSigningIn, setIsSigningIn] = useState(false)

  const userLocalStorageKey = '@kraftheinz:user'

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (signedUser) => {
      if (signedUser) {
        const userLocalData = localStorage.getItem(userLocalStorageKey)
        const formattedLocalData = userLocalData && JSON.parse(userLocalData)

        setUser(formattedLocalData)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  async function signIn(email: string, password: string) {
    setIsSigningIn(true)

    await signInWithEmailAndPassword(auth, email, password)
      .then(async (account) => {
        const userRef = doc(database, 'users', account.user.uid)

        onSnapshot(userRef, (doc) => {
          const data = doc.data() as User

          const userData = {
            ...data,
            id: account.user.uid,
          }

          setUser(userData)

          localStorage.setItem(userLocalStorageKey, JSON.stringify(userData))
        })
      })
      .catch((error) => {
        console.log(error.code)
      })
      .finally(() => {
        setIsSigningIn(false)
      })
  }

  async function signOut() {
    await signOutFromApp(auth)

    setUser(null)
    localStorage.removeItem(userLocalStorageKey)
  }

  return (
    <AuthContext.Provider value={{ user, isSigningIn, signIn, signOut }}>
      {props.children}
    </AuthContext.Provider>
  )
}
