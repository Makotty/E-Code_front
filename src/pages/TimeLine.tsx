// React
import { useEffect, useState } from 'react'
import type { VFC } from 'react'

// React Router
import { Navigate } from 'react-router-dom'

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
import { EpisodeData } from '../types/EpisodeData'

const TimeLine: VFC = () => {
  const [errorMessage, setErrorMessage] = useState('')

  const { corderCurrentUser } = useAuthContext()
  const { readerCurrentUser } = useOAuthContext()

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
        //
      })
      .catch(() => {
        //
      })
  }, [])

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

  if (!corderCurrentUser && !readerCurrentUser) {
    return <Navigate to="/" />
  }

  return (
    <Layout>
      <h2>タイムライン</h2>

      <EpisodeCreateButton />

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <EpisodeListCard
        episodeDataList={episodeDataList}
        handleEpisodeDelete={handleEpisodeDelete}
        corderCurrentUser={corderCurrentUser}
        sliceStartNumber={-50}
      />
    </Layout>
  )
}

export default TimeLine
