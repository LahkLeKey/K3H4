// Custom LinkedIn callback handler: process code param, call backend, set tokens, and redirect
if (window.location.pathname === '/auth/linkedin/callback') {
  (async () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (!code) {
      document.body.innerHTML = '<h1>LinkedIn login failed: missing code</h1>';
      return;
    }
    document.body.innerHTML = '<h1>Signing in with LinkedIn...</h1>';
    try {
      // Use API base if available, else default to same-origin
      const apiBase = (window.__API_URL__ || import.meta.env.API_URL || '').replace(/\/$/, '');
      const url = apiBase ? `${apiBase}/auth/linkedin/callback` : '/auth/linkedin/callback';
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, redirectUri: window.location.origin + '/auth/linkedin/callback' })
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        document.body.innerHTML = `<h1>LinkedIn login failed</h1><pre>${data.error || 'Unknown error'}</pre>`;
        return;
      }
      // Store tokens in localStorage (match frontend keys)
      try {
        if (data.accessToken) localStorage.setItem('k3h4.accessToken', data.accessToken);
        if (data.refreshToken) localStorage.setItem('k3h4.refreshToken', data.refreshToken);
      } catch (err) {
        // ignore storage failures
      }
      // Redirect into the SPA hash route and reload so React picks up session
      const hashRoot = '/#/';
      window.location.replace(window.location.origin + hashRoot);
      setTimeout(() => window.location.reload(), 150);
    } catch (err) {
      document.body.innerHTML = `<h1>LinkedIn login failed</h1><pre>${err instanceof Error ? err.message : err}</pre>`;
    }
  })();
}

// If landing on the initial sign-in page but localStorage already has tokens (set by the
// provider callback handler), push the user into the hash router so the React app can
// initialize session state. This avoids getting stuck on the sign-in UI after token set.
try {
  const access = typeof window !== 'undefined' ? localStorage.getItem('k3h4.accessToken') : null;
  const refresh = typeof window !== 'undefined' ? localStorage.getItem('k3h4.refreshToken') : null;
  const isRoot = window.location.pathname === '/' || window.location.pathname === '';
  const hasNoHash = !window.location.hash || window.location.hash === '';
  if (access && refresh && isRoot && hasNoHash) {
    // Navigate into SPA hash route and reload so hooks pick up stored tokens
    const to = window.location.origin + '/#/';
    window.location.replace(to);
    setTimeout(() => window.location.reload(), 150);
  }
} catch (err) {
  // ignore storage or navigation errors
}

// Normalize provider callbacks (GitHub, LinkedIn) to HashRouter routes when the provider sends users back to /auth/github or /auth/linkedin/callback
import { StrictMode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import App from './App.tsx'
import { ErrorBoundary } from './components/error-boundary'
import { queryClient } from './lib/query-client'
import { installTelemetryDomHooks, setTelemetryApiBase } from './lib/telemetry'

// Normalize provider callbacks (GitHub, LinkedIn) to HashRouter routes when the provider sends users back to /auth/github or /auth/linkedin/callback
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

if (envApi) setTelemetryApiBase(envApi)
installTelemetryDomHooks()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <App />
        </HashRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
)
