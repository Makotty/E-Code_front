// React
import { useEffect, useState } from 'react'
import type { VFC } from 'react'

// React Router
import { useNavigate } from 'react-router-dom'

// Contexts
import { useAuthContext } from '@contexts/AuthContext'
import { useOAuthContext } from '@contexts/OAuthContext'

// Components
import Layout from '@containers/Layout'

// Containers
import EpisodeListCard from '@containers/EpisodeListCard'

// Lib

import { deleteEpisode, getEpisodeList } from '@lib/api/episode'

// Types
import EpisodeCreateButton from '@containers/EpisodeCreateButton'
import { EpisodeCommentData } from 'src/types/EpisodeCommentData'
import { deleteEpisodeComment } from '@lib/api/episode_comment'
import { EpisodeData } from '../types/EpisodeData'

const TimeLine: VFC = () => {
  const { corderCurrentUser } = useAuthContext()
  const { readerCurrentUser } = useOAuthContext()
  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState('')

  const [episodeDataList, setEpisodeDataList] = useState<EpisodeData[] | undefined>([])

  const handleGetEpisodeList = async () => {
    await getEpisodeList()
      .then((response) => {
        setEpisodeDataList(response.data)
      })
      .catch((error) => {
        if (error) {
          setErrorMessage('エピソードを取得できませんでした。')
        }
      })
  }

  useEffect(() => {
    handleGetEpisodeList()
      .then(() => {
        if (!corderCurrentUser && !readerCurrentUser) {
          navigate('/')
        }
      })
      .catch(() => {
        //
      })
  }, [corderCurrentUser, readerCurrentUser, navigate])

  const handleEpisodeDelete = async (contents: EpisodeData) => {
    await deleteEpisode(contents.id)
      .then(() => {
        handleGetEpisodeList()
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

  const handleEpisodeCommentDelete = async (data: EpisodeCommentData) => {
    await deleteEpisodeComment(data.id)
      .then(() => {
        handleGetEpisodeList()
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

  return (
    <Layout>
      <EpisodeCreateButton />

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <EpisodeListCard
        episodeDataList={episodeDataList}
        handleEpisodeDelete={handleEpisodeDelete}
        handleEpisodeCommentDelete={handleEpisodeCommentDelete}
        corderCurrentUser={corderCurrentUser}
        sliceStartNumber={-50}
      />
    </Layout>
  )
}

export default TimeLine
