import { useMemo } from "react";
import { useLocation } from "react-router-dom";

import { AuthCta } from "./auth-cta";
import { GithubCallbackPage } from "../pages/github-callback";
import { ShellHeader } from "./shell/header";
import { SignedInPanels } from "./shell/signed-in-panels";
import { useAuthProfile } from "../hooks/use-auth-profile";

const navItems = [{ to: "/", label: "Home" }];

export function Shell() {
    const location = useLocation();
    const pathname = location.pathname;
    const isCallback = useMemo(() => pathname.startsWith("/auth/github"), [pathname]);
    const {
        userEmail,
        authStatus,
        authMessage,
        profile,
        profileLoading,
        profileMessage,
        setProfile,
        handleGithubLogin,
        handleSignOut,
        handleProfileSave,
    } = useAuthProfile();

    return (
        <div className="min-h-screen bg-background text-foreground">
            <ShellHeader
                navItems={navItems}
                pathname={pathname}
                userEmail={userEmail}
                authStatus={authStatus}
                authMessage={authMessage}
                onGithubLogin={handleGithubLogin}
            />

            <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-8">
                {isCallback ? (
                    <GithubCallbackPage />
                ) : userEmail ? (
                    <SignedInPanels
                        userEmail={userEmail}
                        profile={profile}
                        profileLoading={profileLoading}
                        profileMessage={profileMessage}
                        setProfile={setProfile}
                        onSave={handleProfileSave}
                        onSignOut={handleSignOut}
                    />
                ) : (
                    <AuthCta
                        userEmail={userEmail}
                        authStatus={authStatus}
                        authMessage={authMessage}
                        onGithubLogin={handleGithubLogin}
                    />
                )}
            </main>
        </div>
    );
}
