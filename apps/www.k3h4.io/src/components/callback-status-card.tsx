import { Card } from './ui/card'
import { Spinner } from './ui/spinner'
import { Button } from './ui/button'
import type { AuthStatus } from '../stores/auth-store'

export type CallbackStatusCardProps = {
    authStatus: AuthStatus
    authMessage: string
    onRestart: () => void
    onContinue: () => void
}

export function CallbackStatusCard({ authStatus, authMessage, onRestart, onContinue }: CallbackStatusCardProps) {
    const isError = authStatus === 'error'
    const isLoading = authStatus === 'loading'

    return (
        <div className="flex items-center justify-center py-24">
            <Card className="w-full max-w-md space-y-4 border bg-background/70 p-6 text-sm">
                <div className="flex items-center gap-3">
                    {isLoading ? <Spinner className="h-4 w-4" /> : null}
                    <p className={isError ? 'text-destructive' : 'text-muted-foreground'}>
                        {authMessage || 'Preparing GitHub sign-in...'}
                    </p>
                </div>
                {isError ? (
                    <div className="flex flex-col gap-3">
                        <Button variant="default" onClick={onRestart}>
                            Restart GitHub sign-in
                        </Button>
                        <Button variant="outline" onClick={onRestart}>
                            Back home
                        </Button>
                    </div>
                ) : null}
                {authStatus === 'success' ? (
                    <Button variant="outline" onClick={onContinue}>
                        Continue
                    </Button>
                ) : null}
            </Card>
        </div>
    )
}
