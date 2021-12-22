// Sign Up(Corder)
export interface CorderSignUpParams {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

// Log In(Corder)
export interface CorderLogInParams {
  email: string
  password: string
}

// User(Corder)
export interface CorderUser {
  id: number
  uid: string
  provider: string
  email: string
  name: string
  nickname?: string
  image: string
  allowPasswordChange: boolean
  created_at: Date
  updated_at: Date
}
