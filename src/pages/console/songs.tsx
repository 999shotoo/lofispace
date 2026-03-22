import { usePlayer } from '@/context/player-context'
import CustomImage from '@/components/ui/custom-image'
import { TooltipProvider } from '@/components/ui/tooltip'
import TruncatedText from '@/components/ui/truncated-text'

function ConsoleSongs() {
  const { songQueue, currentSong, activeSource, playSongAtIndex } = usePlayer()

  return (
    <div className="p-2 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Lofi Songs</h1>
        <p className="text-sm text-muted-foreground">{songQueue.length} tracks</p>
      </div>

      <TooltipProvider delay={150}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {songQueue.length > 0 ? (
            songQueue.map((song, index) => (
              <button
                type="button"
                key={song.id}
                onClick={() => playSongAtIndex(index)}
                className="group relative overflow-hidden rounded-2xl border border-white/15 bg-black/30 text-left"
              >
                <CustomImage
                  src={song.artwork ?? 'https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg'}
                  alt={song.title}
                  fallbackSrc="https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg"
                  loading="lazy"
                  showLoader={false}
                  className="aspect-square"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent opacity-75 transition group-hover:opacity-90" />

                <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-emerald-400/50 bg-emerald-500/20 px-2 py-1 text-xs font-semibold text-emerald-100">
                  SONG
                </div>
                {activeSource === 'song' && currentSong?.id === song.id ? (
                  <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-emerald-400/50 bg-emerald-500/20 px-2 py-1 text-xs font-semibold text-emerald-100">
                    Now Playing
                  </div>
                ) : null}

                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="flex items-center justify-between  gap-1">
                    <div>
                      <TruncatedText text={song.title} className="text-base font-semibold leading-tight" />
                      <TruncatedText text={song.artist ?? 'Unknown artist'} className="mt-1 text-sm text-gray-300" triggerClassName="mt-1" />
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-gray-300">
                      <span className="rounded-md border border-white/20 bg-black/30 px-2 py-1 text-white transition group-hover:bg-black/50">
                        Play
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-lg text-gray-400">No songs found</p>
            </div>
          )}
        </div>
      </TooltipProvider>
    </div>
  )
}

export default ConsoleSongs
