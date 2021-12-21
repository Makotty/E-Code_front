// React
import { useState } from 'react'
import type { VFC } from 'react'

import { Link } from 'react-router-dom'

// React-Hook-Form
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'

// Mui
import { Button } from '@mui/material'

// Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth'
import type { AuthError } from 'firebase/auth'
import { auth } from '../firebase'

// Types
import { IFormValues } from '../types/FormValues'

// Components
import BaseLayout from '../components/BaseLayout'
import BaseInput from '../components/BaseInput'

const ReaderSignUp: VFC = () => {
  const [errorMessage, setErrorMessage] = useState('')

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
        console.log(user)
      })
      .catch((error: AuthError) => {
        setErrorMessage(error.message)
      })
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
    </BaseLayout>
  )
}

export default ReaderSignUp
