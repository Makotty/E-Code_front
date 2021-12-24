// React
import { useState, useEffect, useContext, useMemo, useCallback } from 'react'
import type { VFC } from 'react'

// React Router
import { Navigate, useNavigate } from 'react-router-dom'

// Mui
import { Button } from '@mui/material'

// Components
import BaseLayout from '@components/BaseLayout'

// Containers
import EpisodeListCard from '@containers/EpisodeListCard'

// Contexts
import { AuthContext } from '@contexts/AuthContext'
import { OAuthContext } from '@contexts/OAuthContext'

// Lib
import { deleteEpisode } from '@lib/api/episode'
import getUserEpisodes from '@lib/api/user_episode'

// Types
import { EpisodeData } from 'src/types/EpisodeData'

const UserEpisodeList: VFC = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const { isSignedIn, corderCurrentUser } = useContext(AuthContext)
  const { readerCurrentUser } = useContext(OAuthContext)

  const [userEpisodes, setUserEpisodes] = useState<EpisodeData[] | undefined>([])

  const handleGetUserEpisodes = useCallback(async () => {
    if (corderCurrentUser?.id) {
      if (isSignedIn) {
        const response = await getUserEpisodes(corderCurrentUser?.id)
        setUserEpisodes(response.data)
      } else {
        return <Navigate to="/corder_login" />
      }
    }
    return false
  }, [corderCurrentUser?.id, isSignedIn])

  const handleEpisodeDelete = useMemo(() => {
    return async (contents: EpisodeData) => {
      try {
        await deleteEpisode(contents.id)

        handleGetUserEpisodes()
          .then(() => {
            //
          })
          .catch(() => {
            //
          })
      } catch (error) {
        if (error) {
          setErrorMessage('何らかのエラーが発生しました')
        }
      }
    }
  }, [handleGetUserEpisodes])

  useEffect(() => {
    handleGetUserEpisodes()
      .then(() => {
        //
      })
      .catch(() => {
        //
      })
  }, [corderCurrentUser, handleGetUserEpisodes])

  const UserEpisodeCard = () => {
    return useMemo(() => {
      if (userEpisodes) {
        if (userEpisodes?.length >= 1) {
          return (
            <EpisodeListCard
              episodeDataList={userEpisodes}
              handleEpisodeDelete={handleEpisodeDelete}
              corderCurrentUser={corderCurrentUser}
            />
          )
        }
      }
      return <h2>エピソードがありません</h2>
    }, [])
  }

  if (readerCurrentUser) {
    return <Navigate to="/timeline" />
  }

  return (
    <BaseLayout>
      <h1>{corderCurrentUser?.name}の投稿一覧</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          return navigate('/episode_list')
        }}
      >
        戻る
      </Button>
      <UserEpisodeCard />
    </BaseLayout>
  )
}

export default UserEpisodeList
