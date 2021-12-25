// React
import { useState, useEffect } from 'react'
import type { VFC } from 'react'

// React Router
import { useNavigate } from 'react-router-dom'

// Containers
import Layout from '@containers/Layout'

import EpisodeListCard from '@containers/EpisodeListCard'

// Contexts
import { useAuthContext } from '@contexts/AuthContext'

// Lib
import { deleteEpisode, getEpisodeList } from '@lib/api/episode'

import type { EpisodeData } from '../types/EpisodeData'

const EpisodeList1: VFC = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const { corderCurrentUser } = useAuthContext()

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

  return (
    <Layout>
      {errorMessage && <p>{errorMessage}</p>}

      <EpisodeListCard
        episodeDataList={episodeDataList}
        handleEpisodeDelete={handleEpisodeDelete}
        corderCurrentUser={corderCurrentUser}
        sliceStartNumber={-50}
      />
    </Layout>
  )
}

export default EpisodeList1
