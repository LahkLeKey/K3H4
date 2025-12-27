import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
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
                <h2 className="text-lg font-semibold">Profile</h2>
                <p className="text-sm text-muted-foreground">Account details from your sign-in provider.</p>
                <p className="text-xs text-muted-foreground">Signed in as {userEmail ?? 'unknown'}</p>
            </div>
            <div className="space-y-2 rounded-lg border border-border bg-muted/30 p-3 text-sm">
                <p className="text-muted-foreground">Display name: <span className="text-foreground font-medium">{profile?.displayName ?? '—'}</span></p>
                <p className="text-muted-foreground">Avatar URL: <span className="text-foreground break-all font-medium">{profile?.avatarUrl ?? '—'}</span></p>
            </div>

            <label className="space-y-1 text-sm text-muted-foreground">
                <span className="block font-medium text-foreground">Personal note</span>
                <Textarea
                    placeholder="Add a short note for yourself"
                    value={profile?.preference?.note ?? ''}
                    onChange={(e) =>
                        setProfile((prev) => ({
                            ...(prev ?? {}),
                            preference: { ...(prev?.preference ?? {}), note: e.target.value },
                        }))
                    }
                />
                <span className="text-xs text-muted-foreground">Saved privately to your profile.</span>
            </label>
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
