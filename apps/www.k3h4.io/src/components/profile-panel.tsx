import { Button } from './ui/button'
import { Input } from './ui/input'
import type { ProfileState } from '../hooks/use-auth-profile'

type Props = {
    userEmail: string | null
    profile: ProfileState | null
    profileLoading: boolean
    profileMessage: string
    setProfile: (updater: (prev: ProfileState | null) => ProfileState | null) => void
    onSave: () => void
    onSignOut: () => void
}

export function ProfilePanel({ userEmail, profile, profileLoading, profileMessage, setProfile, onSave, onSignOut }: Props) {
    return (
        <div className="space-y-4">
            <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Profile</p>
                <h1 className="text-xl font-semibold">{profile?.displayName || userEmail || 'Your profile'}</h1>
                <p className="text-sm text-muted-foreground">Signed in as {userEmail ?? 'unknown'}</p>
            </div>
            <div className="space-y-3">
                <label className="space-y-1 text-sm text-muted-foreground">
                    <span className="block font-medium text-foreground">Display name</span>
                    <Input
                        value={profile?.displayName ?? ''}
                        placeholder="Your name"
                        onChange={(e) =>
                            setProfile((prev) => ({
                                ...(prev ?? {}),
                                displayName: e.target.value,
                                avatarUrl: prev?.avatarUrl,
                                preference: prev?.preference,
                            }))
                        }
                    />
                </label>
                <label className="space-y-1 text-sm text-muted-foreground">
                    <span className="block font-medium text-foreground">Avatar URL</span>
                    <Input
                        value={profile?.avatarUrl ?? ''}
                        placeholder="https://…"
                        onChange={(e) =>
                            setProfile((prev) => ({
                                ...(prev ?? {}),
                                avatarUrl: e.target.value,
                                displayName: prev?.displayName,
                                preference: prev?.preference,
                            }))
                        }
                    />
                </label>
            </div>
            <div className="flex flex-wrap gap-3">
                <Button variant="default" className="w-full sm:w-auto" onClick={onSave} disabled={profileLoading}>
                    {profileLoading ? 'Saving…' : 'Save profile'}
                </Button>
                <Button variant="outline" className="w-full sm:w-auto" onClick={onSignOut}>
                    Sign out
                </Button>
            </div>
            {profileMessage ? <p className="text-xs text-muted-foreground">{profileMessage}</p> : null}
        </div>
    )
}
