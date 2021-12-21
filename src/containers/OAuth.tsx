// Firebase
import { signInWithRedirect } from 'firebase/auth'
import { auth, googleProvider } from '../firebase'

// Google
const googleAuth = async () => {
  await signInWithRedirect(auth, googleProvider)
}

export default googleAuth
