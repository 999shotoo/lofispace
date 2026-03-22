import { usePlayer } from '@/context/player-context'
import { SkipForward, SkipBack, Play, Pause, Volume2, VolumeX, Radio, Music2 } from 'lucide-react'
import { Slider } from '@/components/ui/slider'
import CustomImage from '@/components/ui/custom-image'
import { TooltipProvider } from '@/components/ui/tooltip'
import TruncatedText from '@/components/ui/truncated-text'
import { ScrollArea } from '../ui/scroll-area'

function formatTime(totalSeconds: number) {
  const safe = Math.max(0, Math.floor(totalSeconds || 0))
  const mins = Math.floor(safe / 60)
  const secs = safe % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function sliderValueToNumber(value: number | readonly number[]) {
  return Array.isArray(value) ? (value[0] ?? 0) : value
}

function SidebarPlayer() {
  const {
    activeSource,
    currentStation,
    currentSong,
    songQueue,
    currentSongIndex,
    liveStations,
    currentStationIndex,
    isPlaying,
    togglePlay,
    playNext,
    playPrevious,
    playSong,
    playStation,
    volume,
    muted,
    setVolume,
    toggleMute,
    playedSeconds,
    durationSeconds,
    seekTo,
  } = usePlayer()

  const title = activeSource === 'song' ? currentSong?.title : currentStation?.title
  const subtitle = activeSource === 'song' ? currentSong?.artist : currentStation?.channel
  const info = activeSource === 'song' ? 'Song mode' : currentStation?.watchingLabel
  const image =
    activeSource === 'song'
      ? currentSong?.artwork
      : currentStation?.thumbnail

  return (
    <>
      <h2 className="mb-2 sm:mb-3 pt-1 md:mb-4 gap-2 flex text-xs sm:text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {activeSource === 'song' ? <Music2 className="h-3 w-3 sm:h-4 sm:w-4" /> : <Radio className="h-3 w-3 sm:h-4 sm:w-4" />}
        <div className="min-w-0 max-w-48 sm:max-w-60">
          <TruncatedText text={info ?? 'No listeners yet'} />
        </div>
      </h2>
      
      <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/15 bg-black/30 p-1 sm:p-2">
        <CustomImage
          src={image ?? 'https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg'}
          alt={title ?? 'Lofi station'}
          fallbackSrc="https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg"
          className="aspect-square rounded-lg sm:rounded-xl shadow-xl"
        />
        <div className="absolute inset-1.5 sm:inset-2 flex items-end rounded-lg sm:rounded-xl bg-linear-to-t from-black/70 via-black/20 to-transparent p-2 sm:p-3">
          <span className="rounded-full border border-white/25 bg-black/40 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[9px] sm:text-[11px] font-semibold text-white">
            {isPlaying ? 'Now Playing' : 'Paused'}
          </span>
        </div>
      </div>

      <TooltipProvider delay={150}>
        <div className="mt-2 sm:mt-3">
          <TruncatedText text={title ?? 'Select a station'} className="text-start text-base sm:text-lg md:text-xl font-semibold" />
          <TruncatedText text={subtitle ?? 'No source selected'} className="text-start text-xs sm:text-sm md:text-base text-muted-foreground" />
        </div>

        {activeSource === 'song' ? (
          <div className="mt-2.5 sm:mt-4 space-y-1.5 sm:space-y-2 rounded-lg sm:rounded-xl border border-white/10 bg-black/20 p-2 sm:p-3">
            <Slider
              min={0}
              max={durationSeconds > 0 ? durationSeconds : 0}
              value={[durationSeconds > 0 ? Math.min(playedSeconds, durationSeconds) : 0]}
              onValueChange={(values) => seekTo(sliderValueToNumber(values))}
              className="w-full rounded-full bg-accent p-0.5 sm:p-1 mt-1 sm:mt-2"
            />
            <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground">
              <span>{formatTime(playedSeconds)}</span>
              <span>{formatTime(durationSeconds)}</span>
            </div>
          </div>
        ) : null}

        <div className="mt-2.5 sm:mt-4 space-y-2 sm:space-y-3 rounded-lg sm:rounded-xl border border-white/10 bg-black/20 p-2 sm:p-3">
          <div className="flex items-center gap-1.5 sm:gap-2 justify-center">
            <button
              type="button"
              onClick={playPrevious}
              className="inline-flex h-8 sm:h-9 w-8 sm:w-9 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white transition hover:bg-black/50"
              aria-label="Previous"
            >
              <SkipBack className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>

            <button
              type="button"
              onClick={togglePlay}
              className="inline-flex h-8 sm:h-9 w-8 sm:w-9 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white transition hover:bg-black/50"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            </button>

            <button
              type="button"
              onClick={playNext}
              className="inline-flex h-8 sm:h-9 w-8 sm:w-9 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white transition hover:bg-black/50"
              aria-label="Next"
            >
              <SkipForward className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              type="button"
              onClick={toggleMute}
              className="inline-flex h-6 sm:h-7 w-6 sm:w-7 items-center justify-center rounded-full text-white/90 transition hover:bg-white/10"
              aria-label={muted ? 'Unmute' : 'Mute'}
            >
              {muted ? <VolumeX className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <Volume2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            </button>
            <Slider
              className="w- p-0.5 sm:p-1 rounded-full bg-accent"
              value={[Math.round(volume * 100)]}
              max={100}
              step={1}
              onValueChange={(values) => setVolume(sliderValueToNumber(values) / 100)}
            />
            <span className="w-6 sm:w-8 text-right text-[8px] sm:text-[10px] tabular-nums text-muted-foreground">{Math.round(volume * 100)}%</span>
          </div>
        </div>

        {activeSource === 'song' ? (
          <div className="mt-2.5 sm:mt-4 space-y-3 sm:space-y-4 border-t border-white/10 pt-2 sm:pt-3">
            <div>
              <h4 className="mb-1.5 sm:mb-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-muted-foreground">Song Queue</h4>
              <ScrollArea className="h-48 sm:h-60">
                {songQueue.length > 0 ? (
                  songQueue.map((song, index) => {
                    const isCurrent = currentSongIndex === index

                    return (
                      <button
                        key={song.id}
                        type="button"
                        onClick={() => playSong(song)}
                        className={`w-full my-0.5 sm:my-1 rounded-lg border px-1.5 sm:px-2 py-1 sm:py-1.5 text-[10px] sm:text-xs transition text-start ${isCurrent
                          ? 'border-emerald-300/40 bg-emerald-500/10 text-emerald-200'
                          : 'border-white/10 bg-black/20 text-muted-foreground hover:bg-black/35'
                          }`}
                      >
                        <TruncatedText text={song.title} className="font-medium text-white" />
                        <TruncatedText text={song.artist ?? 'Unknown artist'} className="text-[9px] sm:text-[11px] text-muted-foreground" />
                      </button>
                    )
                  })
                ) : (
                  <p className="text-[10px] sm:text-xs text-muted-foreground">No songs in queue yet</p>
                )}
              </ScrollArea>
            </div>
          </div>
        ) : (
          <div className="mt-2.5 sm:mt-4 space-y-3 sm:space-y-4 border-t border-white/10 pt-2 sm:pt-3">
            <div>
              <h4 className="mb-1.5 sm:mb-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-muted-foreground">Station Queue</h4>
              <ScrollArea className="h-56 sm:h-80">
                {liveStations.map((station, index) => {
                  const isCurrent = currentStationIndex === index && activeSource === 'station'

                  return (
                    <button
                      key={station.id}
                      type="button"
                      onClick={() => playStation(station)}
                      className={`w-full rounded-lg border my-0.5 sm:my-1 px-1.5 sm:px-2 py-1 sm:py-1.5 text-[10px] sm:text-xs transition text-start ${isCurrent
                        ? 'border-cyan-300/40 bg-cyan-500/10 text-cyan-200'
                        : 'border-white/10 bg-black/20 text-muted-foreground hover:bg-black/35'
                        }`}
                    >
                      <TruncatedText text={station.title} className="font-medium text-white" />
                      <TruncatedText text={station.watchingLabel} className="text-[9px] sm:text-[11px] text-muted-foreground" />
                    </button>
                  )
                })}
              </ScrollArea>
            </div>
          </div>
        )}
      </TooltipProvider>
    </>
  )
}

export default SidebarPlayer
