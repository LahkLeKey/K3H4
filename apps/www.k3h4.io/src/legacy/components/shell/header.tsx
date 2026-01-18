import type { ReactNode } from "react";
import { Home, LogOut, Map, MoveLeft, MoveRight } from "lucide-react";

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
import { ShellBrand } from "./brand";
import { ShellActionBar } from "./action-bar";
import { SearchInput } from "./search-input";
import { ProfilePanel } from "../profile-panel";

type ShellHeaderProps = {
    navItems: NavItem[];
    pathname: string;
    userEmail: string | null;
    swaggerUrl?: string;
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
    onLinkedinLogin?: () => void;
    activeLabel: string;
    activeGlyph?: string;
    previousLabel: string;
    nextLabel: string;
    onPrevContext: () => void;
    onNextContext: () => void;
    onOpenMap: () => void;
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
    swaggerUrl,
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
    activeLabel,
    activeGlyph,
    previousLabel,
    nextLabel,
    onPrevContext,
    onNextContext,
    onOpenMap,
}: ShellHeaderProps) {
    const displayName = profile?.displayName || userEmail || "Your profile";
    const avatarUrl = profile?.avatarUrl || undefined;
    const signedIn = !!userEmail || authStatus === "success";

    return (
        <header className="fixed inset-x-0 top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
            <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-3 px-4 py-4">
                {brand ?? <ShellBrand />}
                <ContextControls
                    activeLabel={activeLabel}
                    activeGlyph={activeGlyph}
                    previousLabel={previousLabel}
                    nextLabel={nextLabel}
                    onPrev={onPrevContext}
                    onNext={onNextContext}
                    onOpenMap={onOpenMap}
                />
                <NavLinks
                    items={navItems.map((item) => ({ icon: Home, ...item }))}
                    activePath={pathname}
                    pillClassName="min-h-9"
                />
                {swaggerUrl ? (
                    <Button asChild variant="outline" className="ml-1">
                        <a href={swaggerUrl} target="_blank" rel="noreferrer">
                            API Docs
                        </a>
                    </Button>
                ) : null}
                {!signedIn ? (
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={onGithubLogin}>
                            GitHub
                        </Button>
                        <Button variant="default" size="sm" onClick={onLinkedinLogin}>
                            LinkedIn
                        </Button>
                    </div>
                ) : null}
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
        </header>
    );
}

type ContextControlsProps = {
    activeLabel: string;
    activeGlyph?: string;
    previousLabel: string;
    nextLabel: string;
    onPrev: () => void;
    onNext: () => void;
    onOpenMap: () => void;
};

function ContextControls({ activeLabel, activeGlyph, previousLabel, nextLabel, onPrev, onNext, onOpenMap }: ContextControlsProps) {
    return (
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 text-white shadow-sm backdrop-blur">
            <Button variant="ghost" size="icon" onClick={onPrev} aria-label={`Go to ${previousLabel}`} className="rounded-full text-white/90">
                <MoveLeft className="h-4 w-4" />
            </Button>
            <div className="flex flex-col leading-tight">
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-300">Context</span>
                <span className="text-sm font-semibold text-white">{activeGlyph ? `${activeGlyph} ${activeLabel}` : activeLabel}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={onNext} aria-label={`Go to ${nextLabel}`} className="rounded-full text-white/90">
                <MoveRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onOpenMap} aria-label="Open world map" className="rounded-full text-white/90">
                <Map className="h-4 w-4" />
            </Button>
        </div>
    );
}
