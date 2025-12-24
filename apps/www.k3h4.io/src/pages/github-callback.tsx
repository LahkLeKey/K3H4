import { useEffect, useMemo, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Card } from '../components/ui/card'
import { Spinner } from '../components/ui/spinner'
import { Button } from '../components/ui/button'
import { useAuthProfile } from '../hooks/use-auth-profile'

export function GithubCallbackPage() {
    const location = useLocation()
    const navigate = useNavigate()

    const hasRun = useRef(false)

    const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search])
    const code = searchParams.get('code')
    const errorParam = searchParams.get('error')
    const { authStatus, authMessage, redirectUri, completeGithubCallback, setAuthState } = useAuthProfile()

    useEffect(() => {
        const run = async () => {
            if (hasRun.current) return
            hasRun.current = true

            if (errorParam) {
                setAuthState('error', errorParam)
                return
            }
            if (!code) {
                setAuthState('error', 'Missing authorization code')
                return
            }
            const result = await completeGithubCallback(code, redirectUri)
            if (result.ok) {
                setTimeout(() => navigate('/', { replace: true }), 600)
            }
        }
        run()
    }, [code, completeGithubCallback, errorParam, navigate, redirectUri, setAuthState])

    const isError = authStatus === 'error'
    const isLoading = authStatus === 'loading'

    return (
        <div className="flex items-center justify-center py-24">
            <Card className="w-full max-w-md space-y-4 border bg-background/70 p-6 text-sm">
                <div className="flex items-center gap-3">
                    {isLoading ? <Spinner className="h-4 w-4" /> : null}
                    <p className={isError ? 'text-destructive' : 'text-muted-foreground'}>
                        {authMessage || 'Preparing GitHub sign-in…'}
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
