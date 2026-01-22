import { useMemo } from "react";

import { Tabs } from "../../radix-primitives";
import { Button, Grid, MetricTile, Stack } from "../../components/ui";
import { useAuthStore } from "../../zustand-stores/auth";
import { useCulinaryState } from "../../react-hooks/culinary";
import { usePosState } from "../../react-hooks/pos";
import { useArcadeState } from "../../react-hooks/arcade";
import { useStorefrontsStore, type StorefrontsTab } from "../../zustand-stores/storefronts";
import { CulinaryBoard } from "../CulinaryBoard";
import { PosBoard } from "../PosBoard";
import { ArcadeBoard } from "../ArcadeBoard";
import { StorefrontsActionsPanel } from "./StorefrontsActionsPanel";

export function StorefrontsDashboard() {
    const { session } = useAuthStore();
    const { overview: culinaryOverview, status: culinaryStatus, fetchOverview: fetchCulinary } = useCulinaryState();
    const { overview: posOverview, status: posStatus, fetchOverview: fetchPos } = usePosState();
    const { overview: arcadeOverview, status: arcadeStatus, fetchOverview: fetchArcade } = useArcadeState();
    const { activeTab, setActiveTab } = useStorefrontsStore();

    const handleTabChange = (key: string) => setActiveTab(key as StorefrontsTab);

    const anyLoading = [culinaryStatus, posStatus, arcadeStatus].some((s) => s === "loading");

    const kpis = useMemo(
        () => [
            {
                label: "Culinary",
                value: culinaryOverview ? `${culinaryOverview.menuItems.length}` : "-",
                hint: "Menu items",
                accent: "#fb7185",
            },
            {
                label: "POS",
                value: posOverview ? `₭${posOverview.metrics.grossRevenue}` : "-",
                hint: "Gross",
                accent: "#f472b6",
            },
            {
                label: "Arcade",
                value: arcadeOverview ? `${arcadeOverview.machines.length} machines` : "-",
                hint: "Devices",
                accent: "#f472ff",
            },
            {
                label: "Sessions",
                value: arcadeOverview ? `${arcadeOverview.sessions.length}` : "-",
                hint: "Arcade play",
                accent: "#22d3ee",
            },
        ],
        [culinaryOverview, posOverview, arcadeOverview],
    );

    const handleRefreshAll = () => {
        if (!session?.accessToken) return;
        fetchCulinary();
        fetchPos();
        fetchArcade();
    };

    return (
        <Stack gap="lg">
            <div className="space-y-2">
                <div className="inline-flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-emerald-100">
                    <span className="rounded-full border border-emerald-300/30 bg-emerald-500/15 px-3 py-1">Storefronts</span>
                    <span className="text-[11px] text-slate-300">Culinary / POS / Arcade</span>
                </div>
                <div className="text-3xl font-semibold text-white">Storefront control</div>
                <p className="max-w-3xl text-sm text-slate-300">Menus, sales orchestration, and arcade engagement in one panel.</p>
                <div className="flex flex-wrap items-center gap-2">
                    {!session ? <div className="text-xs text-amber-200">Sign in to load live storefront data.</div> : null}
                    <div className="flex items-center gap-2">
                        <Button accent="#22d3ee" onClick={handleRefreshAll} disabled={!session?.accessToken || anyLoading}>
                            Refresh all
                        </Button>
                        <Button accent="#fb7185" variant="outline" onClick={() => setActiveTab("culinary")}>
                            Culinary
                        </Button>
                        <Button accent="#f472b6" variant="outline" onClick={() => setActiveTab("pos")}>
                            POS
                        </Button>
                        <Button accent="#f472ff" variant="outline" onClick={() => setActiveTab("arcade")}>
                            Arcade
                        </Button>
                    </div>
                </div>
            </div>

            <Grid gap="md" smCols={2} lgCols={4}>
                {kpis.map((kpi) => (
                    <MetricTile key={kpi.label} label={kpi.label} value={kpi.value} hint={kpi.hint} accent={kpi.accent} />
                ))}
            </Grid>

            <StorefrontsActionsPanel />

            <Tabs
                value={activeTab}
                onValueChange={handleTabChange}
                tabs={[
                    { key: "culinary", label: "Culinary", content: <CulinaryBoard /> },
                    { key: "pos", label: "POS", content: <PosBoard /> },
                    { key: "arcade", label: "Arcade", content: <ArcadeBoard /> },
                ]}
                className="w-full"
            />
        </Stack>
    );
}
