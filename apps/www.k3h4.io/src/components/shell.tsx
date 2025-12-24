import { Link, useLocation } from 'react-router-dom'
import { Home, Search, User } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { cn } from '../lib/utils'
import { Card } from './ui/card'
import { GithubCallbackPage } from '../pages/github-callback'

const navItems = [{ to: '/', label: 'Home', icon: Home }]

export function Shell() {
    const location = useLocation()
    const isCallback = useMemo(() => location.pathname.startsWith('/auth/github'), [location.pathname])
    const apiBase = (globalThis as any)?.__API_URL__ || (import.meta as any)?.API_URL || 'http://localhost:3001'
    const redirectUri = `${window.location.origin}/auth/github`
    const [userEmail, setUserEmail] = useState<string | null>(null)
    const [authStatus, setAuthStatus] = useState<'idle' | 'loading' | 'error'>('idle')
    const [authMessage, setAuthMessage] = useState<string>('')

    // Centralized session check for layout-wide auth awareness
    useEffect(() => {
        const checkSession = async () => {
            const token = localStorage.getItem('k3h4.accessToken')
            if (!token) return
            setAuthStatus('loading')
            setAuthMessage('Checking session…')
            try {
                const res = await fetch(`${apiBase}/auth/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                const data = await res.json()
                if (!res.ok || !data?.user) {
                    throw new Error('Session expired — sign in again')
                }
                setUserEmail(data.user.email ?? null)
                setAuthStatus('idle')
                setAuthMessage('')
            } catch (err) {
                localStorage.removeItem('k3h4.accessToken')
                localStorage.removeItem('k3h4.refreshToken')
                setAuthStatus('error')
                setAuthMessage(err instanceof Error ? err.message : 'Sign-in needed')
            }
        }
        checkSession()
    }, [apiBase, location.pathname])

    const handleGithubLogin = async () => {
        setAuthStatus('loading')
        setAuthMessage('Redirecting to GitHub…')
        try {
            const res = await fetch(`${apiBase}/auth/github/url`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ redirectUri }),
            })
            const data = await res.json()
            if (!res.ok || !data?.authorizeUrl) {
                throw new Error(data?.error || 'Unable to start GitHub login')
            }
            window.location.href = data.authorizeUrl
        } catch (error) {
            setAuthStatus('error')
            setAuthMessage(error instanceof Error ? error.message : 'Unable to start GitHub login')
        }
    }

    const handleSignOut = () => {
        localStorage.removeItem('k3h4.accessToken')
        localStorage.removeItem('k3h4.refreshToken')
        setUserEmail(null)
        setAuthStatus('idle')
        setAuthMessage('Signed out')
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
                <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-3 px-4 py-4">
                    <Link to="/" className="flex items-center gap-2 text-sm font-semibold">
                        <div className="h-8 w-8 rounded-full bg-primary/10" />
                        <span>K3H4</span>
                    </Link>
                    <nav className="flex flex-1 flex-wrap items-center gap-2 text-sm">
                        {navItems.map((item) => {
                            const active = location.pathname === item.to
                            return (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className={cn(
                                        'rounded-full px-3 py-1.5 transition hover:bg-accent',
                                        active ? 'bg-accent text-foreground' : 'text-muted-foreground'
                                    )}
                                >
                                    {item.label}
                                </Link>
                            )
                        })}
                    </nav>
                    <div className="flex items-center gap-2">
                        <div className="relative hidden sm:block">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                className="h-9 w-56 pl-9"
                                placeholder="Search (disabled)"
                                aria-label="Search"
                                disabled
                            />
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label={userEmail ? `Signed in as ${userEmail}` : 'Sign in with GitHub'}
                            onClick={handleGithubLogin}
                            disabled={authStatus === 'loading'}
                        >
                            <User className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                {authMessage ? (
                    <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 pb-3 text-xs text-muted-foreground">
                        <span>{userEmail ? `Signed in as ${userEmail}` : authMessage}</span>
                    </div>
                ) : null}
            </header>

            <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-8">
                {isCallback ? (
                    <GithubCallbackPage />
                ) : userEmail ? (
                    <div className="grid gap-6 md:grid-cols-[1.1fr,0.9fr]">
                        <Card className="border bg-background/70 p-6 shadow-sm">
                            <div className="space-y-3">
                                <p className="text-xs uppercase tracking-wide text-muted-foreground">Welcome</p>
                                <h1 className="text-xl font-semibold">Hi, {userEmail}</h1>
                                <p className="text-sm text-muted-foreground">
                                    You’re signed in. Use the quick actions below or stay put; more dashboards are on the way.
                                </p>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <Button variant="default" className="w-full" onClick={handleGithubLogin}>
                                        Refresh session
                                    </Button>
                                    <Button variant="outline" className="w-full" onClick={handleSignOut}>
                                        Sign out
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        <Card className="border bg-background/60 p-6 shadow-sm">
                            <h2 className="text-sm font-medium text-muted-foreground">Status</h2>
                            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                                <li>• Session active for this browser.</li>
                                <li>• GitHub-only auth; no passwords stored.</li>
                                <li>• Tokens remain until you sign out.</li>
                            </ul>
                        </Card>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-[1.1fr,0.9fr]">
                        <Card className="border bg-background/70 p-6 shadow-sm">
                            <div className="space-y-4">
                                <h1 className="text-xl font-semibold">Sign in with GitHub</h1>
                                <p className="text-sm text-muted-foreground">
                                    Access in-progress dashboards and prototypes. GitHub OAuth only; no passwords stored.
                                </p>
                                <Button
                                    type="button"
                                    variant="default"
                                    className="w-full"
                                    onClick={handleGithubLogin}
                                    disabled={authStatus === 'loading'}
                                >
                                    {authStatus === 'loading' ? 'Redirecting…' : userEmail ? 'Continue with GitHub' : 'Sign in with GitHub'}
                                </Button>
                                {userEmail ? (
                                    <p className="text-xs text-muted-foreground">Session active for {userEmail}</p>
                                ) : null}
                                {authStatus === 'error' && authMessage ? (
                                    <p className="text-sm text-destructive">{authMessage}</p>
                                ) : null}
                            </div>
                        </Card>

                        <Card className="border bg-background/60 p-6 shadow-sm">
                            <h2 className="text-sm font-medium text-muted-foreground">What to expect</h2>
                            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                                <li>• GitHub-only sign-in with verified email.</li>
                                <li>• Tokens stored locally for this browser.</li>
                                <li>• No notifications or search yet—coming soon.</li>
                            </ul>
                        </Card>
                    </div>
                )}
            </main>
        </div>
    )
}
