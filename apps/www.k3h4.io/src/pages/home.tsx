import { useState } from 'react'

import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Section } from '../components/section'

export function HomePage() {
    const apiBase = (globalThis as any)?.__API_URL__ || (import.meta as any)?.env?.API_URL || 'http://localhost:3001'
    const redirectUri = `${window.location.origin}/auth/github`
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState<string>('')

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setStatus('loading')
        setMessage('')
        try {
            const res = await fetch(`${apiBase}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()
            if (!res.ok) {
                throw new Error(data?.error || 'Login failed')
            }

            localStorage.setItem('k3h4.accessToken', data.accessToken)
            localStorage.setItem('k3h4.refreshToken', data.refreshToken)
            setStatus('success')
            setMessage('Signed in')
        } catch (error) {
            setStatus('error')
            setMessage(error instanceof Error ? error.message : 'Something went wrong')
        }
    }

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
                        <form className="space-y-4" onSubmit={handleLogin}>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={status === 'loading'}>
                                {status === 'loading' ? 'Signing in…' : 'Sign in'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={handleGithubLogin}
                                disabled={status === 'loading'}
                            >
                                Sign in with GitHub
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
                        </form>
                    </Card>
                    <div className="space-y-2 text-sm text-muted-foreground">
                        <p>Sign in with your account to continue.</p>
                    </div>
                </div>
            </Section>

            {/* Projects section removed */}
        </div>
    )
}
