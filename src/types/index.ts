
export interface Station {
  id: number
  index: number
  videoId: string
  title: string
  channel: string
  watching: string
  watchingLabel: string
  thumbnail: string
  url: string
  badge: string
  isLive: boolean
}

export interface Song {
  id: number
  title: string
  label: string
  coverImage: string
  file: string
  artists: string
}
