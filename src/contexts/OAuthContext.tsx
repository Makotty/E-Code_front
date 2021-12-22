import { createContext, useState, useEffect, useContext, useMemo } from 'react'
import type { ReactNode, VFC } from 'react'

// Firebase
import { onAuthStateChanged } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { auth } from '../firebase'

type OAuthContextProps = {
  oAuthCurrentUser: User | null | undefined
}

export const OAuthContext = createContext<OAuthContextProps>({
  oAuthCurrentUser: undefined
})

export const useOAuthContext = () => {
  return useContext(OAuthContext)
}

type OAuthContextProviderProps = {
  children: ReactNode
}

export const OAuthContextProvider: VFC<OAuthContextProviderProps> = ({
  children
}) => {
  const [oAuthCurrentUser, setOAuthCurrentUser] = useState<
    User | null | undefined
  >(undefined)

  const value = useMemo(() => {
    return { oAuthCurrentUser }
  }, [oAuthCurrentUser])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setOAuthCurrentUser(user)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return <OAuthContext.Provider value={value}>{children}</OAuthContext.Provider>
}
