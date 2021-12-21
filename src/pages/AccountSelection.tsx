import type { VFC } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@mui/material'

import BaseLayout from '../components/BaseLayout'

const AccountSelection: VFC = () => {
  return (
    <BaseLayout>
      <Button variant="contained" component={Link} to="/reader_signup">
        読む人で登録する。
      </Button>
      <Button variant="contained" component={Link} to="/corder_signup">
        書く人で登録する。
      </Button>
    </BaseLayout>
  )
}

export default AccountSelection
