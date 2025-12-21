import { Navigate, Route, Routes } from 'react-router-dom'

import { Navbar } from './components/navbar'
import { MapBackground } from './components/ui/map-background'
import { HomePage } from './pages/home'
import { BankingPage } from './pages/banking'
import { LogisticsPage } from './pages/logistics'
import { StaffingPage } from './pages/staffing'
import { AdsPage } from './pages/ads'
import { InboxPage } from './pages/inbox'
import { ContactPage } from './pages/contact'
import { UiComponentsPage } from './pages/ui'

function App() {
  return (
    <div className="relative min-h-screen text-foreground">
      <MapBackground className="fixed inset-0 -z-20 h-screen w-screen" />
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-background/5 via-background/10 to-background/20"
        aria-hidden
      />

      <Navbar />

      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 pb-16 pt-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/banking" element={<BankingPage />} />
          <Route path="/logistics" element={<LogisticsPage />} />
          <Route path="/staffing" element={<StaffingPage />} />
          <Route path="/ads" element={<AdsPage />} />
          <Route path="/inbox" element={<InboxPage />} />
          <Route path="/ui" element={<UiComponentsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
