import { useMemo } from "react";
import { useLocation } from "react-router-dom";

import { AuthCta } from "./auth-cta";
import { GithubCallbackPage } from "../pages/github-callback";
import { ShellView } from "./shell/view";
import { ShellBrand } from "./shell/brand";
import { useAuthProfile } from "../hooks/use-auth-profile";
import { SignedInLanding } from "../pages/home";

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
        <ShellView
            navItems={navItems}
            pathname={pathname}
            userEmail={userEmail}
            authStatus={authStatus}
            authMessage={authMessage}
            profile={profile}
            profileLoading={profileLoading}
            profileMessage={profileMessage}
            setProfile={setProfile}
            onProfileSave={handleProfileSave}
            onSignOut={handleSignOut}
            onGithubLogin={handleGithubLogin}
            brand={<ShellBrand />}
            isCallback={isCallback}
            callback={<GithubCallbackPage />}
            signedIn={<SignedInLanding userEmail={userEmail} profile={profile} />}
            signedOut={
                <AuthCta
                    userEmail={userEmail}
                    authStatus={authStatus}
                    authMessage={authMessage}
                    onGithubLogin={handleGithubLogin}
                />
            }
        />
    );
}
