import { type ReactNode } from 'react'

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
    sideContent?: ReactNode
}

export function AuthAccessSection({
    eyebrow = 'Access',
    title = 'Sign in to your workspace',
    description = 'Use your account to access in-progress dashboards and prototypes.',
    authStatus,
    authMessage,
    userEmail,
    onGithubLogin,
    sideContent,
}: AuthAccessSectionProps) {
    return (
        <Section eyebrow={eyebrow} title={title} description={description}>
            <div className="grid gap-4 md:grid-cols-[1.2fr,0.8fr]">
                <AuthCta
                    userEmail={userEmail}
                    authStatus={authStatus}
                    authMessage={authMessage}
                    onGithubLogin={onGithubLogin}
                />
                {sideContent ? <div className="space-y-2 text-sm text-muted-foreground">{sideContent}</div> : null}
            </div>
        </Section>
    )
}
