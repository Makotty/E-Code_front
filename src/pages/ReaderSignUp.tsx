// React
import { useState } from 'react'
import type { VFC } from 'react'

import { Link, Navigate, useNavigate } from 'react-router-dom'

// React-Hook-Form
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'

// Mui
import { Button } from '@mui/material'

// Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth'
import type { AuthError } from 'firebase/auth'
import { auth } from '../firebase'

// Components
import BaseLayout from '../components/BaseLayout'
import BaseInput from '../components/BaseInput'

// Containers
import googleAuth from '../containers/OAuth'

// Contexts
import { useOAuthContext } from '../contexts/OAuthContext'
import BaseOAuthButton from '../components/BaseOAuthButton'

// Types
import { IFormValues } from '../types/FormValues'

// Images
import googleIcon from '../assets/images/google-icon.svg'

const ReaderSignUp: VFC = () => {
  const { oAuthCurrentUser } = useOAuthContext()
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormValues>()

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    const { email, password } = data
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential
        // アカウントを作成出来たらTimeLineを表示
        if (user) {
          navigate('/timeline')
        }
      })
      .catch((error: AuthError) => {
        setErrorMessage(error.message)
      })
  }

  // oAuthCurrentUserを保持していればタイムライン画面を表示
  if (oAuthCurrentUser) {
    return <Navigate to="/timeline" />
  }

  return (
    <BaseLayout>
      <h2>サインアップ(Reader)</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.email?.type === 'required' && (
          <p>メールアドレスが入力されていません</p>
        )}
        <BaseInput
          fieldLabel="email"
          placeholder="example@example.com"
          label="email"
          register={register}
          requiredFlag
        />
        {errors.password?.type === 'required' && (
          <p>パスワードが入力されていません</p>
        )}
        <BaseInput
          fieldLabel="password"
          type="password"
          label="password"
          register={register}
          requiredFlag
        />
        <Button variant="contained" type="submit" disableElevation>
          アカウントを作成
        </Button>
      </form>
      <div>
        ログインは<Link to="/reader_login">こちら</Link>から
      </div>

      <BaseOAuthButton
        serviceAuth={googleAuth}
        oAuthIcon={googleIcon}
        oAuthAlt="Googleのアイコン"
      />
    </BaseLayout>
  )
}

export default ReaderSignUp