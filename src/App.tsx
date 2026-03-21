import { Routes, Route } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Console from './pages/Console'
import Home from './pages/Home'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/console" element={<Console />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
