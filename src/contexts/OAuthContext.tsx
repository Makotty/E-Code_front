import { createContext, useState, useEffect, useContext, useMemo } from 'react'
import type { ReactNode, VFC } from 'react'

// Firebase
import { onAuthStateChanged } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { auth } from '@lib/firebase'

type OAuthContextProps = {
  readerCurrentUser: User | null | undefined
}

export const OAuthContext = createContext<OAuthContextProps>({
  readerCurrentUser: undefined
})

export const useOAuthContext = () => {
  return useContext(OAuthContext)
}

type OAuthContextProviderProps = {
  children: ReactNode
}

export const OAuthContextProvider: VFC<OAuthContextProviderProps> = ({ children }) => {
  const [readerCurrentUser, setReaderCurrentUser] = useState<User | null | undefined>(undefined)

  const value = useMemo(() => {
    return { readerCurrentUser }
  }, [readerCurrentUser])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setReaderCurrentUser(user)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return <OAuthContext.Provider value={value}>{children}</OAuthContext.Provider>
}
