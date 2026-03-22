import { Radio } from 'lucide-react'
import { usePlayer } from '@/context/player-context'
import CustomImage from '@/components/ui/custom-image'
import { TooltipProvider } from '@/components/ui/tooltip'
import TruncatedText from '@/components/ui/truncated-text'

function ConsoleStations() {
  const { playStation, currentStation, liveStations } = usePlayer()
  const stations = liveStations

  return (
    <div className="p-2 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Live Lofi Stations</h1>
        <p className="text-sm text-muted-foreground">{stations.length} live channels</p>
      </div>

      <TooltipProvider delay={150}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {stations.length > 0 ? (
          stations.map((station) => (
            <button
              type="button"
              key={station.id}
              onClick={() => playStation(station)}
              className="group relative overflow-hidden rounded-2xl border border-white/15 bg-black/30 text-left"
            >
              <CustomImage
                src={station.thumbnail}
                alt={station.title}
                fallbackSrc="https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg"
                loading="lazy"
                showLoader={false}
                className="aspect-video"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent opacity-75 transition group-hover:opacity-90" />

              <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-red-400/50 bg-red-500/20 px-2 py-1 text-xs font-semibold text-red-100">
                <Radio className="h-3.5 w-3.5" />
                {station.badge}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="mb-1 text-xs uppercase tracking-wide text-white/70">#{station.index}</p>
                <TruncatedText text={station.title} className="text-base font-semibold leading-tight" />
                <TruncatedText text={station.channel} className="mt-1 text-sm text-gray-300" triggerClassName="mt-1" />
                <div className="mt-2 flex min-w-0 items-center justify-between gap-2 text-xs text-gray-300">
                  <div className="min-w-0 max-w-[65%]">
                    <TruncatedText text={station.watchingLabel} />
                  </div>
                  <p
                    className="rounded-md border border-white/20 bg-black/30 px-2 py-1 text-white transition hover:bg-black/50"
                  >
                    Listen
                  </p>
                </div>
                {currentStation?.id === station.id ? (
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-emerald-300">Now Playing</p>
                ) : null}
              </div>
            </button>
          ))
        ) : (
          <div className="col-span-full py-12 text-center">
            <p className="text-lg text-gray-400">No live stations found</p>
          </div>
        )}
      </div>
      </TooltipProvider>
    </div>
  )
}

export default ConsoleStations
