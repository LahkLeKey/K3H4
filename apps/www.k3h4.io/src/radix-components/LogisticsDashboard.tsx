import { useMemo, useState } from "react";

import { Tabs } from "../radix-primitives";
import { Button, Grid, MetricTile, Stack } from "../components/ui";
import { useAuthStore } from "../zustand-stores/auth";
import { useFreightState } from "../react-hooks/freight";
import { useWarehouseState } from "../react-hooks/warehouse";
import { useAgricultureState } from "../react-hooks/agriculture";
import { useUsdaState } from "../react-hooks/usda";
import { useCulinaryState } from "../react-hooks/culinary";
import { usePosState } from "../react-hooks/pos";
import { FreightBoard } from "./FreightBoard";
import { WarehouseBoard } from "./WarehouseBoard";
import { AgricultureBoard } from "./AgricultureBoard";
import { UsdaBoard } from "./UsdaBoard";
import { CulinaryBoard } from "./CulinaryBoard";
import { PosBoard } from "./PosBoard";
import { LogisticsActionsPanel } from "./LogisticsActionsPanel";

export function LogisticsDashboard() {
    const { session } = useAuthStore();
    const { totals, status: freightStatus, fetchLoads } = useFreightState();
    const { items, status: warehouseStatus, fetchItems } = useWarehouseState();
    const { overview: agOverview, status: agStatus, fetchOverview: fetchAg } = useAgricultureState();
    const { regions, commodities, countries, status: usdaStatus, fetchReference } = useUsdaState();
    const { overview: culinaryOverview, status: culinaryStatus, fetchOverview: fetchCulinary } = useCulinaryState();
    const { overview: posOverview, status: posStatus, fetchOverview: fetchPos } = usePosState();
    const [activeTab, setActiveTab] = useState("freight");

    const anyLoading = [freightStatus, warehouseStatus, agStatus, usdaStatus, culinaryStatus, posStatus].some((s) => s === "loading");

    const kpis = useMemo(
        () => [
            {
                label: "Loads",
                value: totals ? `${totals.active + totals.completed}` : "-",
                hint: "Active + done",
                accent: "#fbbf24",
            },
            {
                label: "Warehouse",
                value: items.length.toString(),
                hint: "SKUs",
                accent: "#e0e7ff",
            },
            {
                label: "Agriculture",
                value: agOverview ? `${agOverview.plots} plots` : "-",
                hint: "Sim overview",
                accent: "#86efac",
            },
            {
                label: "POS",
                value: posOverview ? `₭${posOverview.metrics.grossRevenue}` : "-",
                hint: "Gross",
                accent: "#f472b6",
            },
        ],
        [totals, items.length, agOverview, posOverview],
    );

    const handleRefreshAll = () => {
        if (!session?.accessToken) return;
        fetchLoads();
        fetchItems();
        fetchAg();
        fetchReference();
        fetchCulinary();
        fetchPos();
    };

    return (
        <Stack gap="lg">
            <div className="space-y-2">
                <div className="inline-flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-emerald-100">
                    <span className="rounded-full border border-emerald-300/30 bg-emerald-500/15 px-3 py-1">Logistics</span>
                    <span className="text-[11px] text-slate-300">Freight / Warehouse / Agriculture / USDA / Culinary / POS</span>
                </div>
                <div className="text-3xl font-semibold text-white">Operations control</div>
                <p className="max-w-3xl text-sm text-slate-300">
                    Unified cockpit across routing, storage, agriculture sim, USDA reference, culinary workflows, and point of sale.
                </p>
                <div className="flex flex-wrap items-center gap-2">
                    {!session ? <div className="text-xs text-amber-200">Sign in to load live data from the logistics endpoints.</div> : null}
                    <div className="flex items-center gap-2">
                        <Button accent="#22d3ee" onClick={handleRefreshAll} disabled={!session?.accessToken || anyLoading}>
                            Refresh all
                        </Button>
                        <Button accent="#fbbf24" variant="outline" onClick={() => setActiveTab("freight")}>Freight</Button>
                        <Button accent="#e0e7ff" variant="outline" onClick={() => setActiveTab("warehouse")}>
                            Warehouse
                        </Button>
                        <Button accent="#86efac" variant="outline" onClick={() => setActiveTab("agriculture")}>
                            Agriculture
                        </Button>
                        <Button accent="#7dd3fc" variant="outline" onClick={() => setActiveTab("usda")}>
                            USDA
                        </Button>
                        <Button accent="#fb7185" variant="outline" onClick={() => setActiveTab("culinary")}>
                            Culinary
                        </Button>
                        <Button accent="#f472b6" variant="outline" onClick={() => setActiveTab("pos")}>
                            POS
                        </Button>
                    </div>
                </div>
            </div>

            <Grid gap="md" smCols={2} lgCols={4}>
                {kpis.map((kpi) => (
                    <MetricTile key={kpi.label} label={kpi.label} value={kpi.value} hint={kpi.hint} accent={kpi.accent} />
                ))}
                <MetricTile label="USDA" value={regions.length ? regions.length.toString() : "-"} hint="Regions" accent="#7dd3fc" />
                <MetricTile
                    label="Culinary"
                    value={culinaryOverview ? culinaryOverview.menuItems.length.toString() : "-"}
                    hint="Menu items"
                    accent="#fb7185"
                />
                <MetricTile
                    label="Warehouse qty"
                    value={items.reduce((sum, item) => sum + Number(item.quantity || 0), 0).toString()}
                    hint="Units"
                    accent="#34d399"
                />
                <MetricTile
                    label="Ag tasks"
                    value={agOverview ? agOverview.tasks.toString() : "-"}
                    hint="Open"
                    accent="#f59e0b"
                />
            </Grid>

            <LogisticsActionsPanel />

            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                tabs={[
                    { key: "freight", label: "Freight", content: <FreightBoard /> },
                    { key: "warehouse", label: "Warehouse", content: <WarehouseBoard /> },
                    { key: "agriculture", label: "Agriculture", content: <AgricultureBoard /> },
                    { key: "usda", label: "USDA", content: <UsdaBoard /> },
                    { key: "culinary", label: "Culinary", content: <CulinaryBoard /> },
                    { key: "pos", label: "POS", content: <PosBoard /> },
                ]}
                className="w-full"
            />
        </Stack>
    );
}
