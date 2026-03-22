import { Dock, DockIcon } from "@/components/ui/dock";
import { Link } from "react-router-dom";
import { AudioLines, Disc, Home, Images } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function FlootingDock() {
  return (
    <div className="pointer-events-none absolute left-1/5 xl:left-1/3 bottom-2 z-50 hidden -translate-y-1/2 md:flex">
      <TooltipProvider>
        <Dock
          direction="middle"
          className="pointer-events-auto mt-0 border-white/20 bg-black/55 shadow-[0_12px_28px_-12px_rgba(0,0,0,0.85)]"
        >
        <DockIcon>
          <Tooltip>
            <TooltipTrigger>
              <Link
                to="/console"
              >
                <Home className="size-6" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Home</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
        <DockIcon>
          <Tooltip>
            <TooltipTrigger>
              <Link
                to="/console/stations"
              >
                <Disc  className="size-6" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Stations</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
        <DockIcon>
          <Tooltip>
            <TooltipTrigger>
              <Link
                to="/console/songs"
              >
                <AudioLines className="size-6" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Songs</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
        <DockIcon>
          <Tooltip>
            <TooltipTrigger>
              <Link
                to="/console/backgrounds"
              >
                <Images className="size-6" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Backgrounds</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
        </Dock>
      </TooltipProvider>
    </div>
  )
}

export default FlootingDock
