// React
import { useState } from 'react'
import type { VFC } from 'react'

// React Router
import { Navigate, useNavigate } from 'react-router-dom'

// MUI
import { Avatar, Button } from '@mui/material'

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
  const { isSignedIn, setIsSignedIn, corderCurrentUser } = useAuthContext()
  const { readerCurrentUser } = useOAuthContext()
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

  const handleCorderSignOut = async () => {
    try {
      const response = await corderLogOut()

      if (response.data.success === true) {
        // ログアウト出来たらCookieを削除
        Cookies.remove('_access_token')
        Cookies.remove('_client')
        Cookies.remove('_uid')

        setIsSignedIn(false)

        window.location.reload()
      } else {
        console.log('ログアウトに失敗しました')
      }
    } catch (error) {
      console.log(error)
    }

    navigate('/')
  }

  if (!corderCurrentUser && !readerCurrentUser) {
    return <Navigate to="/" />
  }

  return (
    <BaseLayout>
      <h2>タイムライン</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {readerCurrentUser && (
        <Button variant="contained" onClick={handleReaderLogout}>
          ログアウト(Reader)
        </Button>
      )}

      {isSignedIn && corderCurrentUser && (
        <>
          <h2>Email: {corderCurrentUser?.email}</h2>
          <h2>Name: {corderCurrentUser?.name}</h2>
          <Avatar
            src={corderCurrentUser?.fileUrl}
            alt="アカウントアイコン"
            sx={{ width: 64, height: 64 }}
          />
          <h2>Name: {corderCurrentUser?.birthDay}</h2>
          <Button onClick={handleCorderSignOut}>ログアウト(Corder)</Button>
        </>
      )}
    </BaseLayout>
  )
}

export default TimeLine
