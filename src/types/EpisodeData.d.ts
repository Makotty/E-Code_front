export type EpisodeData = {
  id: number
  content: string
  contributorName: string
  contributorImage: string
  episodeComments: Array<EpisodeCommentData> | null
  userId: number
}

export type EpisodeCommentData = {
  id: number
  content: string
  contributorName: string
  contributorImage: string
  createdAt: string
}
