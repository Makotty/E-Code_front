// React
import { useState, useEffect, useContext, useMemo, useCallback } from 'react'
import type { VFC } from 'react'

// React Router
import { Navigate, useNavigate } from 'react-router-dom'

// Mui
import { Button } from '@mui/material'
// Containers
import Layout from '@containers/Layout'

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
      await deleteEpisode(contents.id)
        .then(() => {
          handleGetUserEpisodes()
            .then(() => {
              //
            })
            .catch((error) => {
              if (error) {
                setErrorMessage('エピソードを取得できませんでした')
              }
            })
        })
        .catch((error) => {
          if (error) {
            setErrorMessage('このエピソードは消すことができなかったみたいです。')
          }
        })
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
    <Layout>
      <h1>{corderCurrentUser?.name}の投稿一覧</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          return navigate('/timeline')
        }}
      >
        戻る
      </Button>
      <UserEpisodeCard />
    </Layout>
  )
}

export default UserEpisodeList
