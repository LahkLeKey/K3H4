import type { JSX } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowRight, Building2, Check, ChevronsUpDown, Croissant, Wheat } from "lucide-react";

import { GithubCallbackPage } from "../pages/github-callback";
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
import { useAuthProfile } from "../hooks/use-auth-profile";
import { BUSINESS_STORAGE_KEY, MODULE_STORAGE_KEY } from "../lib/constants";
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

type BusinessScenarioKey = "bakery" | "farm" | "arcade";

type BusinessScenarioModule = {
    key: IndustryModuleKey;
    label: string;
    role: string;
};

type BusinessScenario = {
    key: BusinessScenarioKey;
    label: string;
    description: string;
    icon: typeof Building2;
    modules: BusinessScenarioModule[];
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

type BusinessModuleMenuProps = {
    scenarios: BusinessScenario[];
    activeKey: BusinessScenarioKey;
    onSelectScenario: (key: BusinessScenarioKey) => void;
    onSelectModule: (key: IndustryModuleKey) => void;
    disabled?: boolean;
};

function BusinessModuleMenu({ scenarios, activeKey, onSelectScenario, onSelectModule, disabled }: BusinessModuleMenuProps) {
    const activeScenario = scenarios.find((scenario) => scenario.key === activeKey) ?? scenarios[0];
    const ActiveIcon = activeScenario.icon ?? Building2;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className="inline-flex items-center gap-3 rounded-full border px-4 py-2"
                    aria-label={`Business flow: ${activeScenario.label}`}
                    disabled={disabled}
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <ActiveIcon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col items-start text-left">
                        <span className="text-xs uppercase tracking-wide text-muted-foreground">Business flow</span>
                        <span className="text-sm font-semibold leading-tight">{activeScenario.label}</span>
                    </div>
                    <ChevronsUpDown className="ml-auto h-4 w-4 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[360px]">
                <DropdownMenuLabel>Business modules</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {scenarios.map((scenario) => {
                    const ScenarioIcon = scenario.icon ?? Building2;
                    return (
                        <DropdownMenuItem
                            key={scenario.key}
                            className="flex items-start gap-3"
                            onSelect={(event) => {
                                event.preventDefault();
                                onSelectScenario(scenario.key);
                            }}
                        >
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                                <ScenarioIcon className="h-4 w-4" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold">{scenario.label}</span>
                                <span className="text-xs text-muted-foreground">{scenario.description}</span>
                            </div>
                            {scenario.key === activeKey ? <Check className="ml-auto h-4 w-4" /> : null}
                        </DropdownMenuItem>
                    );
                })}
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs uppercase tracking-wide text-muted-foreground">
                    Modules in this flow
                </DropdownMenuLabel>
                <div className="grid grid-cols-1 gap-1 p-2">
                    {activeScenario.modules.map((module) => (
                        <DropdownMenuItem
                            key={module.key}
                            className="flex items-start gap-3 rounded-md"
                            onSelect={(event) => {
                                event.preventDefault();
                                onSelectModule(module.key);
                            }}
                        >
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            <div className="flex flex-col">
                                <span className="font-semibold">{module.label}</span>
                                <span className="text-xs text-muted-foreground">{module.role}</span>
                            </div>
                        </DropdownMenuItem>
                    ))}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function Shell() {
    const location = useLocation();
    const pathname = location.pathname;
    const isCallback = useMemo(() => pathname.startsWith("/auth/github"), [pathname]);
    const {
        apiBase,
        authStatus,
        authMessage,
        profile,
        profileMessage,
        setProfile,
        setAuthState,
        user,
        handleGithubLogin,
        handleLinkedinLogin,
        handleProfileSave,
        deleteProgress,
        deleteStatusText,
    } = useAuthProfile();
    const userEmail = user.status === "authenticated" ? user.email : null;
    const [activeModule, setActiveModule] = useState<IndustryModuleKey>("bank");
    const [activeBusiness, setActiveBusiness] = useState<BusinessScenarioKey>("bakery");
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
            render: () => <BankTable apiBase={apiBase} userEmail={userEmail} />,
        },
        {
            key: "persona",
            label: "Persona",
            description: "Mock personas for testing",
            render: () => <PersonaTable apiBase={apiBase} userEmail={userEmail} />,
        },
        {
            key: "agency",
            label: "Staffing",
            description: "Assignments, timecards, and payouts",
            render: () => <AssignmentAgency apiBase={apiBase} userEmail={userEmail} />,
        },
        {
            key: "freight",
            label: "Freight",
            description: "Routing, pricing, freight orders",
            render: () => <FreightManager apiBase={apiBase} userEmail={userEmail} />,
        },
        {
            key: "warehouse",
            label: "Warehouse",
            description: "Inventory + freight handoff",
            render: () => (
                <WarehouseDashboard
                    apiBase={apiBase}
                    userEmail={userEmail}
                    onNavigateFreight={() => handleModuleChange("freight")}
                />
            ),
        },
        {
            key: "pos",
            label: "Point of Sale",
            description: "Omni-channel checkout + receipts",
            render: () => (
                <PosDashboard apiBase={apiBase} userEmail={userEmail} />
            ),
        },
        {
            key: "agriculture",
            label: "Agriculture",
            description: "Farm logistics, lots, and yield tracking",
            render: () => (
                <AgricultureDashboard
                    apiBase={apiBase}
                    userEmail={userEmail}
                    onNavigateFreight={() => handleModuleChange("freight")}
                />
            ),
        },
        {
            key: "graphics",
            label: "Graphics Engine",
            description: "R3F scenes for spatial planning and immersive flows",
            render: () => (
                <GraphicsEngineModule
                    userEmail={userEmail}
                    onNavigate={handleModuleChange}
                />
            ),
        },
        {
            key: "arcade",
            label: "Arcade",
            description: "Retro arcade ops: cards, top-ups, prizes, and games",
            render: () => <ArcadeHub apiBase={apiBase} userEmail={userEmail} />,
        },
        {
            key: "culinary",
            label: "Culinary",
            description: "Menus, prep, and supply chain",
            render: () => (
                <CulinaryOps
                    apiBase={apiBase}
                    userEmail={userEmail}
                    onNavigatePos={() => handleModuleChange("pos")}
                    onNavigateWarehouse={() => handleModuleChange("warehouse")}
                />
            ),
        },
    ], [apiBase, userEmail, handleModuleChange]);

    const businessScenarios: BusinessScenario[] = useMemo(() => [
        {
            key: "bakery",
            label: "Neighborhood Bakery",
            description: "Retail bakery orchestrating prep, stock, and checkout",
            icon: Croissant,
            modules: [
                { key: "culinary", label: "Culinary", role: "Menus, prep batches, and supply forecasts" },
                { key: "warehouse", label: "Warehouse", role: "Ingredients, packaging, and staging for daily runs" },
                { key: "freight", label: "Freight", role: "Inbound flour, dairy, and return routes for stale goods" },
                { key: "graphics", label: "Graphics Engine", role: "3D menu staging, service lanes, and spatial promos" },
                { key: "pos", label: "Point of Sale", role: "Counter, catering, and online checkout" },
                { key: "bank", label: "Bank", role: "Settlements, rewards, and supplier payouts" },
            ],
        },
        {
            key: "farm",
            label: "Farm Supply Loop",
            description: "Farm supplies the bakery and buys back waste for feed",
            icon: Wheat,
            modules: [
                { key: "agriculture", label: "Agriculture", role: "Crop plans, harvest lots, and yield tracking" },
                { key: "freight", label: "Freight", role: "Deliver grain to bakery; schedule waste pickups" },
                { key: "warehouse", label: "Warehouse", role: "Hold grain pre-shipment and returned scraps" },
                { key: "culinary", label: "Culinary", role: "Share bake specs so runs match grain quality" },
                { key: "graphics", label: "Graphics Engine", role: "Plot overlays and future simulation nodes" },
                { key: "bank", label: "Bank", role: "Pay for deliveries and credit waste-to-feed buybacks" },
            ],
        },
        {
            key: "arcade",
            label: "Retro Arcade",
            description: "Physical arcade with playable Three.js machines and coin top-ups",
            icon: Building2,
            modules: [
                { key: "arcade", label: "Arcade", role: "Operate cards, sessions, and prizes" },
                { key: "graphics", label: "Graphics Engine", role: "3D arcade machine (Snake)" },
                { key: "pos", label: "Point of Sale", role: "Sell plays, prizes, and session receipts" },
                { key: "bank", label: "Bank", role: "Load k3h4-coin credits onto game cards" },
                { key: "warehouse", label: "Warehouse", role: "Manage physical prize inventory" },
                { key: "persona", label: "Persona", role: "Staff shifts and arcade attendants" },
            ],
        },
    ], []);

    const businessKeys = useMemo(() => new Set(businessScenarios.map((scenario) => scenario.key)), [businessScenarios]);

    const handleBusinessChange = useCallback((next: BusinessScenarioKey) => {
        setActiveBusiness(next);
        const scenario = businessScenarios.find((item) => item.key === next);
        const defaultModule = scenario?.modules[0]?.key;
        if (defaultModule) {
            handleModuleChange(defaultModule);
        }
        void trackTelemetry("shell.business.select", { business: next, userEmail });
    }, [businessScenarios, handleModuleChange, userEmail]);

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

    useEffect(() => {
        if (typeof window === "undefined") return;
        const storageKey = userEmail ? `${BUSINESS_STORAGE_KEY}:${userEmail}` : BUSINESS_STORAGE_KEY;
        const stored = localStorage.getItem(storageKey) || localStorage.getItem(BUSINESS_STORAGE_KEY);
        if (stored && businessKeys.has(stored as BusinessScenarioKey)) {
            setActiveBusiness(stored as BusinessScenarioKey);
        }
    }, [businessKeys, userEmail]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const storageKey = userEmail ? `${BUSINESS_STORAGE_KEY}:${userEmail}` : BUSINESS_STORAGE_KEY;
        localStorage.setItem(storageKey, activeBusiness);
    }, [activeBusiness, userEmail]);

    const activeModuleConfig = industryModules.find((module) => module.key === activeModule) ?? industryModules[0];
    const signedInView = activeModuleConfig?.render();
    const moduleMenus = isAuthenticated ? (
        <div className="flex flex-wrap items-center gap-2">
            <IndustryModuleMenu
                modules={industryModules}
                activeKey={activeModule}
                onSelect={handleModuleChange}
            />
            <BusinessModuleMenu
                scenarios={businessScenarios}
                activeKey={activeBusiness}
                onSelectScenario={handleBusinessChange}
                onSelectModule={handleModuleChange}
            />
        </div>
    ) : null;
    return (
        <ShellView
            navItems={navItems}
            pathname={pathname}
            userEmail={userEmail}
            authStatus={authStatus}
            authMessage={authMessage}
            profile={profile}
            profileLoading={false}
            profileMessage={profileMessage}
            setProfile={setProfile}
            onProfileSave={handleProfileSave}
            onSignOut={() => setAuthState("idle", "Signed out")}
            onGithubLogin={handleGithubLogin}
            onLinkedinLogin={handleLinkedinLogin}
            brand={<ShellBrand />}
            modulesMenu={moduleMenus}
            isCallback={isCallback}
            callback={<GithubCallbackPage />}
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
            onDeleteAccount={undefined}
            deletingAccount={false}
            deleteProgress={deleteProgress}
            deleteStatusText={deleteStatusText}
        />
    );
}
