import { createContext, useState, useEffect, useContext } from 'react'
import type { ReactNode, VFC } from 'react'

// Firebase
import { onAuthStateChanged } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { auth } from '../firebase'

type AuthContextProps = {
  currentUser: User | null | undefined
}

export const AuthContext = createContext<AuthContextProps>({
  currentUser: undefined
})

export const useAuthContext = () => {
  return useContext(AuthContext)
}

type Props = {
  children: ReactNode
}

export const AuthProvider: VFC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })
    return () => {
      unsubscribed()
    }
  }, [])

  if (loading) {
    return <p>loading...</p>
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
