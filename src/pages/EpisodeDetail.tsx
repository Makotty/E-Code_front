// React
import { useState, useEffect } from 'react'
import type { VFC, MouseEvent, ChangeEvent } from 'react'

// React Router
import { useNavigate, useParams } from 'react-router-dom'
import type { Params } from 'react-router-dom'

// Mui
import { Avatar, Button, Paper } from '@mui/material'

// Components
import EpisodeTextArea from '@components/EpisodeTextArea'

// Containers
import Layout from '@containers/Layout'

// Contexts
import { useAuthContext } from '@contexts/AuthContext'

// Lib
import { getEpisodeDetail } from '@lib/api/episode'
import createEpisodeComment from '@lib/api/episode_comment'

// Types

import { EpisodeData } from '../types/EpisodeData'

const EpisodeDetail: VFC = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const { corderCurrentUser } = useAuthContext()

  const [episodeCommentValue, setEpisodeCommentValue] = useState('')
  const [episodeId, setEpisodeId] = useState<number>(0)

  const [episodeData, setEpisodeData] = useState<EpisodeData | undefined>()

  const contributorName = corderCurrentUser?.name
  const contributorImage = corderCurrentUser?.fileUrl

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

    if (contributorName && contributorImage) {
      await createEpisodeComment({
        content: episodeCommentValue,
        episodeId,
        contributorName,
        contributorImage
      })
        .then(() => {
          window.location.reload()
        })
        .catch((error) => {
          if (error) {
            setErrorMessage('何らかのエラーが発生しました')
          }
        })
    }
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
            const date = data.createdAt
              .toString()
              .replace('T', ' ')
              .split('.')
              .shift()
              ?.replace(/-/g, '/')

            return (
              <div key={data.id}>
                <Avatar src={data.contributorImage} alt="コメント投稿者のアバター" />
                <p>{data.contributorName}</p>
                <p>{data.content}</p>
                <p>{date}</p>
              </div>
            )
          })}

        <Button onClick={handleBack}>戻る</Button>
      </Paper>
    </Layout>
  )
}

export default EpisodeDetail
