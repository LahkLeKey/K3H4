import type { JSX } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Building2, Check, ChevronsUpDown } from "lucide-react";

import { GithubCallbackPage } from "../pages/github-callback";
import { LinkedinCallbackPage } from "../pages/linkedin-callback";
import { AuthAccessSection } from "./auth-access-section";
import { BankTable } from "./bank/bank-table";
import { AssignmentAgency } from "./agency/assignment-agency";
import { FreightManager } from "./freight/freight-manager";
import { PersonaTable } from "./persona/persona-table";
import { WarehouseDashboard } from "./warehouse/warehouse-dashboard";
import { PosDashboard } from "./pos/pos-dashboard";
import { AgricultureDashboard } from "./agriculture/agriculture-dashboard";
import { CulinaryOps } from "./culinary/culinary-ops";
import { GraphicsEngineModule } from "./graphics-engine/graphics-engine";
import { ArcadeHub } from "./arcade/arcade-hub";
import { ShellView } from "./shell/view";
import { ShellBrand } from "./shell/brand";
import { IndustryDashboard } from "./industry-dashboard";
import { useAuthProfile } from "../hooks/use-auth-profile";
import { MODULE_STORAGE_KEY } from "../lib/constants";
import { trackTelemetry, setTelemetryApiBase } from "../lib/telemetry";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type IndustryModuleKey = "bank" | "persona" | "agency" | "freight" | "warehouse" | "pos" | "agriculture" | "culinary" | "graphics" | "arcade";

type IndustryModule = {
    key: IndustryModuleKey;
    label: string;
    description: string;
    render: () => JSX.Element;
};

const navItems = [{ to: "/", label: "Home" }];

type IndustryModuleMenuProps = {
    modules: IndustryModule[];
    activeKey: IndustryModuleKey;
    onSelect: (key: IndustryModuleKey) => void;
    disabled?: boolean;
};

function IndustryModuleMenu({ modules, activeKey, onSelect, disabled }: IndustryModuleMenuProps) {
    const activeModule = modules.find((module) => module.key === activeKey) ?? modules[0];
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className="inline-flex items-center gap-3 rounded-full border px-4 py-2"
                    disabled={disabled}
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <Building2 className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col items-start text-left">
                        <span className="text-xs uppercase tracking-wide text-muted-foreground">Industry module</span>
                        <span className="text-sm font-semibold leading-tight">{activeModule.label}</span>
                    </div>
                    <ChevronsUpDown className="ml-auto h-4 w-4 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[320px]">
                <DropdownMenuLabel>Industry modules</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {modules.map((module) => (
                    <DropdownMenuItem
                        key={module.key}
                        className="flex items-start gap-3"
                        onSelect={(event) => {
                            event.preventDefault();
                            onSelect(module.key);
                        }}
                    >
                        <div className="flex flex-col">
                            <span className="font-semibold">{module.label}</span>
                            <span className="text-xs text-muted-foreground">{module.description}</span>
                        </div>
                        {module.key === activeKey ? <Check className="ml-auto h-4 w-4" /> : null}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function Shell() {
    const location = useLocation();
    const pathname = location.pathname;
    const isGithubCallback = useMemo(() => pathname.startsWith("/auth/github"), [pathname]);
    const isLinkedinCallback = useMemo(() => pathname.startsWith("/auth/linkedin/callback"), [pathname]);
    const {
        apiBase,
        authStatus,
        authMessage,
        profile,
        profileMessage,
        setProfile,
        user,
        handleGithubLogin,
        handleLinkedinLogin,
        handleProfileSave,
        handleSignOut,
        handleDeleteAccount,
        deleteProgress,
        deleteStatusText,
        accountDeleteMutation,
        deleteStatusQuery
    } = useAuthProfile();

    const userEmail = user.status === "authenticated" ? user.email : null;
    const [activeModule, setActiveModule] = useState<IndustryModuleKey>("bank");
    const isAuthenticated = !!userEmail || authStatus === "success";

    const handleModuleChange = useCallback((next: IndustryModuleKey) => {
        setActiveModule(next);
        void trackTelemetry("shell.module.select", { module: next, userEmail });
    }, [userEmail]);

    useEffect(() => {
        setTelemetryApiBase(apiBase);
    }, [apiBase]);

    const industryModules: IndustryModule[] = useMemo(() => [
        {
            key: "bank",
            label: "Bank",
            description: "K3H4-Coin Bank",
            render: () => (
                <IndustryDashboard>
                    <BankTable apiBase={apiBase} userEmail={userEmail} />
                </IndustryDashboard>
            ),
        },
        {
            key: "persona",
            label: "Persona",
            description: "Mock personas for testing",
            render: () => (
                <IndustryDashboard>
                    <PersonaTable apiBase={apiBase} userEmail={userEmail} />
                </IndustryDashboard>
            ),
        },
        {
            key: "agency",
            label: "Staffing",
            description: "Assignments, timecards, and payouts",
            render: () => (
                <IndustryDashboard>
                    <AssignmentAgency apiBase={apiBase} userEmail={userEmail} />
                </IndustryDashboard>
            ),
        },
        {
            key: "freight",
            label: "Freight",
            description: "Routing, pricing, freight orders",
            render: () => (
                <IndustryDashboard>
                    <FreightManager apiBase={apiBase} userEmail={userEmail} />
                </IndustryDashboard>
            ),
        },
        {
            key: "warehouse",
            label: "Warehouse",
            description: "Inventory + freight handoff",
            render: () => (
                <IndustryDashboard>
                    <WarehouseDashboard
                        apiBase={apiBase}
                        userEmail={userEmail}
                        onNavigateFreight={() => handleModuleChange("freight")}
                    />
                </IndustryDashboard>
            ),
        },
        {
            key: "pos",
            label: "Point of Sale",
            description: "Omni-channel checkout + receipts",
            render: () => (
                <IndustryDashboard>
                    <PosDashboard apiBase={apiBase} userEmail={userEmail} />
                </IndustryDashboard>
            ),
        },
        {
            key: "agriculture",
            label: "Agriculture",
            description: "Farm logistics, lots, and yield tracking",
            render: () => (
                <IndustryDashboard>
                    <AgricultureDashboard />
                </IndustryDashboard>
            ),
        },
        {
            key: "graphics",
            label: "Graphics Engine",
            description: "R3F scenes for spatial planning and immersive flows",
            render: () => (
                <IndustryDashboard>
                    <GraphicsEngineModule
                        userEmail={userEmail}
                        onNavigate={handleModuleChange}
                    />
                </IndustryDashboard>
            ),
        },
        {
            key: "arcade",
            label: "Arcade",
            description: "Retro arcade ops: cards, top-ups, prizes, and games",
            render: () => (
                <IndustryDashboard>
                    <ArcadeHub apiBase={apiBase} userEmail={userEmail} />
                </IndustryDashboard>
            ),
        },
        {
            key: "culinary",
            label: "Culinary",
            description: "Menus, prep, and supply chain",
            render: () => (
                <IndustryDashboard>
                    <CulinaryOps
                        apiBase={apiBase}
                        userEmail={userEmail}
                        onNavigatePos={() => handleModuleChange("pos")}
                        onNavigateWarehouse={() => handleModuleChange("warehouse")}
                    />
                </IndustryDashboard>
            ),
        },
    ], [apiBase, userEmail, handleModuleChange]);

    const moduleKeys = useMemo(() => new Set(industryModules.map((module) => module.key)), [industryModules]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const storageKey = userEmail ? `${MODULE_STORAGE_KEY}:${userEmail}` : MODULE_STORAGE_KEY;
        const stored = localStorage.getItem(storageKey) || localStorage.getItem(MODULE_STORAGE_KEY);
        if (stored && moduleKeys.has(stored as IndustryModuleKey)) {
            setActiveModule(stored as IndustryModuleKey);
        }
    }, [moduleKeys, userEmail]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const storageKey = userEmail ? `${MODULE_STORAGE_KEY}:${userEmail}` : MODULE_STORAGE_KEY;
        localStorage.setItem(storageKey, activeModule);
    }, [activeModule, userEmail]);

    const activeModuleConfig = industryModules.find((module) => module.key === activeModule) ?? industryModules[0];
    const signedInView = activeModuleConfig?.render();
    const moduleMenus = isAuthenticated ? (
        <div className="flex flex-wrap items-center gap-2">
            <IndustryModuleMenu
                modules={industryModules}
                activeKey={activeModule}
                onSelect={handleModuleChange}
            />
        </div>
    ) : null;
    return (
        <ShellView
            navItems={navItems}
            pathname={pathname}
            swaggerUrl={apiBase ? `${apiBase}/docs` : undefined}
            userEmail={userEmail}
            authStatus={authStatus}
            authMessage={authMessage}
            profile={profile}
            profileLoading={false}
            profileMessage={profileMessage}
            setProfile={setProfile}
            onProfileSave={handleProfileSave}
            onSignOut={handleSignOut}
            onGithubLogin={handleGithubLogin}
            onLinkedinLogin={handleLinkedinLogin}
            brand={<ShellBrand />}
            modulesMenu={moduleMenus}
            isCallback={isGithubCallback || isLinkedinCallback}
            callback={isGithubCallback ? <GithubCallbackPage /> : isLinkedinCallback ? <LinkedinCallbackPage /> : null}
            signedIn={signedInView}
            signedOut={<AuthAccessSection
                title="Sign in to access K3H4"
                description="Authenticate to use the demo platform."
                userEmail={userEmail}
                authStatus={authStatus}
                authMessage={authMessage || ""}
                onGithubLogin={handleGithubLogin}
                onLinkedinLogin={handleLinkedinLogin}
            />}
            // Pass delete props for dropdown ProfilePanel
            onDeleteAccount={handleDeleteAccount}
            deletingAccount={accountDeleteMutation.isPending || deleteStatusQuery.isFetching}
            deleteProgress={deleteProgress}
            deleteStatusText={deleteStatusText}
        />
    );
}
