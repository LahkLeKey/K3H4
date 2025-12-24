import { Navigate, Route, Routes } from 'react-router-dom'

import { Shell } from './components/shell'
import { MapBackground } from './components/ui/map-background'
import { HomePage } from './pages/home'
import { GithubCallbackPage } from './pages/github-callback'

function App() {
  return (
    <div className="relative min-h-screen text-foreground">
      <MapBackground className="fixed inset-0 -z-20 h-screen w-screen" />
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-background/5 via-background/10 to-background/20"
        aria-hidden
      />

      <Shell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/github" element={<GithubCallbackPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Shell>
    </div>
  )
}

export default App
