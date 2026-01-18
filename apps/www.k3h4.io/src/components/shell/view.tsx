import type { ReactNode, TouchEvent } from "react";
import { useEffect, useRef, useState } from "react";

import type { AuthStatus, ProfileState } from "../../stores/auth-store";
import type { NavItem } from "./nav-links";
import { ShellHeader } from "./header";
import { ShellLayout } from "./layout";
import { ImmersiveWorld, type IndustryModuleKey, type WorldNode } from "./immersive-world";
import { StatusLine } from "./status-line";
import { WorldMapOverlay } from "./world-map-overlay";
import { ContextHud } from "./context-hud";
import { ContextPanel } from "./context-panel";
import { CommandSurface } from "./command-surface";
import { CollapsedPanelHint } from "./collapsed-panel-hint";

export type ShellViewModule = WorldNode;

export type ShellViewProps = {
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
    onGithubLogin: () => void;
    onLinkedinLogin: () => void;
    brand?: ReactNode;
    actions?: ReactNode;
    modulesMenu?: ReactNode;
    isCallback: boolean;
    callback: ReactNode;
    signedIn: ReactNode;
    signedOut: ReactNode;
    modules: ShellViewModule[];
    activeModuleKey: IndustryModuleKey;
    onSelectModule: (key: IndustryModuleKey) => void;
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
    swaggerUrl,
    onGithubLogin,
    onLinkedinLogin,
    brand,
    actions,
    modulesMenu,
    isCallback,
    callback,
    signedIn,
    signedOut,
    modules,
    activeModuleKey,
    onSelectModule,
    onDeleteAccount,
    deletingAccount,
    deleteProgress,
    deleteStatusText,
}: ShellViewProps) {
    const isAuthenticated = !!userEmail || authStatus === "success";
    const activeModule = modules.find((module) => module.key === activeModuleKey) ?? modules[0];
    const activeIndex = Math.max(0, modules.findIndex((module) => module.key === activeModuleKey));
    const previousModule = modules[(activeIndex - 1 + modules.length) % modules.length];
    const nextModule = modules[(activeIndex + 1) % modules.length];
    const contextContent = isCallback ? callback : isAuthenticated ? signedIn : signedOut;

    const [panelOpen, setPanelOpen] = useState(true);
    const [mapOpen, setMapOpen] = useState(false);
    const [enteringLabel, setEnteringLabel] = useState<string | null>(null);

    useEffect(() => {
        setEnteringLabel(activeModule.label);
        const timer = window.setTimeout(() => setEnteringLabel(null), 1200);
        return () => window.clearTimeout(timer);
    }, [activeModule.key, activeModule.label]);

    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setPanelOpen(false);
                setMapOpen(false);
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    const touchStart = useRef<{ x: number; y: number; t: number } | null>(null);
    const swipeThreshold = 64;
    const maxDuration = 650;
    const handlePrev = () => onSelectModule(previousModule.key);
    const handleNext = () => onSelectModule(nextModule.key);
    const handleOpenMap = () => setMapOpen(true);
    const handleCloseMap = () => setMapOpen(false);
    const handleTogglePanel = () => setPanelOpen((prev) => !prev);

    const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
        const touch = event.touches[0];
        touchStart.current = { x: touch.clientX, y: touch.clientY, t: performance.now() };
    };

    const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
        if (!touchStart.current) return;
        const touch = event.changedTouches[0];
        const dx = touch.clientX - touchStart.current.x;
        const dy = touch.clientY - touchStart.current.y;
        const dt = performance.now() - touchStart.current.t;
        touchStart.current = null;

        if (dt > maxDuration) return;
        if (Math.abs(dx) < swipeThreshold || Math.abs(dx) < Math.abs(dy)) return;

        if (dx > 0) onSelectModule(previousModule.key);
        else onSelectModule(nextModule.key);
    };

    return (
        <ShellLayout
            className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_16%_18%,rgba(88,224,196,0.16),transparent_34%),radial-gradient(circle_at_84%_18%,rgba(120,178,255,0.14),transparent_30%),radial-gradient(circle_at_46%_82%,rgba(251,146,60,0.16),transparent_34%)]" aria-hidden />
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(115deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0)_32%,rgba(255,255,255,0.05)_62%,rgba(255,255,255,0)_100%)]" aria-hidden />
            <ImmersiveWorld nodes={modules} activeKey={activeModule.key} onSelect={onSelectModule} />

            <div className="relative z-10 flex min-h-screen flex-col">
                <ShellHeader
                    navItems={navItems}
                    pathname={pathname}
                    userEmail={userEmail}
                    swaggerUrl={swaggerUrl}
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
                    onLinkedinLogin={onLinkedinLogin}
                    onDeleteAccount={onDeleteAccount}
                    deletingAccount={deletingAccount}
                    deleteProgress={deleteProgress}
                    deleteStatusText={deleteStatusText}
                    activeLabel={activeModule.label}
                    activeGlyph={activeModule.glyph}
                    previousLabel={previousModule.label}
                    nextLabel={nextModule.label}
                    onPrevContext={handlePrev}
                    onNextContext={handleNext}
                    onOpenMap={handleOpenMap}
                />

                <div className="pointer-events-none fixed left-0 right-0 top-20 z-10 flex justify-center px-4 md:top-24">
                    <ContextHud
                        module={activeModule}
                        userEmail={userEmail}
                        authMessage={authMessage}
                        panelOpen={panelOpen}
                        onTogglePanel={handleTogglePanel}
                        enteringLabel={enteringLabel}
                    />
                </div>

                <div className="relative z-10 flex-1">
                    <div className="mx-auto flex w-full max-w-6xl flex-col px-4 pb-36 pt-28 md:grid md:grid-cols-[minmax(0,1fr)_minmax(320px,38vw)] md:items-start md:gap-6 md:pt-32">
                        <div className="hidden md:block" />
                        {panelOpen ? (
                            <ContextPanel module={activeModule} onClose={handleTogglePanel}>
                                {contextContent}
                            </ContextPanel>
                        ) : (
                            <CollapsedPanelHint accent={activeModule.accent} onOpen={handleTogglePanel} label={activeModule.label} glyph={activeModule.glyph} />
                        )}
                    </div>
                </div>

                <CommandSurface
                    accent={activeModule.accent}
                    previousLabel={previousModule.label}
                    nextLabel={nextModule.label}
                    onPrevious={handlePrev}
                    onNext={handleNext}
                    onOpenMap={handleOpenMap}
                    onTogglePanel={handleTogglePanel}
                    panelOpen={panelOpen}
                />

                <StatusLine>{enteringLabel ? `Entering: ${enteringLabel}` : userEmail ? `Signed in as ${userEmail}` : authMessage}</StatusLine>
            </div>

            <WorldMapOverlay
                open={mapOpen}
                nodes={modules}
                activeKey={activeModule.key}
                onSelect={(key) => {
                    onSelectModule(key);
                    setPanelOpen(true);
                    setMapOpen(false);
                }}
                onClose={handleCloseMap}
            />
        </ShellLayout>
    );
}
