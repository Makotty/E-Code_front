// React
import type { VFC } from 'react'

// React Router
import { Link } from 'react-router-dom'

// Mui
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, Stack } from '@mui/material'

// Containers
import EpisodeComments from '@containers/EpisodeComments'

// Interfaces
import { CorderUser } from '@interfaces/index'

// Types
import { EpisodeCommentData } from '../types/EpisodeCommentData'
import { EpisodeData } from '../types/EpisodeData'

type EpisodeListCardProps = {
  episodeDataList: EpisodeData[] | undefined
  handleEpisodeDelete: (contents: EpisodeData) => Promise<void>
  handleEpisodeCommentDelete: (data: EpisodeCommentData) => Promise<void>
  corderCurrentUser: CorderUser | undefined

  sliceStartNumber?: number | undefined
  sliceEndNumber?: number | undefined
}

const EpisodeListCard: VFC<EpisodeListCardProps> = (props) => {
  const {
    episodeDataList,
    handleEpisodeDelete,
    handleEpisodeCommentDelete,
    corderCurrentUser,
    sliceStartNumber,
    sliceEndNumber
  } = props

  return (
    <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
      <Stack spacing={4}>
        {episodeDataList?.slice(sliceStartNumber, sliceEndNumber).map((contents: EpisodeData) => {
          const {
            id,
            content,
            contributorName,
            contributorImage,
            userId,
            episodeComments,
            createdAt
          } = contents

          const date = createdAt.toString().replace('T', ' ').split('.').shift()?.replace(/-/g, '/')

          return (
            <Accordion key={id}>
              <AccordionSummary>
                <div>
                  <h3>{contributorName}</h3>
                  <Avatar
                    src={contributorImage}
                    alt="アカウントアイコン"
                    sx={{ width: 64, height: 64 }}
                  />
                  <Link to={`/episode_detail/${id}`}>
                    <p>{content}</p>
                  </Link>
                  <p>{date}</p>
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
                </div>
              </AccordionSummary>

              <AccordionDetails>
                <EpisodeComments
                  corderCurrentUser={corderCurrentUser}
                  episodeComments={episodeComments}
                  handleEpisodeCommentDelete={handleEpisodeCommentDelete}
                />
              </AccordionDetails>
            </Accordion>
          )
        })}
      </Stack>
    </div>
  )
}

export default EpisodeListCard
