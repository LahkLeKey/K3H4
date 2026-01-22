import { useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";

import {
    Badge,
    Button,
    Card,
    FormField,
    Grid,
    Histogram,
    Input,
    MetricTile,
    Pill,
    SectionHeader,
    Select,
    Stack,
    StatChip,
    Table,
    Tabs,
    Textarea,
    type TableColumn,
} from "../radix-primitives";
import { useAuthStore } from "../react-hooks/auth";
import { useAssignmentState } from "../react-hooks/assignments";
import {
    usePersonaState,
    type PersonaCompatibility,
    type PersonaConfusionResult,
} from "../react-hooks/persona";
import { useStaffingState } from "../react-hooks/staffing";
import { EndpointList } from "./EndpointList";
import { TableCard } from "./TableCard";
import { R3FErrorBoundary } from "../r3f-components/R3FErrorBoundary";
import { NodeLinkGraph } from "../r3f-primitives/NodeLinkGraph";
import { AssignmentBoard } from "./AssignmentBoard";
import { StaffingBoard } from "./StaffingBoard";

const formatNumber = (value: number | string | null | undefined) => {
    if (value === null || value === undefined) return "--";
    const num = typeof value === "string" ? Number(value) : value;
    if (!Number.isFinite(num)) return String(value);
    return num.toLocaleString();
};

const parseAttributes = (input: string) =>
    input
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
            const [main, weightToken] = line.split("|").map((token) => token.trim());
            const [categoryRaw, valuesRaw] = (main.includes(":") ? main.split(":") : main.split("=")).map((token) => token.trim());
            const category = categoryRaw?.toLowerCase();
            const values = (valuesRaw || "")
                .split(/[;,]/)
                .map((value) => value.trim())
                .filter(Boolean);
            if (!category || values.length === 0) return null;
            const weight = weightToken ? Number(weightToken.replace(/[^0-9.-]/g, "")) : undefined;
            return { category, values, weight: Number.isFinite(weight) ? weight : undefined } as {
                category: string;
                values: string[];
                weight?: number;
            };
        })
        .filter(Boolean) as { category: string; values: string[]; weight?: number }[];

const CompatibilityRow = ({ compat }: { compat: PersonaCompatibility }) => {
    const overlap = compat.overlappingTokens.slice(0, 4);
    return (
        <div className="grid grid-cols-5 items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-sm text-white">
            <div className="truncate">
                <div className="text-xs uppercase tracking-[0.14em] text-slate-400">Pair</div>
                <div className="font-semibold">{compat.source.alias}</div>
                <div className="text-[11px] text-slate-400">{compat.target.alias}</div>
            </div>
            <div className="text-center">
                <div className="text-xs uppercase tracking-[0.14em] text-slate-400">Jaccard</div>
                <div className="text-lg font-semibold text-emerald-200">{compat.jaccardScore.toFixed(3)}</div>
            </div>
            <div className="text-center">
                <div className="text-xs uppercase tracking-[0.14em] text-slate-400">Overlap</div>
                <div className="text-sm text-white">{overlap.join(" ") || "--"}</div>
            </div>
            <div className="text-center">
                <div className="text-xs uppercase tracking-[0.14em] text-slate-400">Tokens</div>
                <div className="text-sm text-white">{compat.intersectionCount} / {compat.unionCount}</div>
            </div>
            <div className="text-right text-[11px] text-slate-400">{new Date(compat.computedAt).toLocaleString()}</div>
        </div>
    );
};

const ConfusionSummary = ({ result }: { result: PersonaConfusionResult }) => (
    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatChip label="Accuracy" value={`${(result.metrics.accuracy * 100).toFixed(1)}%`} accent="#22d3ee" />
        <StatChip label="Precision" value={`${(result.metrics.precision * 100).toFixed(1)}%`} accent="#a78bfa" />
        <StatChip label="Recall" value={`${(result.metrics.recall * 100).toFixed(1)}%`} accent="#f59e0b" />
        <StatChip label="F1" value={`${(result.metrics.f1 * 100).toFixed(1)}%`} accent="#4ade80" />
        <StatChip label="Evaluated" value={formatNumber(result.evaluated)} accent="#f472b6" />
    </div>
);

type AssignmentEndpoint = {
    method: "GET" | "POST";
    path: string;
    description: string;
};

const assignmentEndpoints: AssignmentEndpoint[] = [
    { method: "GET", path: "/assignments", description: "List assignments with nested timecards and payouts." },
    { method: "POST", path: "/assignments", description: "Create a new assignment linked to a persona with an hourly rate." },
    { method: "POST", path: "/assignments/{id}/timecards", description: "Append a timecard entry with hours worked and an optional note." },
    { method: "POST", path: "/assignments/{id}/pay", description: "Mark a timecard as paid and record the payout with an optional note." },
];

function AssignmentsTabContent() {
    const { session } = useAuthStore();
    const { metrics, status, error, assignments, fetchAssignments } = useAssignmentState();

    const statusMessage = useMemo(() => {
        if (error) return error;
        if (status === "loading") return "Loading assignments...";
        if (status === "ready") return `${assignments.length} loaded`;
        return "Waiting for auth...";
    }, [status, error, assignments.length]);

    return (
        <div className="space-y-5">
            <SectionHeader
                kicker="Assignments"
                title="Assignments and tasks"
                description="Live assignment ledger plus the HTTP endpoints to list work, log hours, and issue payouts."
                status={statusMessage}
                actions={(
                    <>
                        <Button
                            variant="outline"
                            accent="#22d3ee"
                            onClick={() => fetchAssignments()}
                            disabled={!session?.accessToken || status === "loading"}
                        >
                            {status === "loading" ? "Refreshing..." : "Refresh data"}
                        </Button>
                        <Pill tone="slate">Auth required: Bearer token</Pill>
                    </>
                )}
            />

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <MetricTile label="Assignments" value={metrics.count.toString()} hint="GET /assignments" accent="#22d3ee" />
                <MetricTile label="Total hours" value={metrics.hours.toFixed(1)} hint="Sum of timecards" accent="#a78bfa" />
                <MetricTile label="Payouts" value={`₭${metrics.payouts.toFixed(2)}`} hint="POST /assignments/{id}/pay" accent="#f59e0b" />
                <MetricTile label="Create" value="POST /assignments" hint="Persona + rate" accent="#34d399" />
            </div>

            <EndpointList endpoints={assignmentEndpoints} tag="Assignments" />

            <TableCard title="Assignments board" subtitle="Interactive UI backed by the endpoints above" actions={<Badge accent="#22d3ee">Live</Badge>}>
                <AssignmentBoard />
            </TableCard>
        </div>
    );
}

const stageOptions = ["sourced", "screening", "interview", "offer", "placed"];
const shiftStatusOptions = ["draft", "open", "scheduled", "closed"];
const placementStatusOptions = ["confirmed", "pending", "cancelled"];

function StaffingTabContent() {
    const { session } = useAuthStore();
    const {
        status,
        error,
        engagements,
        roles,
        candidates,
        metrics,
        fetchDashboard,
        createEngagement,
        createRole,
        createCandidate,
        advanceCandidateStage,
        createShift,
        createPlacement,
    } = useStaffingState();

    const [engName, setEngName] = useState("");
    const [engClient, setEngClient] = useState("");

    const [roleTitle, setRoleTitle] = useState("");
    const [roleEngagementId, setRoleEngagementId] = useState("");
    const [roleLocation, setRoleLocation] = useState("");
    const [rolePriority, setRolePriority] = useState("");
    const [roleStatus, setRoleStatus] = useState("");
    const [roleOpenings, setRoleOpenings] = useState("");
    const [roleRateMin, setRoleRateMin] = useState("");
    const [roleRateMax, setRoleRateMax] = useState("");

    const [candName, setCandName] = useState("");
    const [candRoleId, setCandRoleId] = useState("");
    const [candStage, setCandStage] = useState("sourced");
    const [candDesired, setCandDesired] = useState("");

    const [stageCandidateId, setStageCandidateId] = useState("");
    const [stageValue, setStageValue] = useState("screening");

    const [shiftTitle, setShiftTitle] = useState("");
    const [shiftRoleId, setShiftRoleId] = useState("");
    const [shiftLocation, setShiftLocation] = useState("");
    const [shiftStarts, setShiftStarts] = useState("");
    const [shiftEnds, setShiftEnds] = useState("");
    const [shiftStatus, setShiftStatus] = useState("");

    const [placementCandidateId, setPlacementCandidateId] = useState("");
    const [placementRoleId, setPlacementRoleId] = useState("");
    const [placementEngagementId, setPlacementEngagementId] = useState("");
    const [placementBillRate, setPlacementBillRate] = useState("");
    const [placementPayRate, setPlacementPayRate] = useState("");
    const [placementStatus, setPlacementStatus] = useState("confirmed");

    const authed = Boolean(session?.accessToken);
    const busy = status === "loading";

    useEffect(() => {
        if (session?.accessToken && status === "idle") void fetchDashboard();
    }, [session?.accessToken, status, fetchDashboard]);

    const handleEngagement = async () => {
        if (!engName.trim()) return;
        await createEngagement({ name: engName.trim(), client: engClient.trim() || null });
        setEngName("");
        setEngClient("");
    };

    const handleRole = async () => {
        if (!roleTitle.trim()) return;
        await createRole({
            title: roleTitle.trim(),
            engagementId: roleEngagementId || null,
            location: roleLocation || null,
            priority: rolePriority || null,
            status: roleStatus || null,
            openings: roleOpenings ? Number(roleOpenings) : null,
            rateMin: roleRateMin || null,
            rateMax: roleRateMax || null,
        });
        setRoleTitle("");
        setRoleLocation("");
        setRolePriority("");
        setRoleStatus("");
        setRoleOpenings("");
        setRoleRateMin("");
        setRoleRateMax("");
    };

    const handleCandidate = async () => {
        if (!candName.trim()) return;
        await createCandidate({
            fullName: candName.trim(),
            roleId: candRoleId || null,
            desiredRate: candDesired || null,
            stage: candStage || null,
        });
        setCandName("");
        setCandRoleId("");
        setCandDesired("");
        setCandStage("sourced");
    };

    const handleStage = async () => {
        if (!stageCandidateId.trim() || !stageValue.trim()) return;
        await advanceCandidateStage(stageCandidateId.trim(), stageValue.trim());
    };

    const handleShift = async () => {
        if (!shiftTitle.trim()) return;
        await createShift({
            title: shiftTitle.trim(),
            roleId: shiftRoleId || null,
            startsAt: shiftStarts || null,
            endsAt: shiftEnds || null,
            location: shiftLocation || null,
            status: shiftStatus || null,
        });
        setShiftTitle("");
        setShiftRoleId("");
        setShiftLocation("");
        setShiftStarts("");
        setShiftEnds("");
        setShiftStatus("");
    };

    const handlePlacement = async () => {
        await createPlacement({
            candidateId: placementCandidateId || null,
            roleId: placementRoleId || null,
            engagementId: placementEngagementId || null,
            billRate: placementBillRate || null,
            payRate: placementPayRate || null,
            status: placementStatus || null,
        });
        setPlacementCandidateId("");
        setPlacementRoleId("");
        setPlacementEngagementId("");
        setPlacementBillRate("");
        setPlacementPayRate("");
        setPlacementStatus("confirmed");
    };

    return (
        <div className="space-y-5">
            <SectionHeader
                kicker="Staffing"
                title="Staffing and workforce planning"
                description="Plan demand, recruit talent, advance candidates, and finalize placements."
                status={error || (authed ? "Authenticated" : "Sign in required")}
                actions={<Pill tone="slate">Focus: staffing + shifts</Pill>}
            />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <MetricTile label="Open roles" value={(metrics?.openRoles ?? 0).toString()} hint="Live" accent="#60a5fa" />
                <MetricTile label="Candidates" value={(metrics?.activeCandidates ?? 0).toString()} hint="Live" accent="#a78bfa" />
                <MetricTile label="Shifts" value={(metrics?.scheduledShifts ?? 0).toString()} hint="Live" accent="#f59e0b" />
                <MetricTile label="Placements" value={(metrics?.activePlacements ?? 0).toString()} hint={`Fill ${metrics?.fillRate ?? 0}%`} accent="#22c55e" />
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/85 p-5 shadow-2xl backdrop-blur">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <div className="text-sm font-semibold text-white">Controls</div>
                        <div className="text-xs text-slate-400">Direct calls to staffing endpoints.</div>
                    </div>
                    <div className="text-[11px] text-slate-400">{authed ? "Authenticated" : "Sign in required"}</div>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="text-sm font-semibold text-white">Engagement</div>
                        <div className="text-[11px] text-slate-400">POST /staffing/engagements</div>
                        <div className="mt-3 grid gap-2">
                            <input className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" placeholder="Name" value={engName} onChange={(e) => setEngName(e.target.value)} />
                            <input className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" placeholder="Client" value={engClient} onChange={(e) => setEngClient(e.target.value)} />
                            <Button
                                variant="subtle"
                                accent="#22c55e"
                                className="h-9 justify-center"
                                onClick={handleEngagement}
                                disabled={!authed || busy || !engName.trim()}
                            >
                                {busy ? "Working…" : "Create engagement"}
                            </Button>
                        </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="text-sm font-semibold text-white">Role</div>
                        <div className="text-[11px] text-slate-400">POST /staffing/roles</div>
                        <div className="mt-3 grid gap-2">
                            <input className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" placeholder="Title" value={roleTitle} onChange={(e) => setRoleTitle(e.target.value)} />
                            <select className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" value={roleEngagementId} onChange={(e) => setRoleEngagementId(e.target.value)}>
                                <option value="">Engagement (optional)</option>
                                {engagements.map((eng) => (
                                    <option key={eng.id} value={eng.id}>
                                        {eng.name} {eng.client ? `· ${eng.client}` : ""}
                                    </option>
                                ))}
                            </select>
                            <input className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" placeholder="Location" value={roleLocation} onChange={(e) => setRoleLocation(e.target.value)} />
                            <div className="grid grid-cols-2 gap-2">
                                <select className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" value={rolePriority} onChange={(e) => setRolePriority(e.target.value)}>
                                    <option value="">Priority</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                                <select className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" value={roleStatus} onChange={(e) => setRoleStatus(e.target.value)}>
                                    <option value="">Status</option>
                                    <option value="draft">Draft</option>
                                    <option value="open">Open</option>
                                    <option value="paused">Paused</option>
                                    <option value="closed">Closed</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <input className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" type="number" placeholder="Openings" value={roleOpenings} onChange={(e) => setRoleOpenings(e.target.value)} />
                                <input className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" type="number" placeholder="Rate min" value={roleRateMin} onChange={(e) => setRoleRateMin(e.target.value)} />
                                <input className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" type="number" placeholder="Rate max" value={roleRateMax} onChange={(e) => setRoleRateMax(e.target.value)} />
                            </div>
                            <Button
                                variant="subtle"
                                accent="#38bdf8"
                                className="h-9 justify-center"
                                onClick={handleRole}
                                disabled={!authed || busy || !roleTitle.trim()}
                            >
                                {busy ? "Working…" : "Create role"}
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="text-sm font-semibold text-white">Candidate</div>
                        <div className="text-[11px] text-slate-400">POST /staffing/candidates</div>
                        <div className="mt-3 grid gap-2">
                            <input className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" placeholder="Full name" value={candName} onChange={(e) => setCandName(e.target.value)} />
                            <select className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" value={candRoleId} onChange={(e) => setCandRoleId(e.target.value)}>
                                <option value="">Role (optional)</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.title} {role.location ? `· ${role.location}` : ""}
                                    </option>
                                ))}
                            </select>
                            <div className="grid grid-cols-2 gap-2">
                                <input className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" placeholder="Desired rate" value={candDesired} onChange={(e) => setCandDesired(e.target.value)} />
                                <select className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" value={candStage} onChange={(e) => setCandStage(e.target.value)}>
                                    {stageOptions.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <Button
                                variant="subtle"
                                accent="#22c55e"
                                className="h-9 justify-center"
                                onClick={handleCandidate}
                                disabled={!authed || busy || !candName.trim()}
                            >
                                {busy ? "Working…" : "Create candidate"}
                            </Button>
                        </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="text-sm font-semibold text-white">Advance stage</div>
                        <div className="text-[11px] text-slate-400">POST /staffing/candidates/{`{id}`}/stage</div>
                        <div className="mt-3 grid gap-2">
                            <select className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" value={stageCandidateId} onChange={(e) => setStageCandidateId(e.target.value)}>
                                <option value="">Candidate</option>
                                {candidates.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.fullName} {c.stage ? `· ${c.stage}` : ""}
                                    </option>
                                ))}
                            </select>
                            <select className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" value={stageValue} onChange={(e) => setStageValue(e.target.value)}>
                                {stageOptions.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                            <Button
                                variant="subtle"
                                accent="#22c55e"
                                className="h-9 justify-center"
                                onClick={handleStage}
                                disabled={!authed || busy || !stageCandidateId.trim()}
                            >
                                {busy ? "Working…" : "Advance stage"}
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="text-sm font-semibold text-white">Shift</div>
                        <div className="text-[11px] text-slate-400">POST /staffing/shifts</div>
                        <div className="mt-3 grid gap-2">
                            <input className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" placeholder="Title" value={shiftTitle} onChange={(e) => setShiftTitle(e.target.value)} />
                            <select className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" value={shiftRoleId} onChange={(e) => setShiftRoleId(e.target.value)}>
                                <option value="">Role (optional)</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.title} {role.location ? `· ${role.location}` : ""}
                                    </option>
                                ))}
                            </select>
                            <div className="grid grid-cols-2 gap-2">
                                <input className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" type="datetime-local" placeholder="Starts" value={shiftStarts} onChange={(e) => setShiftStarts(e.target.value)} />
                                <input className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" type="datetime-local" placeholder="Ends" value={shiftEnds} onChange={(e) => setShiftEnds(e.target.value)} />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <input className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" placeholder="Location" value={shiftLocation} onChange={(e) => setShiftLocation(e.target.value)} />
                                <select className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" value={shiftStatus} onChange={(e) => setShiftStatus(e.target.value)}>
                                    <option value="">Status</option>
                                    {shiftStatusOptions.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <Button
                                variant="subtle"
                                accent="#22c55e"
                                className="h-9 justify-center"
                                onClick={handleShift}
                                disabled={!authed || busy || !shiftTitle.trim()}
                            >
                                {busy ? "Working…" : "Create shift"}
                            </Button>
                        </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="text-sm font-semibold text-white">Placement</div>
                        <div className="text-[11px] text-slate-400">POST /staffing/placements</div>
                        <div className="mt-3 grid gap-2">
                            <div className="grid grid-cols-2 gap-2">
                                <select className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" value={placementCandidateId} onChange={(e) => setPlacementCandidateId(e.target.value)}>
                                    <option value="">Candidate</option>
                                    {candidates.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.fullName} {c.stage ? `· ${c.stage}` : ""}
                                        </option>
                                    ))}
                                </select>
                                <select className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" value={placementRoleId} onChange={(e) => setPlacementRoleId(e.target.value)}>
                                    <option value="">Role</option>
                                    {roles.map((r) => (
                                        <option key={r.id} value={r.id}>
                                            {r.title} {r.location ? `· ${r.location}` : ""}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <select className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" value={placementEngagementId} onChange={(e) => setPlacementEngagementId(e.target.value)}>
                                <option value="">Engagement</option>
                                {engagements.map((eng) => (
                                    <option key={eng.id} value={eng.id}>
                                        {eng.name} {eng.client ? `· ${eng.client}` : ""}
                                    </option>
                                ))}
                            </select>
                            <div className="grid grid-cols-2 gap-2">
                                <input className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" placeholder="Bill rate" value={placementBillRate} onChange={(e) => setPlacementBillRate(e.target.value)} />
                                <input className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" placeholder="Pay rate" value={placementPayRate} onChange={(e) => setPlacementPayRate(e.target.value)} />
                            </div>
                            <select className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" value={placementStatus} onChange={(e) => setPlacementStatus(e.target.value)}>
                                {placementStatusOptions.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                            <Button
                                variant="subtle"
                                accent="#22c55e"
                                className="h-9 justify-center"
                                onClick={handlePlacement}
                                disabled={!authed || busy}
                            >
                                {busy ? "Working…" : "Create placement"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/85 p-5 shadow-2xl backdrop-blur">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <div className="text-sm font-semibold text-white">Staffing board</div>
                        <div className="text-xs text-slate-400">Interactive UI backed by staffing endpoints.</div>
                    </div>
                    <div className="text-[11px] text-slate-400">{authed ? "Live" : "Auth required"}</div>
                </div>
                <div className="mt-4">
                    <StaffingBoard />
                </div>
            </div>
        </div>
    );
}

export function PersonaDashboard() {
    const { session } = useAuthStore();
    const {
        personas,
        stats,
        status,
        error,
        compatibilities,
        compatStatus,
        compatError,
        confusion,
        confusionStatus,
        confusionError,
        fetchPersonas,
        generatePersonas,
        createPersona,
        updateAttributes,
        fetchCompatibilities,
        recomputeCompatibilities,
        runConfusion,
    } = usePersonaState();

    const [selectedPersonaId, setSelectedPersonaId] = useState<string | undefined>(undefined);
    const [activeTab, setActiveTab] = useState("overview");
    const [rosterQuery, setRosterQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [sortKey, setSortKey] = useState<"alias" | "attributes">("attributes");

    const [newAlias, setNewAlias] = useState("");
    const [newAccount, setNewAccount] = useState("");
    const [newHandle, setNewHandle] = useState("");
    const [newTags, setNewTags] = useState("");
    const [newNote, setNewNote] = useState("");
    const [generateCount, setGenerateCount] = useState(2);
    const [creating, setCreating] = useState(false);
    const [seeding, setSeeding] = useState(false);

    const [attributesInput, setAttributesInput] = useState("stack: node, python | weight=1\nindustry: fintech, logistics");
    const parsedAttributes = useMemo(() => parseAttributes(attributesInput), [attributesInput]);

    const [pairRows, setPairRows] = useState<{ id: string; sourceId?: string; targetId?: string; label: boolean }[]>([
        { id: "pair-0", label: true },
    ]);
    const [threshold, setThreshold] = useState(0.5);
    const [modelPath, setModelPath] = useState("");
    const [showGraph, setShowGraph] = useState(false);

    useEffect(() => {
        if (session?.accessToken && status === "idle") void fetchPersonas();
    }, [session?.accessToken, status, fetchPersonas]);

    useEffect(() => {
        if (!selectedPersonaId && personas[0]) setSelectedPersonaId(personas[0].id);
    }, [personas, selectedPersonaId]);

    useEffect(() => {
        if (session?.accessToken && compatStatus === "idle") void fetchCompatibilities();
    }, [session?.accessToken, compatStatus, fetchCompatibilities]);

    const authed = Boolean(session?.accessToken);

    const tagCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        personas.forEach((persona) => {
            (persona.tags || []).forEach((tag) => {
                counts[tag] = (counts[tag] || 0) + 1;
            });
        });
        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6);
    }, [personas]);

    const filteredPersonas = useMemo(() => {
        const query = rosterQuery.trim().toLowerCase();
        let rows = personas;
        if (query) {
            rows = rows.filter((p) => [p.alias, p.account, (p.tags || []).join(" ")].some((field) => field.toLowerCase().includes(query)));
        }
        if (selectedTag) {
            rows = rows.filter((p) => (p.tags || []).includes(selectedTag));
        }
        const sorted = [...rows].sort((a, b) => {
            if (sortKey === "alias") return a.alias.localeCompare(b.alias);
            return b.attributes.length - a.attributes.length;
        });
        return sorted;
    }, [personas, rosterQuery, selectedTag, sortKey]);

    const compatBins = useMemo(() => {
        const buckets = [0, 0, 0, 0, 0];
        compatibilities.forEach((row) => {
            const idx = Math.min(4, Math.floor(row.jaccardScore * 5));
            buckets[idx] += 1;
        });
        return buckets;
    }, [compatibilities]);

    const scoreTrend = useMemo(() => compatibilities.slice(0, 12).map((c) => c.jaccardScore), [compatibilities]);
    const attributeTrend = useMemo(() => personas.slice(0, 12).map((p) => p.attributes.length), [personas]);
    const compatTop = useMemo(() => compatibilities.slice(0, 8), [compatibilities]);
    const personaOptions = personas.map((p) => ({ value: p.id, label: p.alias }));

    const statusText = error || (status === "loading" ? "Loading personas..." : "Live");
    const compatText = compatError || (compatStatus === "loading" ? "Refreshing..." : `${compatibilities.length} pairs`);

    const kpis = [
        { label: "Personas", value: formatNumber(stats.total), hint: "Roster", trend: attributeTrend, accent: "#a78bfa" },
        { label: "Attributes", value: formatNumber(stats.attributes), hint: "Depth", trend: attributeTrend, accent: "#22d3ee" },
        { label: "Compatibility pairs", value: formatNumber(compatibilities.length), hint: compatText, trend: scoreTrend, accent: "#f59e0b" },
        { label: "Confusion runs", value: confusion ? "Latest" : "Pending", hint: confusion ? `${(confusion.metrics.f1 * 100).toFixed(1)}% F1` : "Awaiting pairs", trend: scoreTrend, accent: "#10b981" },
    ];

    const validPairs = useMemo(
        () => pairRows.filter((row) => row.sourceId && row.targetId) as Required<Omit<typeof pairRows[number], "id"> & { id: string }>[],
        [pairRows],
    );

    const handleCreate = async () => {
        if (!newAlias.trim() || !newAccount.trim()) return;
        setCreating(true);
        await createPersona({
            alias: newAlias.trim(),
            account: newAccount.trim(),
            handle: newHandle.trim() || undefined,
            note: newNote.trim() || undefined,
            tags: newTags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
        });
        setCreating(false);
        setNewAlias("");
        setNewAccount("");
        setNewHandle("");
        setNewTags("");
        setNewNote("");
    };

    const handleGenerate = async () => {
        const count = Number.isFinite(Number(generateCount)) ? Number(generateCount) : 2;
        setSeeding(true);
        await generatePersonas(count);
        setSeeding(false);
    };

    const handleAttributesSave = async () => {
        if (!selectedPersonaId || parsedAttributes.length === 0) return;
        await updateAttributes(selectedPersonaId, parsedAttributes);
        await fetchCompatibilities(selectedPersonaId);
    };

    const handleRunConfusion = async () => {
        if (validPairs.length === 0) return;
        const clamped = Math.min(Math.max(Number(threshold) || 0.5, 0), 1);
        await runConfusion({
            pairs: validPairs.map((row) => ({ sourceId: row.sourceId!, targetId: row.targetId!, label: row.label })),
            threshold: clamped,
            modelPath: modelPath.trim() || undefined,
        });
    };

    const overviewTab = (
        <div className="space-y-4">
            <SectionHeader
                kicker="Persona"
                title="Persona dashboard"
                description="Roster, compatibility pairs, and quality signals."
                status={`Auth: ${authed ? "ready" : "sign in"} · ${statusText} · Compat ${compatText}`}
                actions={(
                    <div className="flex flex-wrap items-center gap-2">
                        <Button accent="#22d3ee" variant="outline" onClick={() => fetchPersonas()} disabled={status === "loading"}>
                            {status === "loading" ? "Refreshing..." : "Refresh"}
                        </Button>
                        <Button accent="#a78bfa" variant="outline" onClick={handleGenerate} disabled={seeding}>
                            {seeding ? "Seeding..." : `Generate ${generateCount}`}
                        </Button>
                        <Button accent="#f59e0b" variant="outline" onClick={() => recomputeCompatibilities()} disabled={compatStatus === "loading"}>
                            {compatStatus === "loading" ? "Recomputing..." : "Recompute"}
                        </Button>
                    </div>
                )}
            />

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {kpis.map((kpi) => (
                    <MetricTile key={kpi.label} label={kpi.label} value={kpi.value} hint={kpi.hint} accent={kpi.accent} trend={kpi.trend} />
                ))}
            </div>

            <Card
                eyebrow="Compatibility"
                title="Score distribution"
                actions={<Badge accent="#0ea5e9">Jaccard + ONNX</Badge>}
            >
                <Histogram bins={compatBins} labels={["0-0.2", "0.2-0.4", "0.4-0.6", "0.6-0.8", "0.8-1.0"]} footer={`Pairs: ${compatibilities.length}`} />
                <div className="mt-3 space-y-2">
                    {compatTop.length === 0 ? (
                        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">No compatibility rows yet.</div>
                    ) : (
                        compatTop.map((compat) => <CompatibilityRow key={compat.id} compat={compat} />)
                    )}
                </div>
            </Card>
        </div>
    );

    const rosterTab = (
        <div className="space-y-4">
            <SectionHeader
                kicker="Roster"
                title="Persona workspace"
                description="Search, tag, and create personas."
                status={`${filteredPersonas.length} shown / ${personas.length} total`}
                actions={<Badge accent="#22d3ee">Live roster</Badge>}
            />

            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
                <Input
                    placeholder="Search alias, account, tag"
                    value={rosterQuery}
                    onChange={(e) => setRosterQuery(e.target.value)}
                    className="min-w-[220px]"
                />
                <select
                    value={sortKey}
                    onChange={(e) => setSortKey(e.target.value as "alias" | "attributes")}
                    className="h-10 rounded-xl border border-white/15 bg-slate-900/60 px-3 text-sm text-white"
                >
                    <option value="attributes">Sort by attributes</option>
                    <option value="alias">Sort by alias</option>
                </select>
                {error ? <span className="text-amber-300">{error}</span> : null}
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
                <Pill tone="slate">{filteredPersonas.length} shown</Pill>
                <Pill tone="slate">{personas.length} total</Pill>
                {tagCounts.map(([tag, count]) => (
                    <Button
                        key={tag}
                        type="button"
                        variant={selectedTag === tag ? "solid" : "subtle"}
                        accent={selectedTag === tag ? "#22c55e" : "#94a3b8"}
                        className="px-3 py-1 text-[11px]"
                        onClick={() => setSelectedTag((current) => (current === tag ? null : tag))}
                    >
                        {tag} · {count}
                    </Button>
                ))}
                {selectedTag ? (
                    <Button
                        type="button"
                        variant="ghost"
                        accent="#94a3b8"
                        className="px-3 py-1 text-[11px]"
                        onClick={() => setSelectedTag(null)}
                    >
                        Clear tag
                    </Button>
                ) : null}
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                <Card eyebrow="Create" title="New persona" actions={<Badge accent="#22d3ee">Write</Badge>}>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Input placeholder="Alias" value={newAlias} onChange={(e) => setNewAlias(e.target.value)} />
                            <Input placeholder="Account" value={newAccount} onChange={(e) => setNewAccount(e.target.value)} />
                        </div>
                        <Input placeholder="Handle (optional)" value={newHandle} onChange={(e) => setNewHandle(e.target.value)} />
                        <Input placeholder="Tags comma separated" value={newTags} onChange={(e) => setNewTags(e.target.value)} />
                        <Textarea rows={3} placeholder="Note" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
                        <div className="flex flex-wrap items-center gap-2">
                            <Button accent="#22c55e" variant="solid" onClick={handleCreate} disabled={creating || !newAlias.trim() || !newAccount.trim()}>
                                {creating ? "Saving..." : "Create"}
                            </Button>
                            <Input
                                type="number"
                                min={1}
                                max={10}
                                value={generateCount}
                                onChange={(e) => setGenerateCount(Number(e.target.value))}
                                className="w-20"
                            />
                            <Button accent="#a78bfa" variant="outline" onClick={handleGenerate} disabled={seeding}>
                                {seeding ? "Seeding..." : "Generate"}
                            </Button>
                        </div>
                    </div>
                </Card>

                <TableCard title="Roster" subtitle={authed ? "Live" : "Auth required"} actions={<Badge accent="#22d3ee">Live roster</Badge>}>
                    {filteredPersonas.length === 0 ? (
                        <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4 text-sm text-slate-200">
                            {session ? "No personas match filters. Adjust search or tag." : "Sign in to view personas."}
                        </div>
                    ) : (
                        (() => {
                            type PersonaRow = (typeof filteredPersonas)[number] & { actions?: string };
                            const columns: TableColumn<PersonaRow>[] = [
                                { key: "alias", label: "Alias" },
                                { key: "account", label: "Account" },
                                { key: "tags", label: "Tags", render: (row) => (row.tags || []).join(", ") || "--" },
                                { key: "attributes", label: "Attributes", render: (row) => row.attributes.length },
                                {
                                    key: "actions",
                                    label: "Actions",
                                    render: (row) => (
                                        <div className="flex items-center gap-2 text-[11px]">
                                            <Button
                                                variant="subtle"
                                                accent="#22c55e"
                                                className="px-3 py-1"
                                                onClick={() => {
                                                    setSelectedPersonaId(row.id);
                                                    setActiveTab("attributes");
                                                }}
                                            >
                                                Edit attributes
                                            </Button>
                                            <Button
                                                variant="subtle"
                                                accent="#38bdf8"
                                                className="px-3 py-1"
                                                onClick={() => {
                                                    setSelectedPersonaId(row.id);
                                                    setActiveTab("compatibility");
                                                }}
                                            >
                                                View compat
                                            </Button>
                                        </div>
                                    ),
                                },
                            ];

                            return (
                                <Table
                                    columns={columns}
                                    rows={filteredPersonas as PersonaRow[]}
                                    rowKey={(row) => row.id}
                                />
                            );
                        })()
                    )}
                </TableCard>
            </div>
        </div>
    );

    const compatibilityTab = (
        <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
                <Button accent="#0ea5e9" onClick={() => fetchCompatibilities(selectedPersonaId)} disabled={compatStatus === "loading"}>
                    {compatStatus === "loading" ? "Fetching..." : "Fetch"}
                </Button>
                <Button accent="#f59e0b" onClick={() => recomputeCompatibilities()} disabled={compatStatus === "loading"}>
                    {compatStatus === "loading" ? "Recomputing..." : "Recompute"}
                </Button>
                <span className="rounded-full border border-white/10 px-3 py-1">{compatText}</span>
                {compatError ? <span className="text-amber-300">{compatError}</span> : null}
                {compatibilities.length > 0 ? (
                    <Button
                        variant={showGraph ? "solid" : "subtle"}
                        accent="#22c55e"
                        className="px-3 py-1 text-[11px]"
                        onClick={() => setShowGraph((prev) => !prev)}
                    >
                        {showGraph ? "Hide graph" : "Show graph"}
                    </Button>
                ) : null}
            </div>
            <Histogram bins={compatBins} labels={["0-0.2", "0.2-0.4", "0.4-0.6", "0.6-0.8", "0.8-1.0"]} footer={`Pairs: ${compatibilities.length}`} />
            {showGraph && compatibilities.length > 0 ? (
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-2">
                    <R3FErrorBoundary>
                        <Canvas dpr={[1, 1.5]} camera={{ position: [0, 6, 10], fov: 55 }} style={{ height: 340 }}>
                            <color attach="background" args={["#0b1224"]} />
                            <NodeLinkGraph
                                nodes={Array.from(
                                    new Map(
                                        compatibilities.flatMap((c) => [
                                            [c.source.id, { id: c.source.id, label: c.source.alias }],
                                            [c.target.id, { id: c.target.id, label: c.target.alias }],
                                        ]),
                                    ).values(),
                                )}
                                links={compatibilities.slice(0, 24).map((c) => ({
                                    source: c.source.id,
                                    target: c.target.id,
                                    weight: c.jaccardScore,
                                }))}
                                color="#a78bfa"
                                linkColor="#22d3ee"
                            />
                        </Canvas>
                    </R3FErrorBoundary>
                </div>
            ) : null}
            <div className="space-y-2">
                {compatTop.length === 0 ? (
                    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">No compatibility rows yet.</div>
                ) : (
                    compatTop.map((compat) => <CompatibilityRow key={compat.id} compat={compat} />)
                )}
            </div>
        </div>
    );

    const attributesTab = (
        <Grid gap="md" mdCols={3}>
            <Stack gap="sm">
                <FormField label="Persona" hint="Replace all attributes for the selected persona.">
                    <Select value={selectedPersonaId || ""} onChange={(e) => setSelectedPersonaId(e.target.value)}>
                        <option value="" disabled>
                            Select persona
                        </option>
                        {personaOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </Select>
                </FormField>
                <Button accent="#f59e0b" onClick={handleAttributesSave} disabled={!selectedPersonaId || parsedAttributes.length === 0}>
                    Save attributes
                </Button>
            </Stack>
            <Stack gap="sm" className="md:col-span-2">
                <FormField label="Attributes" hint="Format: category: value1, value2 | weight=1">
                    <Textarea
                        rows={6}
                        value={attributesInput}
                        onChange={(e) => setAttributesInput(e.target.value)}
                        placeholder="category: value1, value2 | weight=1"
                    />
                </FormField>
                <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                    <span className="rounded-full border border-white/10 px-2 py-1">Parsed {parsedAttributes.length} entries</span>
                    {parsedAttributes.map((attr, idx) => (
                        <span key={`${attr.category}-${idx}`} className="rounded-full bg-white/10 px-2 py-1">
                            {attr.category}: {attr.values.join("/")}
                            {attr.weight ? ` (w${attr.weight})` : ""}
                        </span>
                    ))}
                </div>
            </Stack>
        </Grid>
    );

    const qualityTab = (
        <Stack gap="md">
            <Grid gap="md" lgCols={3}>
                <Stack gap="sm">
                    <FormField label="Threshold (0-1)">
                        <Input
                            type="number"
                            min={0}
                            max={1}
                            step={0.01}
                            value={threshold}
                            onChange={(e) => setThreshold(Number(e.target.value))}
                        />
                    </FormField>
                    <FormField label="ONNX model path" hint="Optional">
                        <Input
                            placeholder="Optional ONNX model path"
                            value={modelPath}
                            onChange={(e) => setModelPath(e.target.value)}
                        />
                    </FormField>
                    <Button accent="#e11d48" onClick={handleRunConfusion} disabled={confusionStatus === "loading" || validPairs.length === 0}>
                        {confusionStatus === "loading" ? "Scoring..." : "Run confusion"}
                    </Button>
                    {confusionError ? <div className="text-xs text-amber-300">{confusionError}</div> : null}
                    {validPairs.length === 0 ? <div className="text-xs text-slate-400">Add at least one labeled pair.</div> : null}
                </Stack>
                <Stack gap="sm" className="lg:col-span-2">
                    <Stack direction="row" justify="between" align="center">
                        <span className="text-xs text-slate-400">Pairs ({pairRows.length})</span>
                        <Button
                            variant="subtle"
                            accent="#94a3b8"
                            className="px-3 py-1 text-[11px]"
                            onClick={() =>
                                setPairRows((rows) => [...rows, { id: `pair-${rows.length}`, label: rows.length % 2 === 0 }])
                            }
                        >
                            Add pair
                        </Button>
                    </Stack>
                    <Stack gap="sm">
                        {pairRows.map((row) => (
                            <div key={row.id} className="grid grid-cols-5 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2 py-2 text-sm text-white">
                                <Select
                                    value={row.sourceId || ""}
                                    onChange={(e) =>
                                        setPairRows((rows) => rows.map((r) => (r.id === row.id ? { ...r, sourceId: e.target.value } : r)))
                                    }
                                    className="col-span-2"
                                >
                                    <option value="">Source</option>
                                    {personaOptions.map((opt) => (
                                        <option key={`s-${opt.value}`} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </Select>
                                <Select
                                    value={row.targetId || ""}
                                    onChange={(e) =>
                                        setPairRows((rows) => rows.map((r) => (r.id === row.id ? { ...r, targetId: e.target.value } : r)))
                                    }
                                    className="col-span-2"
                                >
                                    <option value="">Target</option>
                                    {personaOptions.map((opt) => (
                                        <option key={`t-${opt.value}`} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </Select>
                                <label className="flex items-center gap-2 text-xs text-slate-200">
                                    <input
                                        type="checkbox"
                                        checked={row.label}
                                        onChange={(e) =>
                                            setPairRows((rows) => rows.map((r) => (r.id === row.id ? { ...r, label: e.target.checked } : r)))
                                        }
                                    />
                                    Match
                                </label>
                            </div>
                        ))}
                    </Stack>
                </Stack>
            </Grid>
            {confusion ? (
                <Stack gap="sm">
                    <ConfusionSummary result={confusion} />
                    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-200">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="rounded-full border border-white/10 px-2 py-1">TP {confusion.counts.tp}</span>
                            <span className="rounded-full border border-white/10 px-2 py-1">FP {confusion.counts.fp}</span>
                            <span className="rounded-full border border-white/10 px-2 py-1">TN {confusion.counts.tn}</span>
                            <span className="rounded-full border border-white/10 px-2 py-1">FN {confusion.counts.fn}</span>
                            <span className="rounded-full border border-white/10 px-2 py-1">Threshold {confusion.threshold}</span>
                            <span className="rounded-full border border-white/10 px-2 py-1">Missing {confusion.missing}</span>
                        </div>
                    </div>
                </Stack>
            ) : null}
        </Stack>
    );

    return (
        <div className="space-y-4">
            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                tabs={[
                    { key: "overview", label: "Overview", content: overviewTab },
                    { key: "roster", label: "Roster", content: rosterTab },
                    { key: "compatibility", label: "Compatibility", content: compatibilityTab },
                    { key: "quality", label: "Quality", content: qualityTab },
                    { key: "attributes", label: "Attributes", content: attributesTab },
                    { key: "assignments", label: "Assignments", content: <AssignmentsTabContent /> },
                    { key: "staffing", label: "Staffing", content: <StaffingTabContent /> },
                ]}
            />
        </div>
    );
}
