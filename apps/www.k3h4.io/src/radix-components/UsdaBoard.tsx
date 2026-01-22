import { useEffect, useMemo, useState } from "react";
import { z } from "zod";

import { Badge, Button, Grid, MetricTile, SectionHeader, Stack, Table } from "../components/ui";
import { useAuthStore } from "../zustand-stores/auth";
import { useUsdaState } from "../react-hooks/usda";
import { TableCard } from "./TableCard";
import { apiFetch } from "../react-hooks/lib/api-client";

export function UsdaBoard() {
    const { session } = useAuthStore();
    const { regions, commodities, countries, status, error, fetchReference } = useUsdaState();
    const [wdQuery, setWdQuery] = useState("");
    const [wdResults, setWdResults] = useState<Array<{ id: string; label: string; description?: string }>>([]);
    const [wdStatus, setWdStatus] = useState<"idle" | "loading" | "error" | "ready">("idle");
    const [wdError, setWdError] = useState<string | null>(null);

    useEffect(() => {
        if (session?.accessToken && status === "idle") fetchReference();
    }, [session?.accessToken, status, fetchReference]);

    const loading = status === "loading";

    const defaultQuery = useMemo(() => {
        const commodityName = (commodities as Array<{ name?: string }>)[0]?.name;
        const countryName = (countries as Array<{ name?: string }>)[0]?.name;
        return commodityName || countryName || "Wheat";
    }, [commodities, countries]);

    const handleEnrich = async () => {
        if (!session?.accessToken) return;
        const query = (wdQuery || defaultQuery).trim();
        if (!query) return;
        setWdStatus("loading");
        setWdError(null);
        try {
            const res = await apiFetch(`/wikidata/search/items?query=${encodeURIComponent(query)}`, {
                token: session.accessToken,
                baseUrl: useAuthStore.getState().apiBase,
                schema: z.any(),
            });
            const itemsSource: any = (res as any)?.items ?? res;
            const items = Array.isArray(itemsSource) ? itemsSource : [];
            const normalized = items.map((item, idx) => ({
                id: item.id || item.qid || item.wikidataId || `item-${idx}`,
                label: item.label || item.name || item.title || "Item",
                description: item.description || item.extract || "",
            }));
            setWdResults(normalized.slice(0, 10));
            setWdStatus("ready");
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Failed";
            setWdError(msg);
            setWdStatus("error");
        }
    };

    return (
        <Stack gap="lg">
            <SectionHeader
                kicker="USDA"
                title="Agricultural reference"
                description="Live USDA regions, commodities, and country codes."
                status={loading ? "Loading…" : error ? error : undefined}
                actions={(
                    <Button accent="#7dd3fc" variant="outline" disabled={loading} onClick={() => fetchReference()}>
                        Refresh
                    </Button>
                )}
            />

            <Grid gap="md" smCols={3}>
                <MetricTile label="Regions" value={regions.length.toString()} hint="ESR" accent="#7dd3fc" />
                <MetricTile label="Commodities" value={commodities.length.toString()} hint="Reference" accent="#a78bfa" />
                <MetricTile label="Countries" value={countries.length.toString()} hint="ISO" accent="#34d399" />
            </Grid>

            <TableCard title="Regions" subtitle="Sample (first 10)" actions={<Badge accent="#7dd3fc">ESR</Badge>}>
                <Table
                    columns={[
                        { key: "name", label: "Name" },
                        { key: "code", label: "Code" },
                    ]}
                    rows={(regions as Array<{ name?: string; code?: string }>)
                        .slice(0, 10)
                        .map((r, idx) => ({ key: `r-${idx}`, name: (r as any)?.name || "Region", code: (r as any)?.code || "-" }))}
                    rowKey={(row) => row.key}
                />
            </TableCard>

            <TableCard
                title="Wikidata enrichment"
                subtitle="Search by commodity or country"
                actions={(
                    <div className="flex flex-wrap items-center gap-2">
                        <input
                            className="w-48 rounded-lg border border-white/10 bg-slate-900/80 p-2 text-sm text-slate-100 focus:border-emerald-300/60 focus:outline-none"
                            value={wdQuery}
                            onChange={(e) => setWdQuery(e.target.value)}
                            placeholder={defaultQuery}
                        />
                        <Button accent="#7dd3fc" onClick={handleEnrich} disabled={!session?.accessToken || wdStatus === "loading"}>
                            Enrich
                        </Button>
                    </div>
                )}
            >
                {wdStatus === "idle" ? <div className="text-xs text-slate-300">Enter a commodity or country to enrich via Wikidata search.</div> : null}
                {wdStatus === "loading" ? <div className="text-xs text-slate-300">Loading…</div> : null}
                {wdError ? <div className="text-xs text-amber-300">{wdError}</div> : null}
                {wdResults.length > 0 ? (
                    <Table
                        columns={[
                            { key: "label", label: "Label" },
                            { key: "description", label: "Description" },
                        ]}
                        rows={wdResults}
                        rowKey={(row) => row.id}
                    />
                ) : null}
            </TableCard>
        </Stack>
    );
}
