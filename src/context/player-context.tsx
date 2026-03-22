/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import stationsData from '@/lib/lofi-stations.json'
import songsData from '@/lib/lofi-songs.json'
import type { Song, Station } from '@/types'

type ActiveSource = 'song' | 'station' | null

export interface QueueSong {
  id: number
  title: string
  url: string
  artist?: string
  artwork: string
}

interface PlayerContextValue {
  activeSource: ActiveSource
  currentSong: QueueSong | null
  songQueue: QueueSong[]
  currentSongIndex: number
  currentStation: Station | null
  liveStations: Station[]
  currentStationIndex: number
  currentUrl: string | null
  isPlaying: boolean
  volume: number
  muted: boolean
  playedSeconds: number
  durationSeconds: number
  seekToSeconds: number
  seekRequestVersion: number
  playSong: (song: QueueSong) => void
  playSongAtIndex: (index: number) => void
  playStation: (station: Station) => void
  playNext: () => void
  playPrevious: () => void
  setPlaying: (playing: boolean) => void
  togglePlay: () => void
  setVolume: (value: number) => void
  toggleMute: () => void
  seekTo: (seconds: number) => void
  setPlaybackMetrics: (played: number, duration?: number) => void
}

const liveStations = stationsData.stations.filter((station) => station.isLive) as Station[]
const firstStation = liveStations[0]
const defaultSongQueue = (songsData as Song[]).map((song) => ({
  id: song.id,
  title: song.title,
  artist: song.artists,
  url: song.file,
  artwork: song.coverImage,
})) as QueueSong[]

const PlayerContext = createContext<PlayerContextValue | null>(null)

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [activeSource, setActiveSource] = useState<ActiveSource>(firstStation ? 'station' : null)
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(defaultSongQueue.length > 0 ? 0 : -1)
  const [currentStation, setCurrentStation] = useState<Station | null>(firstStation ?? null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [volume, setVolumeState] = useState(0.8)
  const [muted, setMuted] = useState(false)
  const [playedSeconds, setPlayedSeconds] = useState(0)
  const [durationSeconds, setDurationSeconds] = useState(0)
  const [seekToSeconds, setSeekToSeconds] = useState(0)
  const [seekRequestVersion, setSeekRequestVersion] = useState(0)

  const songQueue = defaultSongQueue

  const currentSong = useMemo(() => {
    if (currentSongIndex < 0 || currentSongIndex >= songQueue.length) return null
    return songQueue[currentSongIndex]
  }, [songQueue, currentSongIndex])

  const currentStationIndex = useMemo(() => {
    if (!currentStation) return -1
    return liveStations.findIndex((station) => station.id === currentStation.id)
  }, [currentStation])

  const currentUrl = useMemo(() => {
    if (activeSource === 'song') return currentSong?.url ?? null
    if (activeSource === 'station') return currentStation?.url ?? null
    return null
  }, [activeSource, currentSong, currentStation])

  const playSong = (song: QueueSong) => {
    const queuedIndex = songQueue.findIndex((queuedSong) => queuedSong.id === song.id)

    if (queuedIndex < 0) return

    setCurrentSongIndex(queuedIndex)
    setActiveSource('song')
    setIsPlaying(true)
    setPlayedSeconds(0)
  }

  const playSongAtIndex = (index: number) => {
    if (songQueue.length === 0) return

    const safeIndex = Math.min(Math.max(index, 0), songQueue.length - 1)
    setCurrentSongIndex(safeIndex)
    setActiveSource('song')
    setIsPlaying(true)
    setPlayedSeconds(0)
  }

  const playNextSong = () => {
    if (songQueue.length === 0) return

    const nextIndex = currentSongIndex >= 0 ? (currentSongIndex + 1) % songQueue.length : 0
    setCurrentSongIndex(nextIndex)
    setActiveSource('song')
    setIsPlaying(true)
    setPlayedSeconds(0)
  }

  const playPreviousSong = () => {
    if (songQueue.length === 0) return

    const previousIndex =
      currentSongIndex >= 0
        ? (currentSongIndex - 1 + songQueue.length) % songQueue.length
        : 0

    setCurrentSongIndex(previousIndex)
    setActiveSource('song')
    setIsPlaying(true)
    setPlayedSeconds(0)
  }

  const playStation = (station: Station) => {
    setCurrentStation(station)
    setActiveSource('station')
    setIsPlaying(true)
    setPlayedSeconds(0)
  }

  const playNextStation = () => {
    if (liveStations.length === 0) return

    const nextIndex = currentStationIndex >= 0 ? (currentStationIndex + 1) % liveStations.length : 0
    setCurrentStation(liveStations[nextIndex])
    setActiveSource('station')
    setIsPlaying(true)
    setPlayedSeconds(0)
  }

  const playPreviousStation = () => {
    if (liveStations.length === 0) return

    const previousIndex =
      currentStationIndex >= 0
        ? (currentStationIndex - 1 + liveStations.length) % liveStations.length
        : 0

    setCurrentStation(liveStations[previousIndex])
    setActiveSource('station')
    setIsPlaying(true)
    setPlayedSeconds(0)
  }

  const playNext = () => {
    if (activeSource === 'song') {
      playNextSong()
      return
    }

    playNextStation()
  }

  const playPrevious = () => {
    if (activeSource === 'song') {
      playPreviousSong()
      return
    }

    playPreviousStation()
  }

  const setPlaying = (playing: boolean) => setIsPlaying(playing)

  const togglePlay = () => {
    setIsPlaying((prev) => !prev)
  }

  const setVolume = (value: number) => {
    const clamped = Math.min(1, Math.max(0, value))
    setVolumeState(clamped)

    if (clamped > 0 && muted) {
      setMuted(false)
    }
  }

  const toggleMute = () => {
    setMuted((prev) => !prev)
  }

  const seekTo = (seconds: number) => {
    const safeSeconds = Math.max(0, Math.min(seconds, durationSeconds || seconds))
    setSeekToSeconds(safeSeconds)
    setSeekRequestVersion((prev) => prev + 1)
    setPlayedSeconds(safeSeconds)
  }

  const setPlaybackMetrics = (played: number, duration?: number) => {
    setPlayedSeconds(Math.max(0, played))

    if (typeof duration === 'number' && !Number.isNaN(duration)) {
      setDurationSeconds(Math.max(0, duration))
    }
  }

  const value: PlayerContextValue = {
    activeSource,
    currentSong,
    songQueue,
    currentSongIndex,
    currentStation,
    liveStations,
    currentStationIndex,
    currentUrl,
    isPlaying,
    volume,
    muted,
    playedSeconds,
    durationSeconds,
    seekToSeconds,
    seekRequestVersion,
    playSong,
    playSongAtIndex,
    playStation,
    playNext,
    playPrevious,
    setPlaying,
    togglePlay,
    setVolume,
    toggleMute,
    seekTo,
    setPlaybackMetrics,
  }

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}

export function usePlayer() {
  const context = useContext(PlayerContext)

  if (!context) {
    throw new Error('usePlayer must be used within PlayerProvider')
  }

  return context
}
