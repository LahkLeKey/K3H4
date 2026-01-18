import { PreferencesPanel } from "../preferences-panel";
import { ProfilePanel } from "../profile-panel";
import type { ProfileState } from "../../stores/auth-store";
import { PanelGrid } from "./panel-grid";
import { SectionCard } from "./section-card";

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
        <PanelGrid
            primary={
                <SectionCard tone="default">
                    <ProfilePanel
                        userEmail={userEmail}
                        profile={profile}
                        profileLoading={profileLoading}
                        profileMessage={profileMessage}
                        setProfile={setProfile}
                        onSave={onSave}
                        onSignOut={onSignOut}
                        deletingAccount={false}
                        deleteProgress={0}
                        deleteStatusText={""}
                    />
                </SectionCard>
            }
            secondary={
                <SectionCard tone="muted">
                    <h2 className="text-sm font-medium text-muted-foreground">Preferences</h2>
                    <PreferencesPanel profile={profile} setProfile={setProfile} />
                </SectionCard>
            }
        />
    );
}
