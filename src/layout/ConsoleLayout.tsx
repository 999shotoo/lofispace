
import FlootingDock from "@/components/console/flooting-dock";
import SidebarPlayer from "@/components/console/sidebar-player";
import MainPlayer from "@/components/player";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileNotSupported from "@/components/console/mobile-not-supported";

export function ConsoleLayout() {
  const location = useLocation()
  const isMobile = useIsMobile()


  // Show mobile-not-supported message on mobile devices
  if (isMobile) {
    return <MobileNotSupported />
  }

  return (
    <div className="relative mx-auto h-screen w-full overflow-hidden p-1.5 sm:p-2 md:p-3">
      {/* Responsive layout: stacked on mobile, grid on md+ */}
      <div className="grid h-full gap-1.5 sm:gap-2 md:gap-3 grid-cols-1 sm:grid-cols-[1fr_280px] md:grid-cols-[1fr_260px] lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px]">
        {/* Main content area */}
        <main className="h-full overflow-hidden rounded-2xl sm:rounded-3xl backdrop-blur-sm">
          <ScrollArea className="h-full w-full rounded-2xl sm:rounded-3xl">
            <div className="relative h-full">
              <AnimatePresence mode="sync" initial={false}>
                <motion.div
                  key={location.pathname}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="h-full">
                    <Outlet />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </ScrollArea>
        </main>

        {/* Responsive sidebar - visible on sm+ */}
        <aside className="h-full overflow-hidden rounded-2xl sm:rounded-3xl bg-card/80 p-2.5 sm:p-3 md:p-4">
          <ScrollArea className="h-full w-full rounded-xl sm:rounded-2xl">
            <SidebarPlayer />
          </ScrollArea>
        </aside>
      </div>

      {/* Floating Dock */}
      <FlootingDock />

      <MainPlayer />
    </div>
  )
}
