import type { SetStateAction } from 'react'
import { AxiosResponse } from 'axios'

import Cookies from 'js-cookie'

import {
  CorderSignUpParams,
  CorderLogInParams,
  CorderUser
} from '@interfaces/index'

import client from './client'

// Sign Up(Corder)
export const corderSignUp = (params: CorderSignUpParams) => {
  return client.post('auth', params)
}

// Log In(Corder)
export const corderLogIn = (params: CorderLogInParams) => {
  return client.post('auth/sign_in', params)
}

// Sign Out(Corder)
export const corderLogOut = () => {
  return client.delete('auth/sign_out', {
    headers: {
      'access-token': Cookies.get('_access_token') ?? '',
      client: Cookies.get('_client') ?? '',
      uid: Cookies.get('_uid') ?? ''
    }
  })
}

type AxiosResponseProps = {
  isLogin: boolean
  data: SetStateAction<CorderUser | undefined>
}

// 認証済みのユーザーを取得
export const getCurrentUser: () =>
  | Promise<AxiosResponse<AxiosResponseProps>>
  | undefined = () => {
  if (
    !Cookies.get('_access_token') ||
    !Cookies.get('_client') ||
    !Cookies.get('_uid')
  )
    return undefined
  return client.get('/auth/sessions', {
    headers: {
      'access-token': Cookies.get('_access_token') ?? '',
      client: Cookies.get('_cilent') ?? '',
      uid: Cookies.get('_uid') ?? ''
    }
  })
}
