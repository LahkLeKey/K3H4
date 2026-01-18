import { Shell } from './components/shell'

function App() {
  return (
    <div className="relative min-h-screen bg-transparent text-foreground antialiased">
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(92,230,186,0.18),transparent_28%),radial-gradient(circle_at_78%_16%,rgba(122,196,255,0.16),transparent_30%),radial-gradient(circle_at_48%_80%,rgba(255,190,130,0.18),transparent_34%),linear-gradient(140deg,#05070d,#060910)]"
        aria-hidden
      />

      <Shell />
    </div>
  )
}

export default App
