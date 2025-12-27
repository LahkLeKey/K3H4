import { useMemo } from "react";
import { useLocation } from "react-router-dom";

import { AuthCta } from "./auth-cta";
import { GithubCallbackPage } from "../pages/github-callback";
import { ShellView } from "./shell/view";
import { ShellBrand } from "./shell/brand";
import { ShellActionBar } from "./shell/action-bar";
import { SearchInput } from "./shell/search-input";
import { AuthButton } from "./shell/auth-button";
import { useAuthProfile } from "../hooks/use-auth-profile";
import { ProfilePage } from "../pages/profile";

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
            onGithubLogin={handleGithubLogin}
            brand={<ShellBrand />}
            actions={
                <ShellActionBar>
                    <SearchInput placeholder="Search (disabled)" disabled />
                    <AuthButton userEmail={userEmail} authStatus={authStatus} onClick={handleGithubLogin} />
                </ShellActionBar>
            }
            isCallback={isCallback}
            callback={<GithubCallbackPage />}
            signedIn={
                <ProfilePage
                    userEmail={userEmail}
                    profile={profile}
                    profileLoading={profileLoading}
                    profileMessage={profileMessage}
                    setProfile={setProfile}
                    onSave={handleProfileSave}
                    onSignOut={handleSignOut}
                />
            }
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
