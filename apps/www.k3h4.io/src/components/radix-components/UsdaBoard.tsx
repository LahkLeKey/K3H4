import { useEffect } from "react";

import { Badge, Button, Grid, MetricTile, SectionHeader, Stack, Table } from "../ui";
import { useAuthStore } from "../../zustand-stores/auth";
import { useUsdaState } from "../../react-hooks/usda";
import { TableCard } from "./TableCard";
import { useLogisticsStore } from "../../zustand-stores/logistics";

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
    const { usdaDetail, setUsdaDetail } = useLogisticsStore();

    useEffect(() => {
        if (session?.accessToken && status === "idle") fetchReference();
    }, [session?.accessToken, status, fetchReference]);

    const loading = status === "loading";

    const pickCode = (item: any) =>
        item?.code ||
        item?.regionCode ||
        item?.countryCode ||
        item?.commodityCode ||
        item?.unitCode ||
        item?.attributeCode ||
        item?.regionId ||
        item?.countryId ||
        item?.commodityId ||
        item?.unitId ||
        item?.attributeId ||
        item?.Code ||
        item?.codeId ||
        item?.id ||
        "-";

    const pickName = (item: any) =>
        item?.name ||
        item?.regionName ||
        item?.countryName ||
        item?.commodityName ||
        item?.unitName ||
        item?.attributeName ||
        item?.description ||
        item?.label ||
        item?.title ||
        item?.text ||
        item?.unitDescription ||
        item?.attributeDescription ||
        item?.longDescription ||
        item?.Name ||
        "-";

    const hitRate = (arr: any[]) => {
        if (!arr.length) return "-";
        const hits = arr.filter((x) => Boolean((x as any)?.wikidataId)).length;
        const pct = Math.round((hits / arr.length) * 100);
        return `${pct}%`;
    };

    return (
        <Stack gap="lg">
            <SectionHeader
                kicker="USDA"
                title="Agricultural reference"
                description="Live USDA regions, commodities, and enriched PSD units and attributes."
                status={loading ? "Backend enrichment in progress…" : error ? error : undefined}
                actions={(
                    <Button accent="#7dd3fc" variant="outline" disabled={loading} onClick={() => fetchReference()}>
                        Refresh
                    </Button>
                )}
            />

            {loading ? (
                <div className="rounded-xl border border-white/10 bg-slate-900/70 p-3 text-sm text-slate-200">
                    USDA datasets are being hydrated and enriched on the backend. This may take a little while on first load; data appears automatically when ready.
                </div>
            ) : null}

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
                {loading ? (
                    <div className="rounded-lg border border-white/10 bg-slate-900/60 p-3 text-xs text-slate-200">Loading USDA regions…</div>
                ) : (
                    <Table
                        columns={[
                            { key: "name", label: "Name" },
                            { key: "code", label: "Code" },
                            { key: "action", label: "Details" },
                        ]}
                        rows={(regions as Array<{ name?: string; code?: string }>)
                            .slice(0, 10)
                            .map((r, idx) => ({
                                key: `r-${idx}`,
                                name: pickName(r),
                                code: pickCode(r),
                                action: (
                                    <Button
                                        accent="#7dd3fc"
                                        variant="ghost"
                                        onClick={() =>
                                            setUsdaDetail({
                                                title: pickName(r) || "Region",
                                                code: pickCode(r),
                                                wikidataId: (r as any)?.wikidataId,
                                                enrichment: (r as any)?.enrichment,
                                            })
                                        }
                                    >
                                        View
                                    </Button>
                                ),
                            }))}
                        rowKey={(row) => row.key}
                    />
                )}
            </TableCard>

            <TableCard
                title="PSD units"
                subtitle="First 15 with enrichment coverage"
                actions={<Badge accent="#fbbf24">PSD</Badge>}
            >
                {loading ? (
                    <div className="rounded-lg border border-white/10 bg-slate-900/60 p-3 text-xs text-slate-200">Loading PSD units with enrichment…</div>
                ) : (
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
                            const wikidataId = unit?.wikidataId || unit?.enrichment?.hit?.id || "-";
                            return {
                                key: `u-${idx}`,
                                name: pickName(unit) || "Unit",
                                code: pickCode(unit),
                                wikidataId,
                                statements: statementKeys.length ? `${statementKeys.length} props` : "-",
                                action: (
                                    <Button
                                        accent="#fbbf24"
                                        variant="ghost"
                                        disabled={!unit?.enrichment}
                                        onClick={() =>
                                            setUsdaDetail({
                                                title: pickName(unit) || "Unit",
                                                code: pickCode(unit),
                                                wikidataId,
                                                enrichment: unit?.enrichment,
                                            })
                                        }
                                    >
                                        View
                                    </Button>
                                ),
                            };
                        })}
                        rowKey={(row) => row.key}
                    />
                )}
            </TableCard>

            <TableCard
                title="PSD commodity attributes"
                subtitle="First 15 with enrichment coverage"
                actions={<Badge accent="#fb7185">PSD</Badge>}
            >
                {loading ? (
                    <div className="rounded-lg border border-white/10 bg-slate-900/60 p-3 text-xs text-slate-200">Loading PSD commodity attributes…</div>
                ) : (
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
                            const wikidataId = attr?.wikidataId || attr?.enrichment?.hit?.id || "-";
                            return {
                                key: `a-${idx}`,
                                name: pickName(attr) || "Attribute",
                                code: pickCode(attr),
                                wikidataId,
                                statements: statementKeys.length ? `${statementKeys.length} props` : "-",
                                action: (
                                    <Button
                                        accent="#fb7185"
                                        variant="ghost"
                                        disabled={!attr?.enrichment}
                                        onClick={() =>
                                            setUsdaDetail({
                                                title: pickName(attr) || "Attribute",
                                                code: pickCode(attr),
                                                wikidataId,
                                                enrichment: attr?.enrichment,
                                            })
                                        }
                                    >
                                        View
                                    </Button>
                                ),
                            };
                        })}
                        rowKey={(row) => row.key}
                    />
                )}
            </TableCard>

            {usdaDetail ? (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 px-4 py-8" onClick={() => setUsdaDetail(null)}>
                    <div
                        className="max-h-[80vh] w-full max-w-3xl space-y-3 rounded-2xl border border-white/15 bg-slate-900/90 p-5 shadow-2xl backdrop-blur"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <div className="text-lg font-semibold text-white">{usdaDetail.title}</div>
                                <div className="text-xs text-slate-300">Code: {usdaDetail.code ?? "-"} • Wikidata: {usdaDetail.wikidataId ?? "-"}</div>
                            </div>
                            <Button accent="#94a3b8" variant="ghost" onClick={() => setUsdaDetail(null)}>
                                Close
                            </Button>
                        </div>
                        <pre className="max-h-[60vh] overflow-auto rounded-lg bg-black/40 p-3 text-xs text-slate-100">
                            {JSON.stringify(usdaDetail.enrichment ?? usdaDetail, null, 2)}
                        </pre>
                    </div>
                </div>
            ) : null}
        </Stack>
    );
}
