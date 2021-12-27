import type { VFC } from 'react'

// Mui
import { Avatar, Button } from '@mui/material'

// Interfaces
import { CorderUser } from '@interfaces/index'

import { EpisodeCommentData } from '../types/EpisodeCommentData'

type EpisodeCommentsProps = {
  episodeComments: EpisodeCommentData[] | null | undefined
  handleEpisodeCommentDelete: (data: EpisodeCommentData) => Promise<void>
  corderCurrentUser: CorderUser | undefined
}
const EpisodeComments: VFC<EpisodeCommentsProps> = (props) => {
  const { episodeComments, handleEpisodeCommentDelete, corderCurrentUser } = props

  return (
    <div>
      {episodeComments &&
        episodeComments.slice(-5).map((data: EpisodeCommentData) => {
          const { id, content, contributorName, contributorImage, createdAt, userId } = data
          const date = createdAt.toString().replace('T', ' ').split('.').shift()?.replace(/-/g, '/')

          return (
            <div key={id}>
              <div>
                <Avatar src={contributorImage} alt="コメント投稿者のアバター" />
                <p>{contributorName}</p>
                <p>{content}</p>
                <p>{date}</p>
              </div>
              {corderCurrentUser?.id === userId ? (
                <Button
                  onClick={() => {
                    return handleEpisodeCommentDelete(data)
                  }}
                >
                  削除
                </Button>
              ) : (
                <Button disabled>削除</Button>
              )}
            </div>
          )
        })}
    </div>
  )
}

export default EpisodeComments
