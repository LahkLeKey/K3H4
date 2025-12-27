import type { ReactNode } from "react";

import type { AuthStatus } from "../../stores/auth-store";
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
    onGithubLogin: () => void;
    brand?: ReactNode;
    actions?: ReactNode;
    isCallback: boolean;
    callback: ReactNode;
    signedIn: ReactNode;
    signedOut: ReactNode;
};

export function ShellView({
    navItems,
    pathname,
    userEmail,
    authStatus,
    authMessage,
    onGithubLogin,
    brand,
    actions,
    isCallback,
    callback,
    signedIn,
    signedOut,
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
                brand={brand}
                actions={actions}
                onGithubLogin={onGithubLogin}
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
