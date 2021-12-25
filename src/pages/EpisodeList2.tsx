// React
import { useState, useEffect, useContext } from 'react'
import type { VFC } from 'react'

// React Router
import { useNavigate } from 'react-router-dom'

// Mui
import { Button } from '@mui/material'

// Components
import Layout from '@containers/Layout'

// Containers
import EpisodeListCard from '@containers/EpisodeListCard'

// Contexts
import { AuthContext } from '@contexts/AuthContext'

// Lib
import { deleteEpisode, getEpisodeList } from '@lib/api/episode'

import EpisodeCreateButton from '@containers/EpisodeCreateButton'
import type { EpisodeData } from '../types/EpisodeData'

const EpisodeList2: VFC = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const { corderCurrentUser } = useContext(AuthContext)

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

      <EpisodeCreateButton />

      <EpisodeListCard
        episodeDataList={episodeDataList}
        handleEpisodeDelete={handleEpisodeDelete}
        corderCurrentUser={corderCurrentUser}
        sliceStartNumber={-50}
        sliceEndNumber={-100}
      />
    </Layout>
  )
}

export default EpisodeList2
