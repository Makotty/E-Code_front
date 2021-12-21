// React
import { useState } from 'react'
import type { VFC } from 'react'

import { Navigate, useNavigate } from 'react-router-dom'

// MUI
import { Button } from '@mui/material'

// Firebase
import { AuthError, signOut } from 'firebase/auth'
import auth from '../firebase'

// Components
import BaseLayout from '../components/BaseLayout'
import { useOAuthContext } from '../contexts/OAuthContext'

const TimeLine: VFC = () => {
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

  return (
    <BaseLayout>
      <h2>タイムライン</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <Button variant="contained" onClick={handleReaderLogout}>
        ログアウト(Reader)
      </Button>
    </BaseLayout>
  )
}

export default TimeLine
