// React
import { ChangeEvent, useState, VFC, MouseEvent, useContext } from 'react'

// React Router
import { useNavigate } from 'react-router-dom'

// Mui
import { Button } from '@mui/material'

// Components
import BaseLayout from '@components/BaseLayout'
import EpisodeTextArea from '@components/EpisodeTextArea'

// Lib
import { createEpisode } from '@lib/api/episode'
import { AuthContext } from '@contexts/AuthContext'

const EpisodeCreate: VFC = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const { corderCurrentUser } = useContext(AuthContext)

  const [episodeValue, setEpisodeValue] = useState('')
  const contributorName = corderCurrentUser?.name
  const contributorImage = corderCurrentUser?.fileUrl

  const handleChangeCreateArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEpisodeValue(event.currentTarget.value)
  }

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (contributorName && contributorImage) {
      await createEpisode({ content: episodeValue, contributorName, contributorImage })
        .then(() => {
          navigate('/episode_list')
        })
        .catch((error) => {
          if (error) {
            setErrorMessage('何らかのエラーが発生しました')
          }
        })
    }
  }

  return (
    <BaseLayout>
      {errorMessage && <p>{errorMessage}</p>}
      <form>
        <EpisodeTextArea onChange={handleChangeCreateArea} />
      </form>
      <Button type="submit" variant="contained" onClick={handleSubmit}>
        投稿する
      </Button>
    </BaseLayout>
  )
}

export default EpisodeCreate
