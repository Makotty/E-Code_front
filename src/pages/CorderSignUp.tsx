// React
import { ChangeEvent, useState, VFC } from 'react'

//  React Router
import { Link, Navigate } from 'react-router-dom'

// React-Hook-Form
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'

// AWS
import AWS from 'aws-sdk'

// Uuid
import { v4 as uuidv4 } from 'uuid'

// Mui
import { Avatar, Button, Stack } from '@mui/material'

// Components
import BaseLayout from '@components/BaseLayout'
import BaseInput from '@components/BaseInput'
import BaseUpLoadImgButton from '@components/BaseUpLoadImgButton'

// Containers
import CorderSignUpModal from '@containers/CorderSignUpModal'

// Contexts
import { useAuthContext } from '@contexts/AuthContext'
import { useOAuthContext } from '@contexts/OAuthContext'

// Types
import { IFormValues } from '../types/FormValues'

const S3_BUCKET = import.meta.env.VITE_S3_BUCKET
const REGION = import.meta.env.VITE_S3_REGION

AWS.config.update({
  accessKeyId: import.meta.env.VITE_S3_ACCESS_KEY,
  secretAccessKey: import.meta.env.VITE_S3_SECRET_ACCESS_KEY
})

const ECodeBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION
})

const CorderSignUp: VFC = () => {
  const { corderCurrentUser } = useAuthContext()
  const { readerCurrentUser } = useOAuthContext()

  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userPasswordConfirmation, setUserPasswordConfirmation] = useState('')
  const [userBirthDay, setUserBirthDay] = useState('')
  const [imagePath, setImagePath] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const [selectedFile, setSelectedFile] = useState<File>()

  const [errorMessage, setErrorMessage] = useState('')

  const [showModal, setShowModal] = useState(false)

  const imageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    if (files) {
      const imageFile = files[0]
      const imageUrl = URL.createObjectURL(imageFile)
      setImagePath(imageUrl)
      setSelectedFile(imageFile)
    }
  }
  const uploadFile = (file: File) => {
    const fileExtension = file.name.split('.').pop()

    if (fileExtension !== undefined) {
      const key = `${uuidv4()}.${fileExtension}`
      setFileUrl(`https://e-code.s3.ap-northeast-1.amazonaws.com/${key}`)

      const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: S3_BUCKET,
        Key: key
      }

      ECodeBucket.putObject(params).send((erorr) => {
        if (erorr) {
          setErrorMessage(erorr.message)
        }
      })
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormValues>()

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    const { name, email, password, passwordConfirmation, birthDay } = data

    if (selectedFile) {
      uploadFile(selectedFile)
    }
    setUserEmail(email)
    setUserName(name)
    setUserBirthDay(birthDay)
    if (password === passwordConfirmation) {
      setUserPassword(password)
      setUserPasswordConfirmation(passwordConfirmation)
      setShowModal(true)
    } else {
      setErrorMessage('パスワードが一致していません')
    }
  }

  const closeModal = () => {
    setShowModal(false)
  }

  if (corderCurrentUser || readerCurrentUser) {
    return <Navigate to="/timeline" />
  }

  return (
    <BaseLayout>
      <h2>サインアップ画面(Corder)</h2>
      <div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Avatar
            src={imagePath}
            alt="アカウントアイコン"
            sx={{ width: 64, height: 64 }}
          />
          <div>
            <BaseUpLoadImgButton
              label="userImg"
              onChange={imageChange}
              disableElevation
            >
              アップロード
            </BaseUpLoadImgButton>
          </div>
        </div>
        <Stack spacing={3}>
          {errors.name?.type === 'required' && <p>名前が入力されていません</p>}
          <BaseInput
            fieldLabel="name"
            label="name"
            register={register}
            requiredFlag
          />
          {errors.birthDay?.type === 'required' && (
            <p>誕生日が入力されていません</p>
          )}
          <BaseInput
            type="date"
            label="birthDay"
            fieldLabel="birthday"
            register={register}
            requiredFlag
            defaultValue="2000-01-01"
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
        </Stack>
        <Button variant="contained" type="submit" disableElevation>
          アカウント作成
        </Button>
      </form>
      <div>
        ログインは<Link to="/corder_login">こちら</Link>から
      </div>

      <CorderSignUpModal
        imagePath={imagePath}
        imageUrl={fileUrl}
        userName={userName}
        userEmail={userEmail}
        userBirthDay={userBirthDay}
        userPassword={userPassword}
        userPasswordConfirmation={userPasswordConfirmation}
        showFlag={showModal}
        onClick={closeModal}
      />
    </BaseLayout>
  )
}

export default CorderSignUp
