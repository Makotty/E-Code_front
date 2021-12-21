// Firebase
import { signInWithRedirect } from 'firebase/auth'
import {
  auth,
  googleProvider,
  twitterProvider,
  githubProvider
} from '../firebase'

// Google
export const googleAuth = async () => {
  await signInWithRedirect(auth, googleProvider)
}

// Twitter
export const twitterAuth = async () => {
  await signInWithRedirect(auth, twitterProvider)
}

// GitHub
export const githubAuth = async () => {
  await signInWithRedirect(auth, githubProvider)
}
