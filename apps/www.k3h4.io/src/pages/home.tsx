import { useEffect, useState } from 'react'

import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Section } from '../components/section'

export function HomePage() {
    const apiBase = (globalThis as any)?.__API_URL__ || (import.meta as any)?.API_URL || 'http://localhost:3001'
    const redirectUri = `${window.location.origin}/auth/github`
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState<string>('')
    const [userEmail, setUserEmail] = useState<string | null>(null)

    useEffect(() => {
        const checkSession = async () => {
            const token = localStorage.getItem('k3h4.accessToken')
            if (!token) return

            setStatus('loading')
            setMessage('Checking your session…')
            try {
                const res = await fetch(`${apiBase}/auth/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                const data = await res.json()
                if (!res.ok || !data?.user) {
                    throw new Error('Session expired — please sign in again')
                }
                setUserEmail(data.user.email ?? null)
                setStatus('success')
                setMessage(`Signed in as ${data.user.email ?? 'your account'}`)
            } catch (err) {
                localStorage.removeItem('k3h4.accessToken')
                localStorage.removeItem('k3h4.refreshToken')
                setStatus('idle')
                setMessage(err instanceof Error ? err.message : '')
            }
        }

        checkSession()
    }, [apiBase])

    const handleGithubLogin = async () => {
        setStatus('loading')
        setMessage('Redirecting to GitHub…')
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
            setStatus('error')
            setMessage(error instanceof Error ? error.message : 'Unable to start GitHub login')
        }
    }

    return (
        <div className="space-y-6">
            <Section
                eyebrow="Access"
                title="Sign in to your workspace"
                description="Use your account to access in-progress dashboards and prototypes."
            >
                <div className="grid gap-4 md:grid-cols-[1.2fr,0.8fr]">
                    <Card className="border bg-background/70 p-6">
                        <div className="space-y-4">
                            <Button
                                type="button"
                                variant="default"
                                className="w-full"
                                onClick={handleGithubLogin}
                                disabled={status === 'loading'}
                            >
                                {status === 'loading'
                                    ? 'Redirecting…'
                                    : status === 'success'
                                        ? 'Continue with GitHub'
                                        : 'Sign in with GitHub'}
                            </Button>
                            {message ? (
                                <p
                                    className={
                                        status === 'error'
                                            ? 'text-sm text-destructive'
                                            : 'text-sm text-emerald-600'
                                    }
                                >
                                    {message}
                                </p>
                            ) : null}
                            {userEmail ? (
                                <p className="text-xs text-muted-foreground">Session active for {userEmail}</p>
                            ) : null}
                        </div>
                    </Card>
                    <div className="space-y-2 text-sm text-muted-foreground">
                        <p>Only GitHub OAuth is supported. No passwords or local accounts are stored.</p>
                    </div>
                </div>
            </Section>

            {/* Projects section removed */}
        </div>
    )
}
