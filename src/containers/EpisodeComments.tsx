import { Avatar } from '@mui/material'
import type { VFC } from 'react'
import { EpisodeCommentData } from '../types/EpisodeData'

type EpisodeCommentsProps = {
  episodeComments: EpisodeCommentData[] | null
}
const EpisodeComments: VFC<EpisodeCommentsProps> = (props) => {
  const { episodeComments } = props

  return (
    <div>
      {episodeComments &&
        episodeComments.slice(-5).map((data: EpisodeCommentData) => {
          const date = data.createdAt.replace('T', ' ').split('.').shift()?.replace(/-/g, '/')

          return (
            <div key={data.id}>
              <Avatar src={data.contributorImage} alt="コメント投稿者のアバター" />
              <p>{data.contributorName}</p>
              <p>{data.content}</p>
              <p>{date}</p>
            </div>
          )
        })}
    </div>
  )
}

export default EpisodeComments
