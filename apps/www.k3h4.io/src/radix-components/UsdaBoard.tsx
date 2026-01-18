import { useEffect } from "react";

import { Badge, Button, Card, StatChip, Table } from "../radix-primitives";
import { useAuthStore } from "../zustand-stores/auth";
import { useUsdaState } from "../react-hooks/usda";

export function UsdaBoard() {
    const { session } = useAuthStore();
    const { regions, commodities, countries, status, error, fetchReference } = useUsdaState();

    useEffect(() => {
        if (session?.accessToken && status === "idle") fetchReference();
    }, [session?.accessToken, status, fetchReference]);

    const loading = status === "loading";

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
                <Badge accent="#7dd3fc">USDA</Badge>
                {loading ? <span className="text-xs text-slate-400">Loading…</span> : null}
                {error ? <span className="text-xs text-amber-300">{error}</span> : null}
                <div className="ml-auto flex items-center gap-2">
                    <Button accent="#7dd3fc" disabled={loading} onClick={() => fetchReference()}>
                        Refresh
                    </Button>
                </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
                <StatChip label="Regions" value={regions.length.toString()} accent="#7dd3fc" />
                <StatChip label="Commodities" value={commodities.length.toString()} accent="#a78bfa" />
                <StatChip label="Countries" value={countries.length.toString()} accent="#34d399" />
            </div>

            <Card eyebrow="Sample" title="Regions" actions={<Badge accent="#7dd3fc">ESR</Badge>}>
                <Table
                    columns={[{ key: "name", label: "Name" }]}
                    rows={(regions as Array<{ name?: string }>).slice(0, 10).map((r, idx) => ({ key: `r-${idx}`, name: (r as any)?.name || "Region" }))}
                    rowKey={(row) => row.key}
                />
            </Card>
        </div>
    );
}
