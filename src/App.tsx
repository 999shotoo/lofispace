import { Routes, Route } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Console from './pages/Console'
import Home from './pages/Home'
import { ConsoleLayout } from './layout/ConsoleLayout'
import { ThemeProvider } from "@/components/theme-provider"
import ConsoleStations from './pages/console/stations'
import ConsoleSongs from './pages/console/songs'
import { PlayerProvider } from './context/player-context'
import DownloadPage from './pages/Download'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <PlayerProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/download" element={<DownloadPage />} />
            <Route element={<ConsoleLayout />} >
              <Route path="/console" element={<Console />} />
              <Route path="/console/stations" element={<ConsoleStations />} />
              <Route path="/console/songs" element={<ConsoleSongs />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </PlayerProvider>
    </ThemeProvider>
  )
}

export default App
