import { AuthCta } from './auth-cta'
import { Section } from './section'
import type { AuthStatus } from '../stores/auth-store'

export type AuthAccessSectionProps = {
    eyebrow?: string
    title?: string
    description?: string
    authStatus: AuthStatus
    authMessage: string
    userEmail: string | null
    onGithubLogin: () => void
    onLinkedinLogin: () => void
}

export function AuthAccessSection({
    eyebrow = 'Access',
    title = 'Sign in to your workspace',
    description = 'Use your account to access in-progress dashboards and prototypes.',
    authStatus,
    authMessage,
    userEmail,
    onGithubLogin,
    onLinkedinLogin,
}: AuthAccessSectionProps) {
    return (
        <Section eyebrow={eyebrow} title={title} description={description} align="center">
            <div className="flex justify-center">
                <div className="w-full max-w-2xl">
                    <AuthCta
                        userEmail={userEmail}
                        authStatus={authStatus}
                        authMessage={authMessage}
                        onGithubLogin={onGithubLogin}
                        onLinkedinLogin={onLinkedinLogin}
                    />
                </div>
            </div>
        </Section>
    )
}
