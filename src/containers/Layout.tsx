import { ReactNode, useState, VFC } from 'react'

import { Container } from '@mui/material'
import LogedInHeader from '@containers/LogedInHeader'
import { useAuthContext } from '@contexts/AuthContext'
import { useOAuthContext } from '@contexts/OAuthContext'
import { corderLogOut } from '@lib/api/auth'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { AuthError, signOut } from 'firebase/auth'
import auth from '@lib/firebase'
import BaseHeader from '../components/BaseHeader'

type LayoutProps = {
  children: ReactNode
}

const Layout: VFC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const { corderCurrentUser, setIsSignedIn } = useAuthContext()
  const { readerCurrentUser } = useOAuthContext()

  const handleCloseNavMenu = async () => {
    if (corderCurrentUser) {
      await corderLogOut()
        .then((response) => {
          if (response.data.success === true) {
            // ログアウト出来たらCookieを削除
            Cookies.remove('_access_token')
            Cookies.remove('_client')
            Cookies.remove('_uid')
            setIsSignedIn(false)
            navigate('/')
            window.location.reload()
          }
        })
        .catch((error) => {
          if (error) {
            setErrorMessage('ログアウトできませんでした')
          }
        })
    }

    if (readerCurrentUser) {
      await signOut(auth)
        .then(() => {
          // Sign-out successful.
          navigate('/')
        })
        .catch((error: AuthError) => {
          // An error happened.
          setErrorMessage(error.message)
        })
    }
  }
  return (
    <>
      {corderCurrentUser || readerCurrentUser ? (
        <LogedInHeader handleCloseNavMenu={handleCloseNavMenu} />
      ) : (
        <BaseHeader />
      )}
      <Container maxWidth="sm">
        <div>{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}</div>
        {children}
      </Container>
    </>
  )
}

export default Layout
