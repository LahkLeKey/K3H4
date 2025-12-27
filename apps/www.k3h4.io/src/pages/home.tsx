import { AuthAccessSection } from '../components/auth-access-section'
import { BankTable } from '../components/bank/bank-table'
import { useAuthProfile } from '../hooks/use-auth-profile'

export function HomePage() {
    const { apiBase, user, authStatus, authMessage, userEmail, profile, handleGithubLogin } = useAuthProfile()

    if (user.status === 'authenticated') {
        return <BankTable apiBase={apiBase} userEmail={userEmail} />
    }

    return (
        <AuthAccessSection
            userEmail={userEmail}
            authStatus={authStatus}
            authMessage={authMessage || ''}
            onGithubLogin={handleGithubLogin}
            sideContent={<p>Only GitHub OAuth is supported. No passwords or local accounts are stored.</p>}
        />
    )
}
