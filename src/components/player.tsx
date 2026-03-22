import ReactPlayer from 'react-player'
import { usePlayer } from '@/context/player-context'
import { useEffect, useRef } from 'react'

function MainPlayer() {
  const {
    currentUrl,
    isPlaying,
    setPlaying,
    volume,
    muted,
    playNext,
    seekToSeconds,
    seekRequestVersion,
    setPlaybackMetrics,
  } = usePlayer()
  const playerRef = useRef<HTMLVideoElement | null>(null)
  const hasStartedPlaybackRef = useRef(false)

  useEffect(() => {
    if (!playerRef.current) return
    playerRef.current.currentTime = seekToSeconds
  }, [seekRequestVersion, seekToSeconds])

  useEffect(() => {
    hasStartedPlaybackRef.current = false

    if (!currentUrl || !isPlaying) return

    const autoplayGuardTimeout = window.setTimeout(() => {
      if (!hasStartedPlaybackRef.current) {
        setPlaying(false)
      }
    }, 1200)

    return () => window.clearTimeout(autoplayGuardTimeout)
  }, [currentUrl, isPlaying, setPlaying])

  return (
    <div className="w-full hidden">
      {currentUrl ? (
        <ReactPlayer
          ref={playerRef}
          controls
          playing={isPlaying}
          src={currentUrl}
          volume={volume}
          muted={muted}
          width="100%"
          height="100%"
          onPause={() => {
            hasStartedPlaybackRef.current = false
            setPlaying(false)
          }}
          onPlaying={() => {
            hasStartedPlaybackRef.current = true
            setPlaying(true)
          }}
          onEnded={playNext}
          onError={playNext}
          onDurationChange={(event) => {
            const duration = Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0
            setPlaybackMetrics(event.currentTarget.currentTime, duration)
          }}
          onTimeUpdate={(event) => setPlaybackMetrics(event.currentTarget.currentTime)}
        />
      ) : (
        <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-white/15 bg-black/30 text-sm text-muted-foreground">
          Select a station to start playing
        </div>
      )}
    </div>
  )
}

export default MainPlayer
