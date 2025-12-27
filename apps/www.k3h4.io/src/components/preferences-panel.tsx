import type { ProfileState } from '../hooks/use-auth-profile'
import { Input } from './ui/input'

type Props = {
    profile: ProfileState | null
    setProfile: (updater: (prev: ProfileState | null) => ProfileState | null) => void
}

export function PreferencesPanel({ profile, setProfile }: Props) {
    return (
        <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <label className="space-y-1">
                <span className="block font-medium text-foreground">Theme</span>
                <select
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                    value={profile?.preference?.theme ?? 'system'}
                    onChange={(e) =>
                        setProfile((prev) => ({
                            ...(prev ?? {}),
                            preference: { ...(prev?.preference ?? {}), theme: e.target.value },
                        }))
                    }
                >
                    <option value="system">System</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </label>

            <label className="space-y-1">
                <span className="block font-medium text-foreground">Locale</span>
                <Input
                    value={profile?.preference?.locale ?? 'en-US'}
                    onChange={(e) =>
                        setProfile((prev) => ({
                            ...(prev ?? {}),
                            preference: { ...(prev?.preference ?? {}), locale: e.target.value },
                        }))
                    }
                />
            </label>

            <label className="space-y-1">
                <span className="block font-medium text-foreground">Timezone</span>
                <Input
                    value={profile?.preference?.timezone ?? 'UTC'}
                    onChange={(e) =>
                        setProfile((prev) => ({
                            ...(prev ?? {}),
                            preference: { ...(prev?.preference ?? {}), timezone: e.target.value },
                        }))
                    }
                />
            </label>

            <label className="flex items-center gap-2 text-sm">
                <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={profile?.preference?.marketingOptIn ?? false}
                    onChange={(e) =>
                        setProfile((prev) => ({
                            ...(prev ?? {}),
                            preference: { ...(prev?.preference ?? {}), marketingOptIn: e.target.checked },
                        }))
                    }
                />
                <span>Opt into updates</span>
            </label>
        </div>
    )
}
