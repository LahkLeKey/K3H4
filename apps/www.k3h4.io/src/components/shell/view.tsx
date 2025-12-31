import type { ReactNode } from "react";

import type { AuthStatus, ProfileState } from "../../stores/auth-store";
import type { NavItem } from "./nav-links";
import { ShellContentSwitch } from "./content-switch";
import { ShellHeader } from "./header";
import { ShellLayout, ShellMain } from "./layout";

export type ShellViewProps = {
    navItems: NavItem[];
    pathname: string;
    userEmail: string | null;
    authStatus: AuthStatus;
    authMessage: string;
    profile: ProfileState | null;
    profileLoading: boolean;
    profileMessage: string;
    setProfile: (updater: (prev: ProfileState | null) => ProfileState | null) => void;
    onProfileSave: () => void;
    onSignOut: () => void;
    onGithubLogin: () => void;
    onLinkedinLogin: () => void;
    brand?: ReactNode;
    actions?: ReactNode;
    modulesMenu?: ReactNode;
    isCallback: boolean;
    callback: ReactNode;
    signedIn: ReactNode;
    signedOut: ReactNode;
    // Delete props for ProfilePanel in dropdown
    onDeleteAccount?: (confirmText: string) => Promise<void> | void;
    deletingAccount?: boolean;
    deleteProgress?: number;
    deleteStatusText?: string;
};

export function ShellView({
    navItems,
    pathname,
    userEmail,
    authStatus,
    authMessage,
    profile,
    profileLoading,
    profileMessage,
    setProfile,
    onProfileSave,
    onSignOut,
    onGithubLogin,
    brand,
    actions,
    modulesMenu,
    isCallback,
    callback,
    signedIn,
    signedOut,
    onDeleteAccount,
    deletingAccount,
    deleteProgress,
    deleteStatusText,
}: ShellViewProps) {
    const isAuthenticated = !!userEmail || authStatus === "success";
    return (
        <ShellLayout>
            <ShellHeader
                navItems={navItems}
                pathname={pathname}
                userEmail={userEmail}
                authStatus={authStatus}
                authMessage={authMessage}
                profile={profile}
                profileLoading={profileLoading}
                profileMessage={profileMessage}
                setProfile={setProfile}
                onProfileSave={onProfileSave}
                onSignOut={onSignOut}
                brand={brand}
                actions={actions}
                modulesMenu={modulesMenu}
                onGithubLogin={onGithubLogin}
                // Pass delete props for dropdown ProfilePanel
                onDeleteAccount={onDeleteAccount}
                deletingAccount={deletingAccount}
                deleteProgress={deleteProgress}
                deleteStatusText={deleteStatusText}
            />

            <ShellMain>
                <ShellContentSwitch
                    isCallback={isCallback}
                    callback={callback}
                    authenticated={isAuthenticated}
                    signedIn={signedIn}
                    signedOut={signedOut}
                />
            </ShellMain>
        </ShellLayout>
    );
}
