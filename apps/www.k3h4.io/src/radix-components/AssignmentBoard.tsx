import { useEffect, useMemo, useState } from "react";

import { Badge, Button, Card, Input, StatChip, Table } from "@/components/ui";
import { useAuthStore } from "@/zustand-stores/auth";
import { useAssignmentState } from "@/react-hooks/assignments";
import { usePersonaState } from "@/react-hooks/persona";

export function AssignmentBoard() {
    const { session } = useAuthStore();
    const { assignments, status, error, metrics, fetchAssignments, createAssignment, addTimecard, payTimecard } = useAssignmentState();
    const { personas, fetchPersonas } = usePersonaState();

    const [title, setTitle] = useState("");
    const [personaId, setPersonaId] = useState("");
    const [rate, setRate] = useState("120");

    useEffect(() => {
        if (session?.accessToken && status === "idle") {
            fetchAssignments();
            fetchPersonas();
        }
    }, [session?.accessToken, status, fetchAssignments, fetchPersonas]);

    const personaOptions = useMemo(() => personas.map((p) => ({ id: p.id, label: `${p.alias} (${p.account})` })), [personas]);
    const disabled = !session?.accessToken || status === "loading";

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
                <Badge accent="#f472b6">Assignments</Badge>
                {status === "loading" ? <span className="text-xs text-slate-400">Loading…</span> : null}
                {error ? <span className="text-xs text-amber-300">{error}</span> : null}
                <div className="ml-auto flex items-center gap-2">
                    <Button accent="#22d3ee" onClick={() => fetchAssignments()} disabled={status === "loading"}>
                        Refresh
                    </Button>
                </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
                <StatChip label="Assignments" value={metrics.count.toString()} accent="#f472b6" />
                <StatChip label="Hours" value={metrics.hours.toFixed(1)} accent="#22c55e" />
                <StatChip label="Payouts" value={`₭${metrics.payouts.toFixed(2)}`} accent="#60a5fa" />
            </div>

            <Card eyebrow="Create" title="New assignment" actions={<Badge accent="#f472b6">Write</Badge>}>
                <div className="grid gap-3 md:grid-cols-4">
                    <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <Input placeholder="Hourly rate" value={rate} onChange={(e) => setRate(e.target.value)} />
                    <select
                        className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-slate-100"
                        value={personaId}
                        onChange={(e) => setPersonaId(e.target.value)}
                    >
                        <option value="">Select persona</option>
                        {personaOptions.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.label}
                            </option>
                        ))}
                    </select>
                    <Button
                        accent="#22c55e"
                        disabled={disabled || !title.trim() || !personaId}
                        onClick={async () => {
                            await createAssignment({ title: title.trim(), personaId, hourlyRate: Number(rate) || 0 });
                            setTitle("");
                            setPersonaId("");
                        }}
                    >
                        Save
                    </Button>
                </div>
            </Card>

            <Card eyebrow="Book" title="Assignments" actions={<Badge accent="#f472b6">Live</Badge>}>
                {assignments.length === 0 ? (
                    <div className="space-y-1 rounded-2xl border border-white/5 bg-white/5 p-4 text-sm text-slate-200">
                        <div className="font-semibold">{session ? "No assignments" : "Sign in to view assignments"}</div>
                        <div className="text-slate-400">{session ? "Create one to start tracking time." : "Authorize to load your data."}</div>
                    </div>
                ) : (
                    <Table
                        columns={[
                            { key: "title", label: "Title" },
                            {
                                key: "persona",
                                label: "Persona",
                                render: (row) => row.persona?.alias ?? "—",
                            },
                            { key: "hourlyRate", label: "Rate" },
                            {
                                key: "timecards",
                                label: "Timecards",
                                render: (row) => row.timecards.length,
                            },
                            {
                                key: "payouts",
                                label: "Payouts",
                                render: (row) => row.payouts.length,
                            },
                            {
                                key: "id",
                                label: "",
                                render: (row) => (
                                    <div className="flex flex-wrap gap-2">
                                        <Button
                                            accent="#60a5fa"
                                            disabled={disabled}
                                            onClick={() => addTimecard(row.id, 1.5, "Auto log")}
                                        >
                                            +1.5h
                                        </Button>
                                        {row.timecards.find((tc) => tc.status !== "paid") ? (
                                            <Button
                                                accent="#f59e0b"
                                                disabled={disabled}
                                                onClick={() => {
                                                    const tc = row.timecards.find((t) => t.status !== "paid");
                                                    if (tc) payTimecard(row.id, tc.id);
                                                }}
                                            >
                                                Pay next
                                            </Button>
                                        ) : null}
                                    </div>
                                ),
                            },
                        ]}
                        rows={assignments}
                        rowKey={(row) => row.id}
                    />
                )}
            </Card>
        </div>
    );
}
