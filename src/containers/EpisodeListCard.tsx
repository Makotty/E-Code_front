import { CorderUser } from '@interfaces/index'
import { Button, Paper, Stack } from '@mui/material'
import type { VFC } from 'react'
import { Link } from 'react-router-dom'
import { EpisodeData } from '../types/EpisodeData'

type EpisodeListCardProps = {
  episodeDataList: EpisodeData[] | undefined
  handleEpisodeDelete: (contents: EpisodeData) => Promise<void>
  corderCurrentUser: CorderUser | undefined
}

const EpisodeListCard: VFC<EpisodeListCardProps> = (props) => {
  const { episodeDataList, handleEpisodeDelete, corderCurrentUser } = props

  return (
    <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
      <Stack spacing={3}>
        {episodeDataList?.map((contents: EpisodeData) => {
          const { id, content, userId } = contents
          return (
            <Paper key={id}>
              <Link to={`/episode_list/${id}`}>
                <p>{content}</p>
              </Link>
              {corderCurrentUser?.id === userId ? (
                <Button component={Link} to={`/episode_edit/${id}`}>
                  更新
                </Button>
              ) : (
                <Button disabled>更新</Button>
              )}
              {corderCurrentUser?.id === userId ? (
                <Button
                  onClick={() => {
                    return handleEpisodeDelete(contents)
                  }}
                >
                  削除
                </Button>
              ) : (
                <Button disabled>削除</Button>
              )}
            </Paper>
          )
        })}
      </Stack>
    </div>
  )
}

export default EpisodeListCard
