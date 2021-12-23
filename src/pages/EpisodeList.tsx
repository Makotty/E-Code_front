// React
import { useEffect, useState } from 'react'
import type { VFC } from 'react'

// React Router
import { Link } from 'react-router-dom'

import { getEpisodeList } from '@lib/api/episode'
import { Button } from '@mui/material'

import type { EpisodeDataList } from '../types/EpisodeDataList'

const EpisodeList: VFC = () => {
  const [episodeDataList, setEpisodeDataList] = useState<
    EpisodeDataList[] | undefined
  >([])

  const handleGetList = async () => {
    try {
      const response = await getEpisodeList()
      setEpisodeDataList(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetList()
      .then(() => {
        //
      })
      .catch(() => {
        //
      })
  }, [])

  return (
    <>
      <h1>EpisodeList</h1>
      <Button>エピソード投稿</Button>
      {episodeDataList?.map((contents) => {
        const { id, content } = contents
        return (
          <div key={id}>
            <Link to={`/post/${id}`}>
              <p>{content}</p>
            </Link>
            <Button component={Link} to={`/edit/${id}`}>
              更新
            </Button>
            <Button>削除</Button>
          </div>
        )
      })}
    </>
  )
}

export default EpisodeList
