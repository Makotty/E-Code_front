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
import EpisodeComments from '@containers/EpisodeComments'

// Contexts
import { useAuthContext } from '@contexts/AuthContext'
import { useOAuthContext } from '@contexts/OAuthContext'

// Lib
import { getEpisodeDetail } from '@lib/api/episode'
import { createEpisodeComment, deleteEpisodeComment } from '@lib/api/episode_comment'

// Types
import { EpisodeCommentData } from '../types/EpisodeCommentData'
import { EpisodeData } from '../types/EpisodeData'

const EpisodeDetail: VFC = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const { corderCurrentUser } = useAuthContext()
  const { readerCurrentUser } = useOAuthContext()

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
        if (!corderCurrentUser && !readerCurrentUser) {
          navigate('/')
        }
      })
      .catch((error) => {
        if (error) {
          setErrorMessage('何らかのエラーが発生しました')
        }
      })
  }, [corderCurrentUser, readerCurrentUser, navigate, query])

  const handleEpisodeCommentDelete = async (data: EpisodeCommentData) => {
    await deleteEpisodeComment(data.id)
      .then(() => {
        handleGetEpisodeDetail(query)
          .then(() => {
            //
          })
          .catch((error) => {
            if (error) {
              setErrorMessage('エピソードを取得できませんでした')
            }
          })
      })
      .catch((error) => {
        if (error) {
          setErrorMessage('このエピソードは消すことができなかったみたいです。')
        }
      })
  }

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

        <EpisodeComments
          episodeComments={episodeData?.episodeComments}
          handleEpisodeCommentDelete={handleEpisodeCommentDelete}
          corderCurrentUser={corderCurrentUser}
        />

        <Button onClick={handleBack}>戻る</Button>
      </Paper>
    </Layout>
  )
}

export default EpisodeDetail
