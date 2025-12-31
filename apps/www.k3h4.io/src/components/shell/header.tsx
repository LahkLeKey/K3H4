import type { ReactNode } from "react";
import { Home, LogOut } from "lucide-react";

import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import type { AuthStatus, ProfileState } from "../../stores/auth-store";
import type { NavItem } from "./nav-links";
import { NavLinks } from "./nav-links";
import { StatusLine } from "./status-line";
import { ShellBrand } from "./brand";
import { ShellActionBar } from "./action-bar";
import { SearchInput } from "./search-input";
import { ProfilePanel } from "../profile-panel";

type ShellHeaderProps = {
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
    brand?: ReactNode;
    actions?: ReactNode;
    modulesMenu?: ReactNode;
    onGithubLogin?: () => void;
    // Delete props for ProfilePanel in dropdown
    onDeleteAccount?: (confirmText: string) => Promise<void> | void;
    deletingAccount?: boolean;
    deleteProgress?: number;
    deleteStatusText?: string;
};

export function ShellHeader({
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
    brand,
    actions,
    modulesMenu,
    onDeleteAccount,
    deletingAccount,
    deleteProgress,
    deleteStatusText,
}: ShellHeaderProps) {
    const displayName = profile?.displayName || userEmail || "Your profile";
    const avatarUrl = profile?.avatarUrl || undefined;
    const signedIn = !!userEmail || authStatus === "success";

    return (
        <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-3 px-4 py-4">
                {brand ?? <ShellBrand />}
                <NavLinks
                    items={navItems.map((item) => ({ icon: Home, ...item }))}
                    activePath={pathname}
                    pillClassName="min-h-9"
                />
                {modulesMenu}
                {actions ?? (
                    <ShellActionBar>
                        <SearchInput placeholder="Search (disabled)" disabled />
                        {signedIn && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" aria-label={displayName}>
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={avatarUrl} alt={displayName} />
                                            <AvatarFallback className="text-xs">{displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[360px] p-0" align="end">
                                    <div className="p-4">
                                        <DropdownMenuLabel className="px-0 pb-3 text-base font-semibold">Profile</DropdownMenuLabel>
                                        <ProfilePanel
                                            userEmail={userEmail}
                                            profile={profile}
                                            profileLoading={profileLoading}
                                            profileMessage={profileMessage}
                                            setProfile={setProfile}
                                            onSave={onProfileSave}
                                            onSignOut={onSignOut}
                                            onDeleteAccount={onDeleteAccount}
                                            deletingAccount={deletingAccount ?? false}
                                            deleteProgress={deleteProgress ?? 0}
                                            deleteStatusText={deleteStatusText ?? ""}
                                        />
                                    </div>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="gap-2 text-sm text-destructive" onSelect={onSignOut}>
                                        <LogOut className="h-4 w-4" />
                                        Sign out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </ShellActionBar>
                )}
            </div>
            <StatusLine>{userEmail ? `Signed in as ${userEmail}` : authMessage}</StatusLine>
        </header>
    );
}
