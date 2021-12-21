import { Button, Paper } from '@mui/material'
import type { VFC } from 'react'
import { Link } from 'react-router-dom'

const AccountSelection: VFC = () => {
  return (
    <Paper>
      <Button variant="contained" component={Link} to="/reader_signup">
        読む人で登録する。
      </Button>
      <Button variant="contained" component={Link} to="/corder_signup">
        書く人で登録する。
      </Button>
    </Paper>
  )
}

export default AccountSelection
