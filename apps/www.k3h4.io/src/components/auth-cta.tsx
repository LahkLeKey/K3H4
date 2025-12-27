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
    return (
        <div className="grid gap-6 md:grid-cols-[1.1fr,0.9fr]">
            <Card className="border bg-background/70 p-6 shadow-sm">
                <div className="space-y-4">
                    <h1 className="text-xl font-semibold">Sign in with GitHub</h1>
                    <p className="text-sm text-muted-foreground">
                        Access in-progress dashboards and prototypes. GitHub OAuth only; no passwords stored.
                    </p>
                    <Button type="button" variant="default" className="w-full" onClick={onGithubLogin} disabled={authStatus === 'loading'}>
                        {authStatus === 'loading' ? 'Redirecting…' : userEmail ? 'Continue with GitHub' : 'Sign in with GitHub'}
                    </Button>
                    {userEmail ? <p className="text-xs text-muted-foreground">Session active for {userEmail}</p> : null}
                    {authStatus === 'error' && authMessage ? <p className="text-sm text-destructive">{authMessage}</p> : null}
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
    )
}
