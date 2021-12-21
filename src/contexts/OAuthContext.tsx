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

type Props = {
  children: ReactNode
}

export const OAuthContextProvider: VFC<Props> = ({ children }) => {
  const [oAuthCurrentUser, setOAuthCurrentUser] = useState<
    User | null | undefined
  >(undefined)
  const [loading, setLoading] = useState(true)

  const value = useMemo(() => {
    return { oAuthCurrentUser }
  }, [oAuthCurrentUser])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setOAuthCurrentUser(user)
      setLoading(false)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  if (loading) {
    return <p>loading...</p>
  }

  return (
    <OAuthContext.Provider value={value}>
      {!loading && children}
    </OAuthContext.Provider>
  )
}
