import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Section } from '../components/section'
import { useAuthProfile } from '../hooks/use-auth-profile'
import type { ProfileState } from '../stores/auth-store'

export function HomePage() {
    const { authStatus, authMessage, userEmail, handleGithubLogin } = useAuthProfile()
    const isLoading = authStatus === 'loading'

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
                                disabled={isLoading}
                            >
                                {isLoading
                                    ? 'Redirecting…'
                                    : authStatus === 'success'
                                        ? 'Continue with GitHub'
                                        : 'Sign in with GitHub'}
                            </Button>
                            {authMessage ? (
                                <p
                                    className={
                                        authStatus === 'error'
                                            ? 'text-sm text-destructive'
                                            : 'text-sm text-emerald-600'
                                    }
                                >
                                    {authMessage}
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

type SignedInLandingProps = {
    userEmail: string | null
    profile: ProfileState | null
}

export function SignedInLanding({ userEmail, profile }: SignedInLandingProps) {
    const name = profile?.displayName || userEmail || 'there'
    return (
        <div className="mx-auto w-full max-w-4xl space-y-6">
            <Card className="border bg-background/80 p-8 shadow-sm">
                <div className="space-y-3 text-center">
                    <p className="text-sm text-muted-foreground">Welcome back</p>
                    <h1 className="text-3xl font-semibold leading-tight">Hi {name}, you’re signed in.</h1>
                    <p className="text-base text-muted-foreground">This is your minimal landing page. Hello world.</p>
                </div>
            </Card>
        </div>
    )
}
