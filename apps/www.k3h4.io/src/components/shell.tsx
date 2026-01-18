import type { JSX } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Building2, Check, ChevronsUpDown } from "lucide-react";

import { GithubCallbackPage } from "../pages/github-callback";
import { LinkedinCallbackPage } from "../pages/linkedin-callback";
import { AuthAccessSection } from "./auth-access-section";
import { BankTable } from "./bank/bank-table";
import { AssignmentAgency } from "./agency/assignment-agency";
import { FreightManager } from "./freight/freight-manager";
import { PersonaTable } from "./persona/persona-table";
import { PersonaCompatibilityPanel } from "./persona/persona-compatibility-panel";
import { WarehouseDashboard } from "./warehouse/warehouse-dashboard";
import { PosDashboard } from "./pos/pos-dashboard";
import { AgricultureDashboard } from "./agriculture/agriculture-dashboard";
import { CulinaryOps } from "./culinary/culinary-ops";
import { GraphicsEngineModule } from "./graphics-engine/graphics-engine";
import { FantasyRpgModule } from "./rpg/fantasy-rpg";
import { ArcadeHub } from "./arcade/arcade-hub";
import { LaplaceTransformModule } from "./laplace/laplace-transform";
import type { HudChip, IndustryModuleKey, WorldEnvironment } from "./shell/immersive-world";
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

type IndustryModule = {
    key: IndustryModuleKey;
    label: string;
    description: string;
    glyph: string;
    accent: string;
    position: [number, number, number];
    environment: WorldEnvironment;
    hudChips?: HudChip[];
    render: () => JSX.Element;
};

const baseEnvironment: WorldEnvironment = {
    background: "#05070d",
    fog: { color: "#05070d", near: 10, far: 46 },
    keyLight: { color: "#b8fff0", intensity: 1.1, position: [7, 10, 9] },
    fillLight: { color: "#72a8ff", intensity: 0.55, position: [-6, 4, -4] },
    rimLight: { color: "#72f0d0", intensity: 0.4, position: [0, 8, -6] },
    grid: { cell: "#1c2836", section: "#273b58" },
};

function createEnvironment(accent: string, overrides?: Partial<WorldEnvironment>): WorldEnvironment {
    const keyLight = { ...baseEnvironment.keyLight, color: accent, ...overrides?.keyLight };
    const fillLight = overrides?.fillLight ? { ...baseEnvironment.fillLight!, ...overrides.fillLight } : baseEnvironment.fillLight;
    const rimLight = overrides?.rimLight ? { ...baseEnvironment.rimLight!, ...overrides.rimLight } : baseEnvironment.rimLight;
    const fog = { ...baseEnvironment.fog, ...overrides?.fog };
    const grid = overrides?.grid ? { ...baseEnvironment.grid!, ...overrides.grid } : baseEnvironment.grid;
    return {
        ...baseEnvironment,
        ...overrides,
        keyLight,
        fillLight,
        rimLight,
        fog,
        grid,
        background: overrides?.background ?? baseEnvironment.background,
    };
}

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
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full border border-white/15 bg-white/5 text-white shadow-sm backdrop-blur"
                    disabled={disabled}
                    aria-label={`Open context menu. Active: ${activeModule.label}`}
                >
                    <Menu className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[300px] p-0">
                <div className="flex items-center gap-3 border-b border-white/10 bg-slate-900/80 px-4 py-3 text-white">
                    <Compass className="h-4 w-4 text-emerald-200" />
                    <div className="flex flex-col leading-tight">
                        <span className="text-[11px] uppercase tracking-[0.18em] text-slate-300">Contexts</span>
                        <span className="text-sm font-semibold">{activeModule.glyph ? `${activeModule.glyph} ${activeModule.label}` : activeModule.label}</span>
                    </div>
                </div>
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
                        <span className="mt-1 h-2.5 w-2.5 rounded-full" style={{ background: module.accent }} />
                        <div className="flex flex-col">
                            <span className="font-semibold text-white">{module.glyph ? `${module.glyph} ${module.label}` : module.label}</span>
                            <span className="text-xs text-slate-400">{module.description}</span>
                        </div>
                        {module.key === activeKey ? <Check className="ml-auto h-4 w-4 text-emerald-200" /> : null}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function Shell() {
    const location = useLocation();
    const navigate = useNavigate();
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

    const handleModuleChange = useCallback((next: IndustryModuleKey) => {
        setActiveModule(next);
        navigate(`/${next}`);
        void trackTelemetry("shell.module.select", { module: next, userEmail });
    }, [navigate, userEmail]);

    useEffect(() => {
        setTelemetryApiBase(apiBase);
    }, [apiBase]);

    const industryModules: IndustryModule[] = useMemo(() => [
        {
            key: "bank",
            label: "Bank",
            description: "K3H4-Coin Bank",
            glyph: "🏦",
            accent: "#58e0c4",
            position: [4, 1.6, 6],
            environment: createEnvironment("#58e0c4", {
                fog: { color: "#05070d", near: 9, far: 40 },
                rimLight: { color: "#88ffe5", intensity: 0.5, position: [0, 7, -5] },
            }),
            hudChips: [
                { label: "Status", value: "Vault online", tone: "info" },
                { label: "Session", value: userEmail ? "Signed in" : "Guest", tone: userEmail ? "positive" : "warning" },
            ],
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
            glyph: "👤",
            accent: "#a78bfa",
            position: [0.5, 1.5, 7.5],
            environment: createEnvironment("#a78bfa", {
                background: "#0b0a12",
                fog: { color: "#0b0a12", near: 11, far: 42 },
                rimLight: { color: "#cbb7ff", intensity: 0.45, position: [1, 7, -4] },
            }),
            hudChips: [
                { label: "Status", value: "Models ready", tone: "info" },
                { label: "Compare", value: "Compatibility", tone: "neutral" },
            ],
            render: () => (
                <IndustryDashboard>
                    <PersonaCompatibilityPanel apiBase={apiBase} userEmail={userEmail} />
                    <PersonaTable apiBase={apiBase} userEmail={userEmail} />
                </IndustryDashboard>
            ),
        },
        {
            key: "agency",
            label: "Staffing",
            description: "Assignments, timecards, and payouts",
            glyph: "🧭",
            accent: "#7dd3fc",
            position: [-5, 1.4, 4.5],
            environment: createEnvironment("#7dd3fc", {
                background: "#081018",
                fog: { color: "#081018", near: 10, far: 42 },
                rimLight: { color: "#b7e5ff", intensity: 0.48, position: [-2, 8, -5] },
            }),
            hudChips: [
                { label: "Status", value: "Roster live", tone: "info" },
                { label: "Flow", value: "Approvals", tone: "neutral" },
            ],
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
            glyph: "🚚",
            accent: "#fbbf24",
            position: [-8, 1.5, 0],
            environment: createEnvironment("#fbbf24", {
                background: "#0f0c06",
                const moduleMenus = (
                    <div className="flex flex-wrap items-center gap-2">
                        <IndustryModuleMenu
                            modules={industryModules}
                            activeKey={activeModule}
                            onSelect={handleModuleChange}
                            disabled={false}
                        />
                    </div>
                );
                    < FreightManager apiBase = { apiBase } userEmail = { userEmail } />
                </IndustryDashboard >
            ),
},
{
    key: "warehouse",
        label: "Warehouse",
            description: "Inventory + freight handoff",
                glyph: "📦",
                    accent: "#e0e7ff",
                        position: [-4.5, 1.2, -4.5],
                            environment: createEnvironment("#e0e7ff", {
                                background: "#090c14",
                                fog: { color: "#090c14", near: 10, far: 40 },
                                grid: { cell: "#1f2433", section: "#2b3147" },
                            }),
                                hudChips: [
                                    { label: "Status", value: "Bays active", tone: "info" },
                                    { label: "Link", value: "Freight", tone: "neutral" },
                                ],
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
                glyph: "🧾",
                    accent: "#f472b6",
                        position: [2.5, 1.2, -6.5],
                            environment: createEnvironment("#f472b6", {
                                background: "#0d0a0d",
                                fog: { color: "#0d0a0d", near: 10, far: 38 },
                                rimLight: { color: "#ffc0e0", intensity: 0.42, position: [2, 7, -6] },
                            }),
                                hudChips: [
                                    { label: "Status", value: "Checkout ready", tone: "info" },
                                    { label: "Mode", value: "Omni-channel", tone: "neutral" },
                                ],
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
                glyph: "🌾",
                    accent: "#86efac",
                        position: [7, 1.5, -2.5],
                            environment: createEnvironment("#86efac", {
                                background: "#08100b",
                                fog: { color: "#08100b", near: 9, far: 38 },
                                rimLight: { color: "#b5ffd6", intensity: 0.42, position: [0, 7, -4] },
                            }),
                                hudChips: [
                                    { label: "Status", value: "Plots live", tone: "info" },
                                    { label: "Tool", value: "Inspect / Build", tone: "neutral" },
                                ],
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
                glyph: "🛰️",
                    accent: "#60a5fa",
                        position: [0.5, 2, 1],
                            environment: createEnvironment("#60a5fa", {
                                background: "#081018",
                                fog: { color: "#081018", near: 10, far: 44 },
                                rimLight: { color: "#b7d8ff", intensity: 0.45, position: [0, 8, -6] },
                            }),
                                hudChips: [
                                    { label: "Status", value: "Scenes mounted", tone: "info" },
                                    { label: "Mode", value: "Spatial", tone: "neutral" },
                                ],
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
    key: "laplace",
        label: "Laplace",
            description: "Laplace transform surface via Three.js",
                glyph: "📈",
                    accent: "#94c5ff",
                        position: [8.5, 1.6, 4.5],
                            environment: createEnvironment("#94c5ff", {
                                background: "#0a0f16",
                                fog: { color: "#0a0f16", near: 10, far: 42 },
                                rimLight: { color: "#b7d4ff", intensity: 0.46, position: [1, 8, -6] },
                            }),
                                hudChips: [
                                    { label: "Status", value: "Surface live", tone: "info" },
                                    { label: "Tool", value: "Export / Snapshot", tone: "neutral" },
                                ],
                                    render: () => (
                                        <IndustryDashboard>
                                            <LaplaceTransformModule userEmail={userEmail} />
                                        </IndustryDashboard>
                                    ),
        },
{
    key: "rpg",
        label: "Fantasy RPG",
            description: "Three.js action slice with quests and skills",
                glyph: "⚔️",
                    accent: "#fbb6ce",
                        position: [-1, 2.6, -8],
                            environment: createEnvironment("#fbb6ce", {
                                background: "#0e0a10",
                                fog: { color: "#0e0a10", near: 10, far: 42 },
                                rimLight: { color: "#ffc1da", intensity: 0.44, position: [-1, 8, -6] },
                            }),
                                hudChips: [
                                    { label: "Status", value: "Scene ready", tone: "info" },
                                    { label: "Mode", value: "Questing", tone: "neutral" },
                                ],
                                    render: () => (
                                        <IndustryDashboard>
                                            <FantasyRpgModule userEmail={userEmail} />
                                        </IndustryDashboard>
                                    ),
        },
{
    key: "arcade",
        label: "Arcade",
            description: "Retro arcade ops: cards, top-ups, prizes, and games",
                glyph: "🕹️",
                    accent: "#f472ff",
                        position: [5.5, 1.8, 3.5],
                            environment: createEnvironment("#f472ff", {
                                background: "#0b0613",
                                fog: { color: "#0b0613", near: 9, far: 38 },
                                rimLight: { color: "#ffb3ff", intensity: 0.5, position: [1, 7, -5] },
                            }),
                                hudChips: [
                                    { label: "Status", value: "Floor open", tone: "info" },
                                    { label: "Run", value: "Tickets / Credits", tone: "neutral" },
                                ],
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
                glyph: "🍳",
                    accent: "#fb923c",
                        position: [1, 1.3, -3],
                            environment: createEnvironment("#fb923c", {
                                background: "#0d0a07",
                                fog: { color: "#0d0a07", near: 10, far: 38 },
                                rimLight: { color: "#ffcba0", intensity: 0.44, position: [0, 7, -5] },
                            }),
                                hudChips: [
                                    { label: "Status", value: "Prep live", tone: "info" },
                                    { label: "Link", value: "POS / Warehouse", tone: "neutral" },
                                ],
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

// Sync URL -> state when landing on /:module or hash-routed paths
useEffect(() => {
    const segment = (pathname || "/").split("/").filter(Boolean)[0];
    if (segment && moduleKeys.has(segment as IndustryModuleKey) && segment !== activeModule) {
        setActiveModule(segment as IndustryModuleKey);
    }
}, [pathname, moduleKeys, activeModule]);

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
    const handleKey = (event: KeyboardEvent) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        const currentIndex = industryModules.findIndex((module) => module.key === activeModule);
        if (currentIndex < 0) return;
        const delta = event.key === "ArrowLeft" ? -1 : 1;
        const nextIndex = (currentIndex + delta + industryModules.length) % industryModules.length;
        handleModuleChange(industryModules[nextIndex]?.key ?? activeModule);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
}, [activeModule, handleModuleChange, industryModules]);

const moduleWorldNodes = useMemo(() => industryModules.map(({ key, label, description, accent, position, glyph, environment, hudChips }) => ({
    key,
    label,
    description,
    accent,
    position,
    glyph,
    environment,
    hudChips,
})), [industryModules]);

const activeModuleConfig = industryModules.find((module) => module.key === activeModule) ?? industryModules[0];
const signedInView = activeModuleConfig?.render();
const moduleMenus = (
    <div className="flex flex-wrap items-center gap-2">
        <IndustryModuleMenu
            modules={industryModules}
            activeKey={activeModule}
            onSelect={handleModuleChange}
            disabled={false}
        />
    </div>
);
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
        modules={moduleWorldNodes}
        activeModuleKey={activeModule}
        onSelectModule={handleModuleChange}
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
