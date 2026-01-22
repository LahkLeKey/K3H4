import { useEffect, useMemo, useState } from "react";
import { z } from "zod";

import { Badge, Button, Grid, MetricTile, SectionHeader, Stack, Table } from "../components/ui";
import { useAuthStore } from "../zustand-stores/auth";
import { useUsdaState } from "../react-hooks/usda";
import { TableCard } from "./TableCard";
import { apiFetch } from "../react-hooks/lib/api-client";

export function UsdaBoard() {
    const { session } = useAuthStore();
    const {
        regions,
        commodities,
        countries,
        psdUnits,
        psdAttributes,
        psdRegions,
        psdCountries,
        psdCommodities,
        status,
        error,
        fetchReference,
    } = useUsdaState();
    const [wdQuery, setWdQuery] = useState("");
    const [wdResults, setWdResults] = useState<Array<{ id: string; label: string; description?: string }>>([]);
    const [wdStatus, setWdStatus] = useState<"idle" | "loading" | "error" | "ready">("idle");
    const [wdError, setWdError] = useState<string | null>(null);
    const [detail, setDetail] = useState<{ title: string; enrichment: any } | null>(null);

    useEffect(() => {
        if (session?.accessToken && status === "idle") fetchReference();
    }, [session?.accessToken, status, fetchReference]);

    const loading = status === "loading";

    const defaultQuery = useMemo(() => {
        const commodityName = (commodities as Array<{ name?: string }>)[0]?.name;
        const countryName = (countries as Array<{ name?: string }>)[0]?.name;
        return commodityName || countryName || "Wheat";
    }, [commodities, countries]);

    const hitRate = (arr: any[]) => {
        if (!arr.length) return "-";
        const hits = arr.filter((x) => Boolean((x as any)?.wikidataId)).length;
        const pct = Math.round((hits / arr.length) * 100);
        return `${pct}%`;
    };

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
                description="Live USDA regions, commodities, and enriched PSD units and attributes."
                status={loading ? "Loading…" : error ? error : undefined}
                actions={(
                    <Button accent="#7dd3fc" variant="outline" disabled={loading} onClick={() => fetchReference()}>
                        Refresh
                    </Button>
                )}
            />

            <Grid gap="md" smCols={3} lgCols={5}>
                <MetricTile label="Regions" value={regions.length.toString()} hint="ESR" accent="#7dd3fc" />
                <MetricTile label="Commodities" value={commodities.length.toString()} hint="Reference" accent="#a78bfa" />
                <MetricTile label="Countries" value={countries.length.toString()} hint="ISO" accent="#34d399" />
                <MetricTile label="PSD units" value={psdUnits.length.toString()} hint={hitRate(psdUnits)} accent="#fbbf24" />
                <MetricTile label="PSD attributes" value={psdAttributes.length.toString()} hint={hitRate(psdAttributes)} accent="#fb7185" />
            </Grid>

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                <Badge accent="#38bdf8">PSD regions: {psdRegions.length}</Badge>
                <Badge accent="#34d399">PSD countries: {psdCountries.length}</Badge>
                <Badge accent="#a78bfa">PSD commodities: {psdCommodities.length}</Badge>
            </div>

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
                title="PSD units"
                subtitle="First 15 with enrichment coverage"
                actions={<Badge accent="#fbbf24">PSD</Badge>}
            >
                <Table
                    columns={[
                        { key: "name", label: "Name" },
                        { key: "code", label: "Code" },
                        { key: "wikidataId", label: "Wikidata" },
                        { key: "statements", label: "Statements" },
                        { key: "action", label: "Details" },
                    ]}
                    rows={(psdUnits as Array<any>).slice(0, 15).map((unit, idx) => {
                        const statements = unit?.enrichment?.statements || unit?.enrichment?.hit?.statements;
                        const statementKeys = statements ? Object.keys(statements) : [];
                        return {
                            key: `u-${idx}`,
                            name: unit?.name || "Unit",
                            code: unit?.code || unit?.unitCode || "-",
                            wikidataId: unit?.wikidataId || "-",
                            statements: statementKeys.length ? `${statementKeys.length} props` : "-",
                            action: (
                                <Button
                                    accent="#fbbf24"
                                    variant="ghost"
                                    disabled={!unit?.enrichment}
                                    onClick={() => setDetail({ title: unit?.name || unit?.code || "Unit", enrichment: unit?.enrichment })}
                                >
                                    View
                                </Button>
                            ),
                        };
                    })}
                    rowKey={(row) => row.key}
                />
            </TableCard>

            <TableCard
                title="PSD commodity attributes"
                subtitle="First 15 with enrichment coverage"
                actions={<Badge accent="#fb7185">PSD</Badge>}
            >
                <Table
                    columns={[
                        { key: "name", label: "Name" },
                        { key: "code", label: "Code" },
                        { key: "wikidataId", label: "Wikidata" },
                        { key: "statements", label: "Statements" },
                        { key: "action", label: "Details" },
                    ]}
                    rows={(psdAttributes as Array<any>).slice(0, 15).map((attr, idx) => {
                        const statements = attr?.enrichment?.statements || attr?.enrichment?.hit?.statements;
                        const statementKeys = statements ? Object.keys(statements) : [];
                        return {
                            key: `a-${idx}`,
                            name: attr?.name || "Attribute",
                            code: attr?.code || attr?.attributeCode || "-",
                            wikidataId: attr?.wikidataId || "-",
                            statements: statementKeys.length ? `${statementKeys.length} props` : "-",
                            action: (
                                <Button
                                    accent="#fb7185"
                                    variant="ghost"
                                    disabled={!attr?.enrichment}
                                    onClick={() => setDetail({ title: attr?.name || attr?.code || "Attribute", enrichment: attr?.enrichment })}
                                >
                                    View
                                </Button>
                            ),
                        };
                    })}
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

            {detail ? (
                <div className="space-y-2 rounded-xl border border-white/10 bg-slate-900/70 p-4">
                    <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold text-white">{detail.title}</div>
                        <Button accent="#94a3b8" variant="ghost" onClick={() => setDetail(null)}>
                            Close
                        </Button>
                    </div>
                    <pre className="max-h-72 overflow-auto rounded-lg bg-black/30 p-3 text-xs text-slate-200">
                        {JSON.stringify(detail.enrichment, null, 2)}
                    </pre>
                </div>
            ) : null}
        </Stack>
    );
}
