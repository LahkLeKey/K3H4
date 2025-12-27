import type { ReactNode } from "react";
import { Home, User } from "lucide-react";

import { Button } from "../ui/button";
import type { AuthStatus } from "../../stores/auth-store";
import type { NavItem } from "./nav-links";
import { NavLinks } from "./nav-links";
import { StatusLine } from "./status-line";
import { ShellBrand } from "./brand";
import { ShellActionBar } from "./action-bar";
import { SearchInput } from "./search-input";

type ShellHeaderProps = {
    navItems: NavItem[];
    pathname: string;
    userEmail: string | null;
    authStatus: AuthStatus;
    authMessage: string;
    brand?: ReactNode;
    actions?: ReactNode;
    onGithubLogin: () => void;
};

export function ShellHeader({ navItems, pathname, userEmail, authStatus, authMessage, onGithubLogin, brand, actions }: ShellHeaderProps) {
    return (
        <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-3 px-4 py-4">
                {brand ?? <ShellBrand />}
                <NavLinks
                    items={navItems.map((item) => ({ icon: Home, ...item }))}
                    activePath={pathname}
                    pillClassName="min-h-9"
                />
                {actions ?? (
                    <ShellActionBar>
                        <SearchInput placeholder="Search (disabled)" disabled />
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label={userEmail ? `Signed in as ${userEmail}` : "Sign in with GitHub"}
                            onClick={onGithubLogin}
                            disabled={authStatus === "loading"}
                        >
                            <User className="h-4 w-4" />
                        </Button>
                    </ShellActionBar>
                )}
            </div>
            <StatusLine>{userEmail ? `Signed in as ${userEmail}` : authMessage}</StatusLine>
        </header>
    );
}
