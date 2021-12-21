// Firebase
import { signInWithRedirect } from 'firebase/auth'
import { auth, googleProvider, githubProvider } from '../firebase'

// Google
export const googleAuth = async () => {
  await signInWithRedirect(auth, googleProvider)
}

// GitHub
export const githubAuth = async () => {
  await signInWithRedirect(auth, githubProvider)
}
