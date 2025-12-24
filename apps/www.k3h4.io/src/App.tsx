import { Shell } from './components/shell'
import { MapBackground } from './components/ui/map-background'

function App() {
  return (
    <div className="relative min-h-screen text-foreground">
      <MapBackground className="fixed inset-0 -z-20 h-screen w-screen" />
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-background/5 via-background/10 to-background/20"
        aria-hidden
      />

      <Shell />
    </div>
  )
}

export default App
