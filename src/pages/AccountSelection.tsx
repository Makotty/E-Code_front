import type { VFC } from 'react'
import { Link, Navigate } from 'react-router-dom'

import { Button } from '@mui/material'

import BaseLayout from '@components/BaseLayout'
import { useOAuthContext } from '@contexts/OAuthContext'
import { useAuthContext } from '@contexts/AuthContext'

const AccountSelection: VFC = () => {
  const { corderCurrentUser } = useAuthContext()
  const { oAuthCurrentUser } = useOAuthContext()

  if (corderCurrentUser || oAuthCurrentUser) {
    return <Navigate to="/timeline" />
  }

  return (
    <BaseLayout>
      <Button variant="contained" component={Link} to="/reader_signup">
        読む人
      </Button>
      <Button
        variant="contained"
        color="secondary"
        component={Link}
        to="/corder_signup"
      >
        書く人
      </Button>
    </BaseLayout>
  )
}

export default AccountSelection
