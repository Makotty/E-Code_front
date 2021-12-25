import type { VFC } from 'react'
import { EpisodeCommentsData } from 'src/types/EpisodeData'

type EpisodeCommentsProps = {
  episodeComments: EpisodeCommentsData[] | null
}
const EpisodeComments: VFC<EpisodeCommentsProps> = (props) => {
  const { episodeComments } = props

  return (
    <div>
      {episodeComments &&
        episodeComments.slice(-5).map((data: EpisodeCommentsData) => {
          return <p key={data.id}>{data.content}</p>
        })}
    </div>
  )
}

export default EpisodeComments
