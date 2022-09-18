import { createContext, ReactNode, useState, useEffect } from 'react'
import {
  signInWithEmailAndPassword,
  signOut as signOutFromApp,
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

import { auth, database } from '../services/firebase'

interface User {
  id: string
  name: string
  avatar_url: string
  expectations?: string
  ponctuation: number
  is_manager: boolean
  manager_id?: string
  role: string
  role_insensitive: string
  potential: 'A' | 'B' | 'C'
  task_amount?: number
  genre: 'male' | 'female' | 'other'
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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (signedUser) => {
      if (signedUser) {
        const { uid } = signedUser

        const userRef = doc(database, 'users', uid)

        const response = await getDoc(userRef)

        if (response.exists()) {
          const data = response.data() as User

          setUser({
            ...data,
            id: uid,
            role_insensitive: data.role.toLocaleLowerCase().trim(),
          })
        }
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

        const response = await getDoc(userRef)

        if (response.exists()) {
          const data = response.data() as User

          setUser({
            ...data,
            id: account.user.uid,
            role_insensitive: data.role.toLocaleLowerCase().trim(),
          })
        } else {
          setUser(null)
        }
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
  }

  return (
    <AuthContext.Provider value={{ user, isSigningIn, signIn, signOut }}>
      {props.children}
    </AuthContext.Provider>
  )
}
