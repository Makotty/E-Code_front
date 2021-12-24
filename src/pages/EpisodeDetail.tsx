// React
import { useEffect, useState } from 'react'
import type { VFC } from 'react'

// React Router
import { useNavigate, useParams } from 'react-router-dom'
import type { Params } from 'react-router-dom'

// Mui
import { Button } from '@mui/material'

// Components
import BaseLayout from '@components/BaseLayout'

// Lib
import { getEpisodeDetail } from '@lib/api/episode'

// Types
import { EpisodeData } from '../types/EpisodeData'

const EpisodeDetail: VFC = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const [episodeData, setEpisodeData] = useState<EpisodeData | undefined>()
  const query = useParams()

  const handleGetEpisodeDetail = async (data: Readonly<Params<string>>) => {
    const { id } = data

    if (id) {
      try {
        const respone = await getEpisodeDetail(id)
        setEpisodeData(respone.data)
      } catch (error) {
        if (error) {
          setErrorMessage('何らかのエラーが発生しました')
        }
      }
    }
  }

  useEffect(() => {
    handleGetEpisodeDetail(query)
      .then(() => {
        //
      })
      .catch(() => {
        //
      })
  }, [query])

  const handleBack = () => {
    navigate('/episode_list')
  }

  return (
    <BaseLayout>
      <h2>Episode Detail</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <div>ID:{episodeData?.id}</div>
      <div>Content:{episodeData?.content}</div>

      <Button onClick={handleBack}>戻る</Button>
    </BaseLayout>
  )
}

export default EpisodeDetail
