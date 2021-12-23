import type { AxiosResponse } from 'axios'

import client from './client'

// Types
import type { EpisodeData } from '../../types/EpisodeData'

type getEpisodeListData = EpisodeData[]

// エピソード一覧
export const getEpisodeList = (): Promise<AxiosResponse<getEpisodeListData>> => {
  return client.get('/episodes')
}

type getEpisodeDetailData = {
  id: number
  content: string
}

// エピソード詳細
export const getEpisodeDetail = (id: string): Promise<AxiosResponse<getEpisodeDetailData>> => {
  return client.get(`/episodes/${id}`)
}

// エピソード新規作成
export const createEpisode = (params: { content: string }) => {
  return client.post('/episodes', params)
}

// エピソード更新
export const updateEpisode = ({ id, params }: { id: string; params: { content: string } }) => {
  return client.patch(`/episodes/${id}`, params)
}

// エピソード削除
export const deleteEpisode = (id: number) => {
  return client.delete(`/episodes/${id}`)
}
