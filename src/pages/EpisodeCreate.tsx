// React
import { ChangeEvent, useState, VFC, MouseEvent } from 'react'

// React Router
import { useNavigate } from 'react-router-dom'

// Mui
import { Button } from '@mui/material'

// Components
import BaseLayout from '@components/BaseLayout'
import CreateEpisodeArea from '@components/CreateEpisodeArea/indext'

import { createEpisode } from '@lib/api/episode'

const EpisodeCreate: VFC = () => {
  const navigate = useNavigate()

  const [episodeValue, setEpisodeValue] = useState('')

  const handleChangeCreateArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEpisodeValue(event.currentTarget.value)
  }

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    try {
      const response = await createEpisode({ content: episodeValue })
      console.log(response)
      navigate('/episode_list')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <BaseLayout>
      <form>
        <CreateEpisodeArea onChange={handleChangeCreateArea} />
      </form>
      <Button type="submit" variant="contained" onClick={handleSubmit}>
        投稿する
      </Button>
    </BaseLayout>
  )
}

export default EpisodeCreate
