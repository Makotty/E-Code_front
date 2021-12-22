import { createContext, useState, useEffect, useContext, useMemo } from 'react'
import type { VFC, ReactNode, Dispatch, SetStateAction } from 'react'
import { CorderUser } from '@interfaces/index'
import { getCurrentUser } from '@lib/api/auth'

export const AuthContext = createContext(
  {} as {
    loading: boolean
    setLoading: Dispatch<SetStateAction<boolean>>
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

export const AuthContextProvider: VFC<AuthContextProviderProps> = ({
  children
}) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [corderCurrentUser, setCorderCurrentUser] = useState<
    CorderUser | undefined
  >()

  // ログイン済みのユーザーがいるかどうかチェックし、確認できた場合はそのユーザーの情報を取得
  const handleGetCurrentUser = async () => {
    try {
      const response = await getCurrentUser()

      console.log(response)

      if (response?.data.isLogin === true) {
        setIsSignedIn(true)
        setCorderCurrentUser(response?.data.data)
      } else {
        throw new Error(response?.data.message)
      }
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  const value = useMemo(() => {
    return {
      loading,
      setLoading,
      isSignedIn,
      setIsSignedIn,
      corderCurrentUser,
      setCorderCurrentUser
    }
  }, [
    loading,
    setLoading,
    isSignedIn,
    setIsSignedIn,
    corderCurrentUser,
    setCorderCurrentUser
  ])

  useEffect(() => {
    handleGetCurrentUser()
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [setCorderCurrentUser])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
