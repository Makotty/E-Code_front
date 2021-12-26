// React
import { ChangeEvent, useState, VFC, MouseEvent, useContext } from 'react'

// React Router
import { Navigate, useNavigate } from 'react-router-dom'

// Mui
import { Button, Paper } from '@mui/material'

// Components
import EpisodeTextArea from '@components/EpisodeTextArea'

// Containers
import Layout from '@containers/Layout'

// Lib
import { createEpisode } from '@lib/api/episode'
import { useAuthContext } from '@contexts/AuthContext'
import { useOAuthContext } from '@contexts/OAuthContext'

const EpisodeCreate: VFC = () => {
  const { corderCurrentUser } = useAuthContext()
  const { readerCurrentUser } = useOAuthContext()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const [episodeValue, setEpisodeValue] = useState('')

  if (readerCurrentUser) {
    return <Navigate to="/timeline" />
  }

  if (!corderCurrentUser && !readerCurrentUser) {
    return <Navigate to="/" />
  }

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
          navigate('/timeline')
        })
        .catch((error) => {
          if (error) {
            setErrorMessage('何らかのエラーが発生しました')
          }
        })
    }
  }

  return (
    <Layout>
      <Paper>
        {errorMessage && <p>{errorMessage}</p>}
        <form>
          <EpisodeTextArea onChange={handleChangeCreateArea} />
        </form>
        <Button type="submit" variant="contained" onClick={handleSubmit}>
          投稿する
        </Button>
      </Paper>
    </Layout>
  )
}

export default EpisodeCreate
