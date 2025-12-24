import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import App from './App.tsx'
import { ErrorBoundary } from './components/error-boundary'

// Normalize provider callbacks (GitHub) to HashRouter routes when the provider sends users back to /auth/github
const path = window.location.pathname
if (path.startsWith('/auth/github')) {
  const hashPath = `#/auth/github${window.location.search}`
  window.location.replace(`${window.location.origin}/${hashPath}`)
}

// Expose env to runtime globals for reliable access in Docker/HashRouter
const envApi = (import.meta as any)?.env?.API_URL
const envGithub = (import.meta as any)?.env?.GITHUB_CLIENT_ID
if (envApi) (globalThis as any).__API_URL__ = envApi
if (envGithub) (globalThis as any).__GITHUB_CLIENT_ID = envGithub

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <HashRouter>
        <App />
      </HashRouter>
    </ErrorBoundary>
  </StrictMode>,
)
