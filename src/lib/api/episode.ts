import client from './client'

// エピソード一覧
export const getEpisodeList = () => {
  return client.get('/episodes')
}

// エピソード詳細
export const getEpisodeDetail = (id: string) => {
  return client.get(`/episodes/${id}`)
}

// エピソード新規作成
export const createEpisode = (params: string) => {
  return client.post('/episodes', params)
}

// エピソード更新
export const updateEpisode = ({
  id,
  params
}: {
  id: string
  params: string
}) => {
  return client.patch(`/episodes/${id}`, params)
}

// エピソード削除
export const deleteEpisode = (id: string) => {
  return client.delete(`/episodes/${id}`)
}
