import type { VFC } from 'react'

import { useNavigate } from 'react-router-dom'

import { Button } from '@mui/material'

import { useAuthContext } from '@contexts/AuthContext'

const EpisodeCreateButton: VFC = () => {
  const navigate = useNavigate()
  const { corderCurrentUser } = useAuthContext()

  const onClick = () => {
    navigate('/episode_create')
  }

  return <div>{corderCurrentUser && <Button onClick={onClick}>Episode Create</Button>}</div>
}

export default EpisodeCreateButton
