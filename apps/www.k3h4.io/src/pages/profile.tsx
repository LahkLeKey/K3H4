import { ProfilePanel } from "../components/profile-panel";
import type { ProfileState } from "../stores/auth-store";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Card } from "../components/ui/card";
import { Separator } from "../components/ui/separator";

export type ProfilePageProps = {
    userEmail: string | null;
    profile: ProfileState | null;
    profileLoading: boolean;
    profileMessage: string;
    setProfile: (updater: (prev: ProfileState | null) => ProfileState | null) => void;
    onSave: () => void;
    onSignOut: () => void;
};

export function ProfilePage({ userEmail, profile, profileLoading, profileMessage, setProfile, onSave, onSignOut }: ProfilePageProps) {
    const displayName = profile?.displayName || userEmail || "Your profile";
    const headline = profile?.preference?.timezone || profile?.preference?.locale || "Update your details";
    const avatarUrl = profile?.avatarUrl || undefined;

    return (
        <div className="mx-auto w-full max-w-3xl space-y-6">
            <Card className="border bg-background/80 p-7 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <Avatar className="h-14 w-14">
                        <AvatarImage src={avatarUrl} alt={displayName} />
                        <AvatarFallback>{displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Profile</p>
                        <h1 className="text-xl font-semibold leading-tight">{displayName}</h1>
                        <p className="text-sm text-muted-foreground">{headline}</p>
                        {userEmail ? <p className="text-xs text-muted-foreground">Signed in as {userEmail}</p> : null}
                    </div>
                </div>

                <Separator className="my-5" />

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
        </div>
    );
}
