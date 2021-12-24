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

const EpisodeList: VFC = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const { corderCurrentUser } = useContext(AuthContext)

  const [episodeDataList, setEpisodeDataList] = useState<EpisodeData[] | undefined>([])

  const handleGetEpisodeList = async () => {
    try {
      const response = await getEpisodeList()
      setEpisodeDataList(response.data)
    } catch (error) {
      if (error) {
        setErrorMessage('何らかのエラーが発生しました')
      }
    }
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
    try {
      await deleteEpisode(contents.id)

      handleGetEpisodeList()
        .then(() => {
          //
        })
        .catch(() => {
          //
        })
    } catch (error) {
      if (error) {
        setErrorMessage('何らかのエラーが発生しました')
      }
    }
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
      />
    </BaseLayout>
  )
}

export default EpisodeList
