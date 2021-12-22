// React
import { useState } from 'react'
import type { VFC } from 'react'

// React Router
import { Link, Navigate, useNavigate } from 'react-router-dom'

// React-Hook-Form
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'

// Mui
import { Button } from '@mui/material'

// Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth'
import type { AuthError } from 'firebase/auth'

// Images
import googleIcon from '@images/google-icon.svg'
import twitterIcon from '@images/twitter-icon.svg'
import facebookIcon from '@images/facebook-icon.svg'
import githubIcon from '@images/github-icon.svg'

// Components
import BaseLayout from '@components/BaseLayout'
import BaseInput from '@components/BaseInput'
import BaseOAuthButton from '@components/BaseOAuthButton'

// Containers
import {
  googleAuth,
  twitterAuth,
  facebookAuth,
  githubAuth
} from '@containers/OAuth'

// Contexts
import { useAuthContext } from '@contexts/AuthContext'
import { useOAuthContext } from '@contexts/OAuthContext'

// Types
import { IFormValues } from '../types/FormValues'

import { auth } from '../firebase'

const ReaderSignUp: VFC = () => {
  const { corderCurrentUser } = useAuthContext()
  const { readerCurrentUser } = useOAuthContext()
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

  if (corderCurrentUser || readerCurrentUser) {
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
      <BaseOAuthButton
        serviceAuth={twitterAuth}
        oAuthIcon={twitterIcon}
        oAuthAlt="Twitterのアイコン"
      />
      <BaseOAuthButton
        serviceAuth={facebookAuth}
        oAuthIcon={facebookIcon}
        oAuthAlt="facebookのアイコン"
      />
      <BaseOAuthButton
        serviceAuth={githubAuth}
        oAuthIcon={githubIcon}
        oAuthAlt="GitHubのアイコン"
      />
    </BaseLayout>
  )
}

export default ReaderSignUp
