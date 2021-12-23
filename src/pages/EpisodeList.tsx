// React
import { useEffect, useState } from 'react'
import type { VFC } from 'react'

// React Router
import { Link } from 'react-router-dom'

// Mui
import { Button } from '@mui/material'

// Components
import BaseLayout from '@components/BaseLayout'

// Lib
import { getEpisodeList } from '@lib/api/episode'

import type { EpisodeData } from '../types/EpisodeData'

const EpisodeList: VFC = () => {
  const [episodeDataList, setEpisodeDataList] = useState<EpisodeData[] | undefined>([])

  const handleGetEpisodeList = async () => {
    try {
      const response = await getEpisodeList()
      setEpisodeDataList(response.data)
    } catch (error) {
      console.log(error)
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

  return (
    <BaseLayout>
      <h2>EpisodeList</h2>
      <Button>エピソード投稿</Button>
      {episodeDataList?.map((contents) => {
        const { id, content } = contents
        return (
          <div key={id}>
            <Link to={`/episode_list/${id}`}>
              <p>{content}</p>
            </Link>
            <Button component={Link} to={`/edit/${id}`}>
              更新
            </Button>
            <Button>削除</Button>
          </div>
        )
      })}
    </BaseLayout>
  )
}

export default EpisodeList
