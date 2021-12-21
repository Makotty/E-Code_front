import type { ReactNode, VFC } from 'react'

import { Container } from '@mui/material'
import BaseHeader from '../BaseHeader'
import BaseFooter from '../BaseFooter'

type BaseLayoutProps = {
  children: ReactNode
}

const BaseLayout: VFC<BaseLayoutProps> = ({ children }) => {
  return (
    <>
      <BaseHeader />
      <Container>{children}</Container>
      <BaseFooter />
    </>
  )
}

export default BaseLayout
