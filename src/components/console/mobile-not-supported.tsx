import { Link } from "react-router-dom"
import { Smartphone, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

const MobileNotSupported = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 bg-radial from-amber-900/20 via-background to-background" />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-6 text-center">
        <div className="rounded-full border border-border/60 bg-card/60 p-3 backdrop-blur-sm mb-6">
          <Smartphone className="h-7 w-7 text-primary" />
        </div>

        <div className="space-y-4">
          <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Desktop & Tablets Only
          </h1>
          <p className="max-w-sm text-muted-foreground text-base sm:text-lg">
            lofiSpace is optimized for desktop and tablet experiences. Open this on a larger screen to enjoy the full lofi vibes.
          </p>
        </div>

        <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto">
              <ArrowLeft className="h-4 w-4" />
              Back Home
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default MobileNotSupported
