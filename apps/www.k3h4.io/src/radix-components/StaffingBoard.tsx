import { useEffect } from "react";

import { Badge, Button, EmptyState, Grid, MetricTile, SectionHeader, Stack, Table } from "../radix-primitives";
import { useAuthStore } from "../zustand-stores/auth";
import { useStaffingState } from "../react-hooks/staffing";
import { TableCard } from "./TableCard";

export function StaffingBoard() {
    const { session } = useAuthStore();
    const { status, error, metrics, engagements, roles, candidates, shifts, placements, fetchDashboard } = useStaffingState();

    useEffect(() => {
        if (session?.accessToken && status === "idle") {
            fetchDashboard();
        }
    }, [session?.accessToken, status, fetchDashboard]);

    return (
        <Stack gap="lg">
            <SectionHeader
                kicker="Staffing"
                title="Workforce snapshot"
                description="Engagements, roles, candidates, shifts, and placements."
                status={status === "loading" ? "Loading…" : error ? error : undefined}
                actions={(
                    <Button accent="#22d3ee" variant="outline" onClick={() => fetchDashboard()} disabled={status === "loading"}>
                        Refresh
                    </Button>
                )}
            />

            <Grid gap="md" smCols={5}>
                <MetricTile label="Open roles" value={(metrics?.openRoles ?? 0).toString()} hint="Live" accent="#60a5fa" />
                <MetricTile label="Candidates" value={(metrics?.activeCandidates ?? 0).toString()} hint="Pipeline" accent="#a78bfa" />
                <MetricTile label="Shifts" value={(metrics?.scheduledShifts ?? 0).toString()} hint="Scheduled" accent="#f59e0b" />
                <MetricTile label="Placements" value={(metrics?.activePlacements ?? 0).toString()} hint="Active" accent="#22c55e" />
                <MetricTile label="Fill rate" value={`${metrics?.fillRate ?? 0}%`} hint="" accent="#67e8f9" />
            </Grid>

            <TableCard title="Engagements" subtitle="Live" actions={<Badge accent="#60a5fa">Live</Badge>}>
                {engagements.length === 0 ? (
                    <EmptyState
                        title={session ? "No engagements yet" : "Sign in to view staffing"}
                        description={session ? "Refresh to pull dashboard." : "Authorize to load your data."}
                    />
                ) : (
                    <Table
                        columns={[
                            { key: "name", label: "Engagement" },
                            { key: "client", label: "Client" },
                            { key: "priority", label: "Priority" },
                            { key: "status", label: "Status" },
                            {
                                key: "roles",
                                label: "Roles",
                                render: (row) => row.roles?.length ?? 0,
                            },
                            {
                                key: "candidates",
                                label: "Candidates",
                                render: (row) => row.candidates?.length ?? 0,
                            },
                        ]}
                        rows={engagements}
                        rowKey={(row) => row.id}
                    />
                )}
            </TableCard>

            <TableCard title="Open roles" subtitle="Roles" actions={<Badge accent="#60a5fa">Live</Badge>}>
                <Table
                    columns={[
                        { key: "title", label: "Title" },
                        { key: "location", label: "Location" },
                        { key: "status", label: "Status" },
                        { key: "priority", label: "Priority" },
                        { key: "openings", label: "Openings" },
                        { key: "rateMin", label: "Rate" },
                    ]}
                    rows={roles}
                    rowKey={(row) => row.id}
                />
            </TableCard>

            <TableCard title="Candidates" subtitle="Pipeline" actions={<Badge accent="#60a5fa">Live</Badge>}>
                <Table
                    columns={[
                        { key: "fullName", label: "Name" },
                        { key: "stage", label: "Stage" },
                        { key: "desiredRate", label: "Desired" },
                        { key: "score", label: "Score" },
                    ]}
                    rows={candidates}
                    rowKey={(row) => row.id}
                />
            </TableCard>

            <TableCard title="Shifts" subtitle="Ops" actions={<Badge accent="#60a5fa">Live</Badge>}>
                <Table
                    columns={[
                        { key: "title", label: "Title" },
                        { key: "status", label: "Status" },
                        { key: "coverageStatus", label: "Coverage" },
                        { key: "location", label: "Location" },
                    ]}
                    rows={shifts}
                    rowKey={(row) => row.id}
                />
            </TableCard>

            <TableCard title="Bill/pay" subtitle="Placements" actions={<Badge accent="#60a5fa">Live</Badge>}>
                <Table
                    columns={[
                        { key: "id", label: "ID" },
                        { key: "status", label: "Status" },
                        { key: "billRate", label: "Bill" },
                        { key: "payRate", label: "Pay" },
                        { key: "margin", label: "Margin" },
                    ]}
                    rows={placements}
                    rowKey={(row) => row.id}
                />
            </TableCard>
        </Stack>
    );
}
