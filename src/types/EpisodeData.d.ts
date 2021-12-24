export type EpisodeData = {
  id: number
  content: string
  contributorName: string
  contributorImage: string
  episodeComments: Array<EpisodeCommentsData> | null
  userId: number
}

export type EpisodeCommentsData = {
  id: number
  content: string
}
