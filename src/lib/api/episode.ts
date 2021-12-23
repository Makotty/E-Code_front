import type { SetStateAction } from 'react'
import type { AxiosResponse } from 'axios'

import client from './client'

// Types
import type { EpisodeData } from '../../types/EpisodeData'

type getEpisodeListData = SetStateAction<EpisodeData[] | undefined>

// エピソード一覧
export const getEpisodeList = (): Promise<AxiosResponse<getEpisodeListData>> => {
  return client.get('/episodes')
}

type getEpisodeDetailData = SetStateAction<EpisodeData | undefined>

// エピソード詳細
export const getEpisodeDetail = (id: number): Promise<AxiosResponse<getEpisodeDetailData>> => {
  return client.get(`/episodes/${id}`)
}

// エピソード新規作成
export const createEpisode = (params: string) => {
  return client.post('/episodes', params)
}

// エピソード更新
export const updateEpisode = ({ id, params }: { id: string; params: string }) => {
  return client.patch(`/episodes/${id}`, params)
}

// エピソード削除
export const deleteEpisode = (id: number) => {
  return client.delete(`/episodes/${id}`)
}
