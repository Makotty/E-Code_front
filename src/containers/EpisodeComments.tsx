import { Avatar } from '@mui/material'
import type { VFC } from 'react'
import { EpisodeCommentData } from '../types/EpisodeCommentData'

type EpisodeCommentsProps = {
  episodeComments: EpisodeCommentData[] | null | undefined
}
const EpisodeComments: VFC<EpisodeCommentsProps> = (props) => {
  const { episodeComments } = props

  return (
    <div>
      {episodeComments &&
        episodeComments.slice(-5).map((data: EpisodeCommentData) => {
          const { id, content, contributorName, contributorImage, createdAt } = data
          const date = createdAt.toString().replace('T', ' ').split('.').shift()?.replace(/-/g, '/')

          return (
            <div key={id}>
              <Avatar src={contributorImage} alt="コメント投稿者のアバター" />
              <p>{contributorName}</p>
              <p>{content}</p>
              <p>{date}</p>
            </div>
          )
        })}
    </div>
  )
}

export default EpisodeComments
