// React
import { memo, useState } from 'react'
import type { VFC } from 'react'

// React Router
import { Link, Navigate, useNavigate } from 'react-router-dom'

// MUI
import { Button } from '@mui/material'

// Js-Cookies
import Cookies from 'js-cookie'

// Firebase
import { AuthError, signOut } from 'firebase/auth'

// Contexts
import { useAuthContext } from '@contexts/AuthContext'
import { useOAuthContext } from '@contexts/OAuthContext'

// Components
import BaseLayout from '@components/BaseLayout'

// Lib
import { corderLogOut } from '@lib/api/auth'

import auth from '../firebase'

const TimeLine: VFC = () => {
  const { loading, isSignedIn, setIsSignedIn, corderCurrentUser } =
    useAuthContext()
  const { oAuthCurrentUser } = useOAuthContext()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const handleReaderLogout = async () => {
    await signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate('/')
      })
      .catch((error: AuthError) => {
        // An error happened.
        setErrorMessage(error.message)
      })
  }

  // oAuthCurrentUserを保持していなければ"/"に遷移
  if (!oAuthCurrentUser) {
    return <Navigate to="/" />
  }

  const handleCorderSignOut = async () => {
    try {
      const res = await corderLogOut()

      if (res.data.success === true) {
        // ログアウト出来たらCookieを削除
        Cookies.remove('_access_token')
        Cookies.remove('_client')
        Cookies.remove('_uid')

        setIsSignedIn(false)

        navigate('/corder_login')

        console.log('ログアウトできました')
      } else {
        console.log('ログアウトに失敗しました')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const CorderAuthButtons = memo(() => {
    // 認証完了後はサインアウト用のボタンを表示
    // 未認証時は認証用のボタンを表示
    if (!loading) {
      if (isSignedIn) {
        return <Button onClick={handleCorderSignOut}>Log Out</Button>
      }
      return (
        <>
          <Button component={Link} to="/corder_login">
            Log In
          </Button>
          <Button component={Link} to="/corder_signup">
            Sign Up
          </Button>
        </>
      )
    }
    return null
  })

  return (
    <BaseLayout>
      <h2>タイムライン</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <Button variant="contained" onClick={handleReaderLogout}>
        ログアウト(Reader)
      </Button>

      {isSignedIn && corderCurrentUser ? (
        <>
          <h2>Email: {corderCurrentUser?.email}</h2>
          <h2>Name: {corderCurrentUser?.name}</h2>
        </>
      ) : (
        <h2>Not signed in</h2>
      )}
      <CorderAuthButtons />
    </BaseLayout>
  )
}

export default TimeLine
