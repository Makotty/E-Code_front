// React
import { useState, useEffect } from 'react'
import type { VFC, MouseEvent, ChangeEvent } from 'react'

// React Router
import { useNavigate, useParams } from 'react-router-dom'
import type { Params } from 'react-router-dom'

// Mui
import { Avatar, Button, Paper } from '@mui/material'

// Containers
import Layout from '@containers/Layout'

// Lib
import { getEpisodeDetail } from '@lib/api/episode'

// Types
import createEpisodeComment from '@lib/api/episode_comment'
import EpisodeTextArea from '@components/EpisodeTextArea'
import { useAuthContext } from '@contexts/AuthContext'
import { useOAuthContext } from '@contexts/OAuthContext'
import { EpisodeData } from '../types/EpisodeData'

const EpisodeDetail: VFC = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const { corderCurrentUser } = useAuthContext()

  const [episodeCommentValue, setEpisodeCommentValue] = useState('')
  const [episodeId, setEpisodeId] = useState<number>(0)

  const [episodeData, setEpisodeData] = useState<EpisodeData | undefined>()
  const query = useParams()

  const handleGetEpisodeDetail = async (data: Readonly<Params<string>>) => {
    const { id } = data

    if (id) {
      await getEpisodeDetail(id)
        .then((response) => {
          setEpisodeData(response.data)
          setEpisodeId(Number(id))
        })
        .catch((error) => {
          if (error) {
            setErrorMessage('何らかのエラーが発生しました')
          }
        })
    }
  }

  const handleChangeCreateArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEpisodeCommentValue(event.currentTarget.value)
  }

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    await createEpisodeComment({ content: episodeCommentValue, episodeId })
      .then(() => {
        window.location.reload()
      })
      .catch((error) => {
        if (error) {
          setErrorMessage('何らかのエラーが発生しました')
        }
      })
  }

  useEffect(() => {
    handleGetEpisodeDetail(query)
      .then(() => {
        //
      })
      .catch((error) => {
        if (error) {
          setErrorMessage('何らかのエラーが発生しました')
        }
      })
  }, [query])

  const handleBack = () => {
    navigate(-1)
  }

  const replaceNewLine = episodeData?.content.replaceAll(/\n/g, '<br>')
  const episodeContent = document.getElementById('episodeContent')
  if (episodeContent && replaceNewLine) {
    episodeContent.innerHTML = replaceNewLine
  }

  return (
    <Layout>
      <Paper>
        <h2>Episode Detail</h2>
        {errorMessage && <p>{errorMessage}</p>}
        <Avatar
          src={episodeData?.contributorImage}
          alt="アカウントアイコン"
          sx={{ width: 64, height: 64 }}
        />
        <p>{episodeData?.contributorName}</p>
        <div id="episodeContent" />

        {corderCurrentUser && (
          <>
            <form>
              <EpisodeTextArea onChange={handleChangeCreateArea} />
            </form>
            <Button type="submit" variant="contained" onClick={handleSubmit}>
              投稿する
            </Button>
          </>
        )}

        {episodeData?.episodeComments &&
          episodeData?.episodeComments.map((data) => {
            const { id, content } = data
            return <p key={id}>{content}</p>
          })}

        <Button onClick={handleBack}>戻る</Button>
      </Paper>
    </Layout>
  )
}

export default EpisodeDetail
