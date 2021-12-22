// React
import type { VFC } from 'react'

//  React Router
import { Link, Navigate, useNavigate } from 'react-router-dom'

// React-Hook-Form
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'

// Mui
import { Button } from '@mui/material'

// Js-Cookies
import Cookies from 'js-cookie'

// Components
import BaseLayout from '@components/BaseLayout'
import BaseInput from '@components/BaseInput'

// Contexts
import { useAuthContext } from '@contexts/AuthContext'
import { useOAuthContext } from '@contexts/OAuthContext'

// Interfaces
import { CorderSignUpParams } from '@interfaces/index'

// Lib
import { corderSignUp } from '@lib/api/auth'

// Types
import { IFormValues } from '../types/FormValues'

const CorderSignUp: VFC = () => {
  const { corderCurrentUser } = useAuthContext()
  const { oAuthCurrentUser } = useOAuthContext()
  const navigate = useNavigate()

  const { setIsSignedIn, setCorderCurrentUser } = useAuthContext()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormValues>()

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    const { name, email, password, passwordConfirmation } = data

    const params: CorderSignUpParams = {
      name,
      email,
      password,
      passwordConfirmation
    }

    try {
      const response = await corderSignUp(params)
      console.log(response)

      if (response.status === 200) {
        // アカウント作成に成功したらCookieを格納
        Cookies.set('_access_token', response.headers['access-token'])
        Cookies.set('_client', response.headers.client)
        Cookies.set('_uid', response.headers.uid)

        setIsSignedIn(true)
        setCorderCurrentUser(response.data.data)

        navigate('/timeline')
        console.log('アカウント作成できました')
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (corderCurrentUser || oAuthCurrentUser) {
    return <Navigate to="/timeline" />
  }

  return (
    <BaseLayout>
      <h2>サインアップ画面(Corder)</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.name?.type === 'required' && (
          <p>メールアドレスが入力されていません</p>
        )}
        <BaseInput
          fieldLabel="name"
          label="name"
          register={register}
          requiredFlag
        />
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
        {errors.passwordConfirmation?.type === 'required' && (
          <p>パスワード(確認)が入力されていません</p>
        )}
        <BaseInput
          fieldLabel="passwordConfirmation"
          type="password"
          label="passwordConfirmation"
          register={register}
          requiredFlag
        />
        <Button variant="contained" type="submit" disableElevation>
          アカウント作成
        </Button>
      </form>
      <div>
        ログインは<Link to="/corder_login">こちら</Link>から
      </div>
    </BaseLayout>
  )
}

export default CorderSignUp
