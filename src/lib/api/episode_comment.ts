// Cookies
import Cookies from 'js-cookie'

import client from './client'

// エピソードコメント新規作成
const createEpisodeComment = (params: {
  content: string
  episodeId: number
  contributorName: string
  contributorImage: string
}) => {
  return client.post('/episode_comments', params, {
    headers: {
      'access-token': Cookies.get('_access_token') ?? '',
      client: Cookies.get('_client') ?? '',
      uid: Cookies.get('_uid') ?? ''
    }
  })
}

export default createEpisodeComment
