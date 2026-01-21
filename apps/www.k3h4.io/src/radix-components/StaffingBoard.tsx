import { useEffect } from "react";

import { Badge, Button, Card, StatChip, Table } from "../radix-primitives";
import { useAuthStore } from "../zustand-stores/auth";
import { useStaffingState } from "../react-hooks/staffing";

export function StaffingBoard() {
    const { session } = useAuthStore();
    const { status, error, metrics, engagements, roles, candidates, shifts, placements, fetchDashboard } = useStaffingState();

    useEffect(() => {
        if (session?.accessToken && status === "idle") {
            fetchDashboard();
        }
    }, [session?.accessToken, status, fetchDashboard]);

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
                <Badge accent="#60a5fa">Staffing</Badge>
                {status === "loading" ? <span className="text-xs text-slate-400">Loading…</span> : null}
                {error ? <span className="text-xs text-amber-300">{error}</span> : null}
                <div className="ml-auto flex items-center gap-2">
                    <Button accent="#22d3ee" onClick={() => fetchDashboard()} disabled={status === "loading"}>
                        Refresh
                    </Button>
                </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-5">
                <StatChip label="Open roles" value={(metrics?.openRoles ?? 0).toString()} accent="#60a5fa" />
                <StatChip label="Candidates" value={(metrics?.activeCandidates ?? 0).toString()} accent="#a78bfa" />
                <StatChip label="Shifts" value={(metrics?.scheduledShifts ?? 0).toString()} accent="#f59e0b" />
                <StatChip label="Placements" value={(metrics?.activePlacements ?? 0).toString()} accent="#22c55e" />
                <StatChip label="Fill rate" value={`${metrics?.fillRate ?? 0}%`} accent="#67e8f9" />
            </div>

            <Card eyebrow="Engagements" title="Engagements" actions={<Badge accent="#60a5fa">Live</Badge>}>
                {engagements.length === 0 ? (
                    <div className="space-y-1 rounded-2xl border border-white/5 bg-white/5 p-4 text-sm text-slate-200">
                        <div className="font-semibold">{session ? "No engagements yet" : "Sign in to view staffing"}</div>
                        <div className="text-slate-400">{session ? "Refresh to pull dashboard." : "Authorize to load your data."}</div>
                    </div>
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
            </Card>

            <Card eyebrow="Roles" title="Open roles" actions={<Badge accent="#60a5fa">Live</Badge>}>
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
            </Card>

            <Card eyebrow="Pipeline" title="Candidates" actions={<Badge accent="#60a5fa">Live</Badge>}>
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
            </Card>

            <Card eyebrow="Ops" title="Shifts" actions={<Badge accent="#60a5fa">Live</Badge>}>
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
            </Card>

            <Card eyebrow="Placements" title="Bill/pay" actions={<Badge accent="#60a5fa">Live</Badge>}>
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
            </Card>
        </div>
    );
}
