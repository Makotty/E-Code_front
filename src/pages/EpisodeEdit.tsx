// React
import { ChangeEvent, useEffect, useState } from 'react'
import type { VFC, MouseEvent } from 'react'

// React Router
import { useNavigate, useParams } from 'react-router-dom'
import type { Params } from 'react-router-dom'

// Mui
import { Button } from '@mui/material'

// Components
import EpisodeTextArea from '@components/EpisodeTextArea'

// Containers
import Layout from '@containers/Layout'

// Lib
import { getEpisodeDetail, updateEpisode } from '@lib/api/episode'

const EpisodeEdit: VFC = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const [episodeDataValue, setEpisodeDataValue] = useState('')
  const query = useParams()

  const handleGetEpisodeData = async (data: Readonly<Params<string>>) => {
    const { id } = data
    if (id) {
      await getEpisodeDetail(id)
        .then((response) => {
          setEpisodeDataValue(response.data.content)
        })
        .catch((error) => {
          if (error) {
            setErrorMessage('エピソードを取得できませんでした。')
          }
        })
    }
  }

  useEffect(() => {
    handleGetEpisodeData(query)
      .then(() => {
        //
      })
      .catch(() => {
        //
      })
  }, [query])

  const handleChangeTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEpisodeDataValue(event.currentTarget.value)
  }

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (query.id) {
      await updateEpisode({
        id: query.id,
        params: { content: episodeDataValue }
      })
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
    <Layout>
      <h2>Episode Edit</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form>
        <EpisodeTextArea onChange={handleChangeTextArea} value={episodeDataValue} />
      </form>
      <Button type="submit" variant="contained" onClick={handleSubmit}>
        投稿する
      </Button>
    </Layout>
  )
}

export default EpisodeEdit
