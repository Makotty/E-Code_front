import type { ReactNode, VFC } from 'react'

import { Container } from '@mui/material'
import LogedInHeader from '@containers/LogedInHeader'
import { useAuthContext } from '@contexts/AuthContext'
import { useOAuthContext } from '@contexts/OAuthContext'
import BaseHeader from '../components/BaseHeader'

type LayoutProps = {
  children: ReactNode
}

const Layout: VFC<LayoutProps> = ({ children }) => {
  const { corderCurrentUser } = useAuthContext()
  const { readerCurrentUser } = useOAuthContext()
  return (
    <>
      {corderCurrentUser || readerCurrentUser ? <LogedInHeader /> : <BaseHeader />}
      <Container maxWidth="sm">{children}</Container>
    </>
  )
}

export default Layout
