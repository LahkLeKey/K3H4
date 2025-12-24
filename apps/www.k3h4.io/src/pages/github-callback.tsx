import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Card } from '../components/ui/card'
import { Spinner } from '../components/ui/spinner'
import { Button } from '../components/ui/button'

export function GithubCallbackPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const apiBase = (import.meta as any)?.env?.API_URL || (globalThis as any)?.__API_URL__ || 'http://localhost:3001'
    const redirectUri = `${window.location.origin}/auth/github`

    const hasRun = useRef(false)

    const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search])
    const code = searchParams.get('code')
    const errorParam = searchParams.get('error')

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState<string>('')

    useEffect(() => {
        const run = async () => {
            if (hasRun.current) return
            hasRun.current = true

            if (errorParam) {
                setStatus('error')
                setMessage(errorParam)
                return
            }
            if (!code) {
                setStatus('error')
                setMessage('Missing authorization code')
                return
            }
            setStatus('loading')
            setMessage('Signing you in with GitHub…')
            try {
                const res = await fetch(`${apiBase}/auth/github/callback`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ code, redirectUri }),
                })
                const data = await res.json()
                if (!res.ok) {
                    const detail = data?.detail || data?.error || 'GitHub sign-in failed'
                    const stale = data?.staleCode
                    throw new Error(stale ? `${detail} — restart sign-in` : detail)
                }
                localStorage.setItem('k3h4.accessToken', data.accessToken)
                localStorage.setItem('k3h4.refreshToken', data.refreshToken)
                setStatus('success')
                setMessage('Signed in — redirecting…')
                setTimeout(() => navigate('/', { replace: true }), 600)
            } catch (err) {
                setStatus('error')
                setMessage(err instanceof Error ? err.message : 'Something went wrong')
            }
        }
        run()
    }, [apiBase, code, errorParam, navigate, redirectUri])

    const isError = status === 'error'
    const isLoading = status === 'loading'

    return (
        <div className="flex items-center justify-center py-24">
            <Card className="w-full max-w-md space-y-4 border bg-background/70 p-6 text-sm">
                <div className="flex items-center gap-3">
                    {isLoading ? <Spinner className="h-4 w-4" /> : null}
                    <p className={isError ? 'text-destructive' : 'text-muted-foreground'}>
                        {message || 'Preparing GitHub sign-in…'}
                    </p>
                </div>
                {isError ? (
                    <div className="flex flex-col gap-3">
                        <Button variant="default" onClick={() => navigate('/', { replace: true })}>
                            Restart GitHub sign-in
                        </Button>
                        <Button variant="outline" onClick={() => navigate('/', { replace: true })}>
                            Back home
                        </Button>
                    </div>
                ) : null}
                {status === 'success' ? (
                    <Button variant="outline" onClick={() => navigate('/', { replace: true })}>
                        Continue
                    </Button>
                ) : null}
            </Card>
        </div>
    )
}
