// React
import { useEffect, useState } from 'react'
import type { VFC } from 'react'

// React Router
import { Navigate, useNavigate } from 'react-router-dom'

// MUI
import { Avatar, Button } from '@mui/material'

// Js-Cookies
import Cookies from 'js-cookie'

// Firebase
import { AuthError, signOut } from 'firebase/auth'

// Contexts
import { useAuthContext } from '@contexts/AuthContext'
import { useOAuthContext } from '@contexts/OAuthContext'

// Components
import BaseLayout from '@components/BaseLayout'

// Containers
import EpisodeListCard from '@containers/EpisodeListCard'

// Lib
import { corderLogOut } from '@lib/api/auth'
import auth from '@lib/firebase'
import { deleteEpisode, getEpisodeList } from '@lib/api/episode'

// Types
import { EpisodeData } from '../types/EpisodeData'

const TimeLine: VFC = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const { isSignedIn, setIsSignedIn, corderCurrentUser } = useAuthContext()
  const { readerCurrentUser } = useOAuthContext()

  const handleReaderLogout = async () => {
    await signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate('/')
      })
      .catch((error: AuthError) => {
        // An error happened.
        setErrorMessage(error.message)
      })
  }

  const handleCorderSignOut = async () => {
    try {
      const response = await corderLogOut()

      if (response.data.success === true) {
        // ログアウト出来たらCookieを削除
        Cookies.remove('_access_token')
        Cookies.remove('_client')
        Cookies.remove('_uid')

        setIsSignedIn(false)

        window.location.reload()
      }
    } catch (error) {
      if (error) {
        setErrorMessage('何らかのエラーが発生しました')
      }
    }

    navigate('/')
  }

  const [episodeDataList, setEpisodeDataList] = useState<EpisodeData[] | undefined>([])

  const handleGetEpisodeList = async () => {
    await getEpisodeList()
      .then((response) => {
        setEpisodeDataList(response.data)
      })
      .catch((error) => {
        if (error) {
          setErrorMessage('エピソードを取得できませんでした。')
        }
      })
  }

  useEffect(() => {
    handleGetEpisodeList()
      .then(() => {
        //
      })
      .catch(() => {
        //
      })
  }, [])

  const handleEpisodeDelete = async (contents: EpisodeData) => {
    await deleteEpisode(contents.id)
      .then(() => {
        handleGetEpisodeList()
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

  if (!corderCurrentUser && !readerCurrentUser) {
    return <Navigate to="/" />
  }

  return (
    <BaseLayout>
      <h2>タイムライン</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {readerCurrentUser && (
        <Button variant="contained" onClick={handleReaderLogout}>
          ログアウト(Reader)
        </Button>
      )}

      {isSignedIn && corderCurrentUser && (
        <>
          <h2>Email: {corderCurrentUser?.email}</h2>
          <h2>Name: {corderCurrentUser?.name}</h2>
          <Avatar
            src={corderCurrentUser?.fileUrl}
            alt="アカウントアイコン"
            sx={{ width: 64, height: 64 }}
          />
          <h2>Name: {corderCurrentUser?.birthDay}</h2>
          <Button onClick={handleCorderSignOut}>ログアウト(Corder)</Button>
        </>
      )}

      <EpisodeListCard
        episodeDataList={episodeDataList}
        handleEpisodeDelete={handleEpisodeDelete}
        corderCurrentUser={corderCurrentUser}
        sliceStartNumber={-50}
      />
    </BaseLayout>
  )
}

export default TimeLine
