import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import { GithubCallbackPage } from "../pages/github-callback";
import { AuthAccessSection } from "./auth-access-section";
import { BankTable } from "./bank/bank-table";
import { AssignmentAgency } from "./agency/assignment-agency";
import { FreightManager } from "./freight/freight-manager";
import { PersonaTable } from "./persona/persona-table";
import { ShellView } from "./shell/view";
import { ShellBrand } from "./shell/brand";
import { TopTabs, type TopTabKey } from "./shell/top-tabs";
import { useAuthProfile } from "../hooks/use-auth-profile";

const navItems = [{ to: "/", label: "Home" }];

export function Shell() {
    const location = useLocation();
    const pathname = location.pathname;
    const isCallback = useMemo(() => pathname.startsWith("/auth/github"), [pathname]);
    const {
        apiBase,
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
    const [activeTab, setActiveTab] = useState<TopTabKey>("bank");
    const isAuthenticated = !!userEmail || authStatus === "success";

    const signedInView = (() => {
        if (activeTab === "persona") return <PersonaTable apiBase={apiBase} userEmail={userEmail} />;
        if (activeTab === "agency") return <AssignmentAgency apiBase={apiBase} userEmail={userEmail} />;
        if (activeTab === "freight") return <FreightManager apiBase={apiBase} userEmail={userEmail} />;
        return <BankTable apiBase={apiBase} userEmail={userEmail} />;
    })();

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
            tabs={isAuthenticated ? (
                <TopTabs activeTab={activeTab} onChange={setActiveTab} />
            ) : null}
            isCallback={isCallback}
            callback={<GithubCallbackPage />}
            signedIn={signedInView}
            signedOut={
                <AuthAccessSection
                    userEmail={userEmail}
                    authStatus={authStatus}
                    authMessage={authMessage || ""}
                    onGithubLogin={handleGithubLogin}
                />
            }
        />
    );
}
