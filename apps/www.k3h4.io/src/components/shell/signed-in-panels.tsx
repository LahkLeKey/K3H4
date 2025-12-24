import { Card } from "../ui/card";
import { PreferencesPanel } from "../preferences-panel";
import { ProfilePanel } from "../profile-panel";
import type { ProfileState } from "../../stores/auth-store";

type Props = {
    userEmail: string;
    profile: ProfileState | null;
    profileLoading: boolean;
    profileMessage: string;
    setProfile: (updater: (prev: ProfileState | null) => ProfileState | null) => void;
    onSave: () => void;
    onSignOut: () => void;
};

export function SignedInPanels({ userEmail, profile, profileLoading, profileMessage, setProfile, onSave, onSignOut }: Props) {
    return (
        <div className="grid gap-6 md:grid-cols-[1.1fr,0.9fr]">
            <Card className="border bg-background/70 p-6 shadow-sm">
                <ProfilePanel
                    userEmail={userEmail}
                    profile={profile}
                    profileLoading={profileLoading}
                    profileMessage={profileMessage}
                    setProfile={setProfile}
                    onSave={onSave}
                    onSignOut={onSignOut}
                />
            </Card>

            <Card className="border bg-background/60 p-6 shadow-sm">
                <h2 className="text-sm font-medium text-muted-foreground">Preferences</h2>
                <PreferencesPanel profile={profile} setProfile={setProfile} />
            </Card>
        </div>
    );
}
