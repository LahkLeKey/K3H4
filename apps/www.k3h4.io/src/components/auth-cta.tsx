import { Button } from './ui/button'
import { Card } from './ui/card'
import type { AuthStatus } from '../stores/auth-store'

type Props = {
    userEmail: string | null
    authStatus: AuthStatus
    authMessage: string
    onGithubLogin: () => void
}

export function AuthCta({ userEmail, authStatus, authMessage, onGithubLogin }: Props) {
    const isLoading = authStatus === 'loading'
    const primaryLabel = isLoading ? 'Redirecting...' : 'Login with GitHub'

    return (
        <div className="mx-auto w-full max-w-3xl">
            <Card className="border bg-background/80 p-8 shadow-sm">
                <div className="space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-2xl font-semibold">Welcome to K3H4</h1>
                        <p className="text-sm text-muted-foreground">Sign in to continue.</p>
                    </div>

                    <div className="space-y-3">
                        <Button
                            type="button"
                            variant="default"
                            className="w-full"
                            onClick={onGithubLogin}
                            disabled={isLoading}
                        >
                            {primaryLabel}
                        </Button>
                        {authMessage ? (
                            <p className={authStatus === 'error' ? 'text-sm text-destructive text-center' : 'text-sm text-center text-emerald-700'}>
                                {authMessage}
                            </p>
                        ) : null}
                        {userEmail ? <p className="text-xs text-center text-muted-foreground">Session active for {userEmail}</p> : null}
                    </div>
                </div>
            </Card>
        </div>
    )
}
