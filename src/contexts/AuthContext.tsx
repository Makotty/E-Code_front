import { createContext, useState, useEffect, useContext, useMemo } from 'react'
import type { VFC, ReactNode, Dispatch, SetStateAction } from 'react'
import { CorderUser } from '@interfaces/index'
import { getCurrentUser } from '@lib/api/auth'

export const AuthContext = createContext(
  {} as {
    isSignedIn: boolean
    setIsSignedIn: Dispatch<SetStateAction<boolean>>
    corderCurrentUser: CorderUser | undefined
    setCorderCurrentUser: Dispatch<SetStateAction<CorderUser | undefined>>
  }
)

export const useAuthContext = () => {
  return useContext(AuthContext)
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContextProvider: VFC<AuthContextProviderProps> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [corderCurrentUser, setCorderCurrentUser] = useState<CorderUser | undefined>()

  // ログイン済みのユーザーがいるかどうかチェックし、確認できた場合はそのユーザーの情報を取得
  const handleGetCurrentUser = async () => {
    try {
      const response = await getCurrentUser()
      if (response?.data.isLogin === true) {
        setIsSignedIn(true)
        setCorderCurrentUser(response?.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const value = useMemo(() => {
    return {
      isSignedIn,
      setIsSignedIn,
      corderCurrentUser,
      setCorderCurrentUser
    }
  }, [isSignedIn, setIsSignedIn, corderCurrentUser, setCorderCurrentUser])

  useEffect(() => {
    handleGetCurrentUser()
      .then(() => {
        //
      })
      .catch(() => {
        //
      })
  }, [setCorderCurrentUser])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
