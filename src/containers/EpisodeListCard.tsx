// React
import type { VFC } from 'react'

// React Router
import { Link } from 'react-router-dom'

// Mui
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button } from '@mui/material'

// Containers
import EpisodeComments from '@containers/EpisodeComments'

// Interfaces
import { CorderUser } from '@interfaces/index'

// Types
import { EpisodeData } from '../types/EpisodeData'

type EpisodeListCardProps = {
  episodeDataList: EpisodeData[] | undefined
  handleEpisodeDelete: (contents: EpisodeData) => Promise<void>
  corderCurrentUser: CorderUser | undefined

  sliceStartNumber?: number | undefined
  sliceEndNumber?: number | undefined
}

const EpisodeListCard: VFC<EpisodeListCardProps> = (props) => {
  const {
    episodeDataList,
    handleEpisodeDelete,
    corderCurrentUser,
    sliceStartNumber,
    sliceEndNumber
  } = props

  return (
    <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
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
              <h3>{contributorName}</h3>
              <Avatar
                src={contributorImage}
                alt="アカウントアイコン"
                sx={{ width: 64, height: 64 }}
              />
            </AccordionSummary>

            <AccordionDetails>
              <Link to={`/episode_detail/${id}`}>
                <p>{content}</p>
              </Link>
              <p>{date}</p>

              <EpisodeComments episodeComments={episodeComments} />

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
            </AccordionDetails>
          </Accordion>
        )
      })}
    </div>
  )
}

export default EpisodeListCard
