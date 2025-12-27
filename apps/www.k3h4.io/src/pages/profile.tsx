import { Sparkles } from "lucide-react";

import { PreferencesPanel } from "../components/preferences-panel";
import { ProfilePanel } from "../components/profile-panel";
import { SectionCard } from "../components/shell/section-card";
import { PanelGrid } from "../components/shell/panel-grid";
import type { ProfileState } from "../stores/auth-store";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
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
    const headline = profile?.preference?.timezone || profile?.preference?.locale || "Let’s set up your profile";
    const avatarUrl = profile?.avatarUrl || undefined;
    const theme = profile?.preference?.theme || "system";
    const locale = profile?.preference?.locale || "en-US";
    const timezone = profile?.preference?.timezone || "UTC";
    const marketing = profile?.preference?.marketingOptIn ? "Opted in" : "No marketing";

    return (
        <div className="space-y-6">
            <SectionCard tone="default" className="relative overflow-hidden border bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.15),transparent_30%)]" aria-hidden />
                <div className="relative flex flex-wrap items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-white/20 shadow-md">
                        <AvatarImage src={avatarUrl} alt={displayName} />
                        <AvatarFallback className="bg-slate-700 text-white">{displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1 space-y-1">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-wide text-white/80">
                            <Sparkles className="h-4 w-4" />
                            Profile preview
                        </div>
                        <h1 className="truncate text-2xl font-semibold leading-tight">{displayName}</h1>
                        <p className="text-sm text-white/80">{headline}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                        <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20">Theme: {theme}</Badge>
                        <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20">Locale: {locale}</Badge>
                        <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20">Timezone: {timezone}</Badge>
                        <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20">{marketing}</Badge>
                    </div>
                </div>
            </SectionCard>

            <PanelGrid
                primary={
                    <div className="space-y-4">
                        <SectionCard>
                            <div className="space-y-2">
                                <h2 className="text-lg font-semibold">About</h2>
                                <p className="text-sm text-muted-foreground">
                                    Craft a concise introduction, your areas of focus, and what you are exploring. This space is meant to evolve as we add richer profile fields.
                                </p>
                            </div>
                        </SectionCard>

                        <SectionCard>
                            <div className="space-y-2">
                                <h2 className="text-lg font-semibold">Preferences</h2>
                                <p className="text-sm text-muted-foreground">Quick snapshot of your experience settings.</p>
                                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <PreferenceItem label="Theme" value={theme} />
                                    <PreferenceItem label="Locale" value={locale} />
                                    <PreferenceItem label="Timezone" value={timezone} />
                                    <PreferenceItem label="Marketing" value={marketing} />
                                </div>
                            </div>
                        </SectionCard>

                        <SectionCard tone="muted">
                            <div className="space-y-2">
                                <h2 className="text-lg font-semibold">Recent activity</h2>
                                <p className="text-sm text-muted-foreground">No activity yet. When you start engaging, highlights will appear here.</p>
                            </div>
                        </SectionCard>
                    </div>
                }
                secondary={
                    <div className="space-y-4">
                        <SectionCard>
                            <ProfilePanel
                                userEmail={userEmail}
                                profile={profile}
                                profileLoading={profileLoading}
                                profileMessage={profileMessage}
                                setProfile={setProfile}
                                onSave={onSave}
                                onSignOut={onSignOut}
                            />
                        </SectionCard>

                        <SectionCard tone="muted">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-semibold">Preferences</h3>
                                        <p className="text-xs text-muted-foreground">Tune your experience.</p>
                                    </div>
                                    <Button size="sm" variant="outline" onClick={onSave} disabled={profileLoading}>
                                        {profileLoading ? "Saving…" : "Save"}
                                    </Button>
                                </div>
                                <Separator />
                                <PreferencesPanel profile={profile} setProfile={setProfile} />
                            </div>
                        </SectionCard>

                        {profileMessage ? (
                            <SectionCard tone="muted">
                                <p className="text-xs text-muted-foreground">{profileMessage}</p>
                            </SectionCard>
                        ) : null}
                    </div>
                }
            />
        </div>
    );
}

function PreferenceItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-lg border bg-card px-3 py-2">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-sm font-medium text-foreground">{value}</p>
        </div>
    );
}
