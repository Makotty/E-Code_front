// React
import { useState, useEffect, useContext } from 'react'
import type { VFC } from 'react'

// React Router
import { useNavigate } from 'react-router-dom'

// Mui
import { Button } from '@mui/material'

// Components
import BaseLayout from '@components/BaseLayout'

// Containers
import EpisodeListCard from '@containers/EpisodeListCard'

// Contexts
import { AuthContext } from '@contexts/AuthContext'

// Lib
import { deleteEpisode, getEpisodeList } from '@lib/api/episode'

import type { EpisodeData } from '../types/EpisodeData'

const EpisodeList1: VFC = () => {
  const navigate = useNavigate()
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
    <BaseLayout>
      <h2>EpisodeList</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <Button
        onClick={() => {
          return navigate('/episode_create')
        }}
      >
        Episode Create
      </Button>

      <EpisodeListCard
        episodeDataList={episodeDataList}
        handleEpisodeDelete={handleEpisodeDelete}
        corderCurrentUser={corderCurrentUser}
        sliceStartNumber={-50}
      />
    </BaseLayout>
  )
}

export default EpisodeList1
