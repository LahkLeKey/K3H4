import { useEffect } from "react";

import { Badge, Button, Grid, MetricTile, SectionHeader, Stack, Table } from "../components/ui";
import { useAuthStore } from "../zustand-stores/auth";
import { useUsdaState } from "../react-hooks/usda";
import { TableCard } from "./TableCard";

export function UsdaBoard() {
    const { session } = useAuthStore();
    const { regions, commodities, countries, status, error, fetchReference } = useUsdaState();

    useEffect(() => {
        if (session?.accessToken && status === "idle") fetchReference();
    }, [session?.accessToken, status, fetchReference]);

    const loading = status === "loading";

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
                    columns={[{ key: "name", label: "Name" }]}
                    rows={(regions as Array<{ name?: string }>).slice(0, 10).map((r, idx) => ({ key: `r-${idx}`, name: (r as any)?.name || "Region" }))}
                    rowKey={(row) => row.key}
                />
            </TableCard>
        </Stack>
    );
}
