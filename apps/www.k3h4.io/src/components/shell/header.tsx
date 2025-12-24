import { Link } from "react-router-dom";
import { Home, Search, User } from "lucide-react";
import type { ComponentType } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";
import type { AuthStatus } from "../../stores/auth-store";

type NavItem = {
    to: string;
    label: string;
    icon?: ComponentType<{ className?: string }>;
};

type ShellHeaderProps = {
    navItems: NavItem[];
    pathname: string;
    userEmail: string | null;
    authStatus: AuthStatus;
    authMessage: string;
    onGithubLogin: () => void;
};

export function ShellHeader({ navItems, pathname, userEmail, authStatus, authMessage, onGithubLogin }: ShellHeaderProps) {
    return (
        <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-3 px-4 py-4">
                <Link to="/" className="flex items-center gap-2 text-sm font-semibold">
                    <div className="h-8 w-8 rounded-full bg-primary/10" />
                    <span>K3H4</span>
                </Link>
                <nav className="flex flex-1 flex-wrap items-center gap-2 text-sm">
                    {navItems.map((item) => {
                        const active = pathname === item.to;
                        const Icon = item.icon ?? Home;
                        return (
                            <Link
                                key={item.to}
                                to={item.to}
                                className={cn(
                                    "inline-flex items-center gap-2 rounded-full px-3 py-1.5 transition hover:bg-accent",
                                    active ? "bg-accent text-foreground" : "text-muted-foreground"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
                <div className="flex items-center gap-2">
                    <SearchInput />
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label={userEmail ? `Signed in as ${userEmail}` : "Sign in with GitHub"}
                        onClick={onGithubLogin}
                        disabled={authStatus === "loading"}
                    >
                        <User className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            {authMessage ? (
                <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 pb-3 text-xs text-muted-foreground">
                    <span>{userEmail ? `Signed in as ${userEmail}` : authMessage}</span>
                </div>
            ) : null}
        </header>
    );
}

function SearchInput() {
    return (
        <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="h-9 w-56 pl-9" placeholder="Search (disabled)" aria-label="Search" disabled />
        </div>
    );
}
