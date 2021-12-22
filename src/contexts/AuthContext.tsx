import {
  createContext,
  useState,
  useContext,
  useEffect,
  SetStateAction,
  Dispatch,
  useMemo
} from 'react'
import type { VFC, ReactNode } from 'react'
import { CorderUser } from '@interfaces/index'
import { getCurrentUser } from '@lib/api/auth'

// グローバルで扱う変数・関数
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

  // 認証済みのユーザーがいるかどうかチェック
  // 確認できた場合はそのユーザーの情報を取得
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()

      if (res?.data.isLogin === true) {
        setIsSignedIn(true)
        setCorderCurrentUser(res?.data.data)

        console.log(res?.data.data)
      } else {
        console.log('No current user')
      }
    } catch (err) {
      console.log(err)
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
