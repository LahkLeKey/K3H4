import { useEffect, useState } from "react";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { PageHeader } from "../components/PageHeader";
import { R3FErrorBoundary } from "../r3f-components/R3FErrorBoundary";
import { StaffingBoard } from "../radix-components/StaffingBoard";
import { useStaffingState } from "../react-hooks/staffing";
import { useAuthStore } from "../react-hooks/auth";

const MetricTile = ({ label, value, hint }: { label: string; value: string; hint?: string }) => (
    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
        <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">{label}</div>
        <div className="text-xl font-semibold text-white">{value}</div>
        {hint ? <div className="text-[11px] text-slate-400">{hint}</div> : null}
    </div>
);

export function StaffingPage() {
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

    const stageOptions = ["sourced", "screening", "interview", "offer", "placed"];
    const shiftStatusOptions = ["draft", "open", "scheduled", "closed"];
    const placementStatusOptions = ["confirmed", "pending", "cancelled"];

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
    };

    return (
        <div className="relative min-h-screen w-screen overflow-hidden bg-slate-950 text-white">
            <div className="pointer-events-none absolute inset-0">
                <R3FErrorBoundary>
                    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 9], fov: 45 }} gl={{ antialias: true, alpha: false }}>
                        <color attach="background" args={["#020617"]} />
                        <ambientLight intensity={0.2} color="#cbd5e1" />
                        <Stars radius={150} depth={110} count={1700} factor={1.0} saturation={0.07} fade speed={0.3} />
                        <Stars radius={95} depth={75} count={1200} factor={0.84} saturation={0.08} fade speed={0.45} />
                    </Canvas>
                </R3FErrorBoundary>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(16,185,129,0.14),transparent_42%),radial-gradient(circle_at_78%_18%,rgba(59,130,246,0.12),transparent_38%),radial-gradient(circle_at_68%_78%,rgba(14,165,233,0.12),transparent_42%)]" />
            </div>

            <div className="relative z-10 flex min-h-screen flex-col">
                <PageHeader className="sticky top-0 z-20" />
                <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-10">
                    <div className="rounded-2xl border border-white/10 bg-slate-900/85 p-6 shadow-2xl backdrop-blur">
                        <p className="text-xs uppercase tracking-[0.28em] text-emerald-200/80">Staffing</p>
                        <h1 className="mt-2 text-3xl font-semibold text-white">Staffing and workforce planning</h1>
                        <p className="mt-2 text-sm text-slate-200">
                            A compact surface for staffing and shift operations: plan demand, recruit talent, advance candidates, and finalize placements.
                            All endpoints require an authenticated session.
                        </p>
                        <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-slate-300">
                            <div className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-slate-200">Auth required: Bearer token</div>
                            <div className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-slate-200">Focus: staffing + shifts</div>
                            {error ? <div className="text-[11px] text-amber-300">{error}</div> : null}
                        </div>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            <MetricTile label="Open roles" value={(metrics?.openRoles ?? 0).toString()} hint="Live" />
                            <MetricTile label="Candidates" value={(metrics?.activeCandidates ?? 0).toString()} hint="Live" />
                            <MetricTile label="Shifts" value={(metrics?.scheduledShifts ?? 0).toString()} hint="Live" />
                            <MetricTile label="Placements" value={(metrics?.activePlacements ?? 0).toString()} hint={`Fill ${metrics?.fillRate ?? 0}%`} />
                        </div>
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
                                    <button type="button" className="h-9 rounded border border-emerald-400/40 bg-emerald-500/15 px-3 text-sm font-semibold text-emerald-50 disabled:opacity-60" onClick={handleEngagement} disabled={!authed || busy || !engName.trim()}>
                                        {busy ? "Working…" : "Create engagement"}
                                    </button>
                                </div>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                                <div className="text-sm font-semibold text-white">Role</div>
                                <div className="text-[11px] text-slate-400">POST /staffing/roles</div>
                                <div className="mt-3 grid gap-2">
                                    <input className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" placeholder="Title" value={roleTitle} onChange={(e) => setRoleTitle(e.target.value)} />
                                    <select
                                        className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white"
                                        value={roleEngagementId}
                                        onChange={(e) => setRoleEngagementId(e.target.value)}
                                    >
                                        <option value="">Engagement (optional)</option>
                                        {engagements.map((eng) => (
                                            <option key={eng.id} value={eng.id}>
                                                {eng.name} {eng.client ? `· ${eng.client}` : ""}
                                            </option>
                                        ))}
                                    </select>
                                    <input className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" placeholder="Location" value={roleLocation} onChange={(e) => setRoleLocation(e.target.value)} />
                                    <div className="grid grid-cols-2 gap-2">
                                        <select
                                            className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white"
                                            value={rolePriority}
                                            onChange={(e) => setRolePriority(e.target.value)}
                                        >
                                            <option value="">Priority</option>
                                            {[
                                                { value: "high", label: "High" },
                                                { value: "medium", label: "Medium" },
                                                { value: "low", label: "Low" },
                                            ].map((opt) => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                        <select
                                            className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white"
                                            value={roleStatus}
                                            onChange={(e) => setRoleStatus(e.target.value)}
                                        >
                                            <option value="">Status</option>
                                            {[
                                                { value: "open", label: "Open" },
                                                { value: "paused", label: "Paused" },
                                                { value: "closed", label: "Closed" },
                                            ].map((opt) => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        <input className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" type="number" placeholder="Openings" value={roleOpenings} onChange={(e) => setRoleOpenings(e.target.value)} />
                                        <input className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" type="number" placeholder="Rate min" value={roleRateMin} onChange={(e) => setRoleRateMin(e.target.value)} />
                                        <input className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" type="number" placeholder="Rate max" value={roleRateMax} onChange={(e) => setRoleRateMax(e.target.value)} />
                                    </div>
                                    <button type="button" className="h-9 rounded border border-emerald-400/40 bg-emerald-500/15 px-3 text-sm font-semibold text-emerald-50 disabled:opacity-60" onClick={handleRole} disabled={!authed || busy || !roleTitle.trim()}>
                                        {busy ? "Working…" : "Create role"}
                                    </button>
                                </div>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                                <div className="text-sm font-semibold text-white">Candidate</div>
                                <div className="text-[11px] text-slate-400">POST /staffing/candidates</div>
                                <div className="mt-3 grid gap-2">
                                    <input className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" placeholder="Full name" value={candName} onChange={(e) => setCandName(e.target.value)} />
                                    <select
                                        className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white"
                                        value={candRoleId}
                                        onChange={(e) => setCandRoleId(e.target.value)}
                                    >
                                        <option value="">Role (optional)</option>
                                        {roles.map((role) => (
                                            <option key={role.id} value={role.id}>
                                                {role.title} {role.location ? `· ${role.location}` : ""}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" placeholder="Desired rate" value={candDesired} onChange={(e) => setCandDesired(e.target.value)} />
                                        <select
                                            className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white"
                                            value={candStage}
                                            onChange={(e) => setCandStage(e.target.value)}
                                        >
                                            {stageOptions.map((s) => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <button type="button" className="h-9 rounded border border-emerald-400/40 bg-emerald-500/15 px-3 text-sm font-semibold text-emerald-50 disabled:opacity-60" onClick={handleCandidate} disabled={!authed || busy || !candName.trim()}>
                                        {busy ? "Working…" : "Create candidate"}
                                    </button>
                                </div>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                                <div className="text-sm font-semibold text-white">Advance stage</div>
                                <div className="text-[11px] text-slate-400">POST /staffing/candidates/{`{id}`}/stage</div>
                                <div className="mt-3 grid gap-2">
                                    <select
                                        className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white"
                                        value={stageCandidateId}
                                        onChange={(e) => setStageCandidateId(e.target.value)}
                                    >
                                        <option value="">Candidate</option>
                                        {candidates.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.fullName} {c.stage ? `· ${c.stage}` : ""}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white"
                                        value={stageValue}
                                        onChange={(e) => setStageValue(e.target.value)}
                                    >
                                        {stageOptions.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                    <button type="button" className="h-9 rounded border border-emerald-400/40 bg-emerald-500/15 px-3 text-sm font-semibold text-emerald-50 disabled:opacity-60" onClick={handleStage} disabled={!authed || busy || !stageCandidateId.trim()}>
                                        {busy ? "Working…" : "Advance stage"}
                                    </button>
                                </div>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                                <div className="text-sm font-semibold text-white">Shift</div>
                                <div className="text-[11px] text-slate-400">POST /staffing/shifts</div>
                                <div className="mt-3 grid gap-2">
                                    <input className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white" placeholder="Title" value={shiftTitle} onChange={(e) => setShiftTitle(e.target.value)} />
                                    <select
                                        className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white"
                                        value={shiftRoleId}
                                        onChange={(e) => setShiftRoleId(e.target.value)}
                                    >
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
                                        <select
                                            className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white"
                                            value={shiftStatus}
                                            onChange={(e) => setShiftStatus(e.target.value)}
                                        >
                                            <option value="">Status</option>
                                            {shiftStatusOptions.map((s) => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <button type="button" className="h-9 rounded border border-emerald-400/40 bg-emerald-500/15 px-3 text-sm font-semibold text-emerald-50 disabled:opacity-60" onClick={handleShift} disabled={!authed || busy || !shiftTitle.trim()}>
                                        {busy ? "Working…" : "Create shift"}
                                    </button>
                                </div>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                                <div className="text-sm font-semibold text-white">Placement</div>
                                <div className="text-[11px] text-slate-400">POST /staffing/placements</div>
                                <div className="mt-3 grid gap-2">
                                    <div className="grid grid-cols-2 gap-2">
                                        <select
                                            className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white"
                                            value={placementCandidateId}
                                            onChange={(e) => setPlacementCandidateId(e.target.value)}
                                        >
                                            <option value="">Candidate</option>
                                            {candidates.map((c) => (
                                                <option key={c.id} value={c.id}>
                                                    {c.fullName} {c.stage ? `· ${c.stage}` : ""}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white"
                                            value={placementRoleId}
                                            onChange={(e) => setPlacementRoleId(e.target.value)}
                                        >
                                            <option value="">Role</option>
                                            {roles.map((r) => (
                                                <option key={r.id} value={r.id}>
                                                    {r.title} {r.location ? `· ${r.location}` : ""}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <select
                                        className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white"
                                        value={placementEngagementId}
                                        onChange={(e) => setPlacementEngagementId(e.target.value)}
                                    >
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
                                    <select
                                        className="h-9 rounded border border-white/15 bg-slate-900/60 px-3 text-sm text-white"
                                        value={placementStatus}
                                        onChange={(e) => setPlacementStatus(e.target.value)}
                                    >
                                        {placementStatusOptions.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                    <button type="button" className="h-9 rounded border border-emerald-400/40 bg-emerald-500/15 px-3 text-sm font-semibold text-emerald-50 disabled:opacity-60" onClick={handlePlacement} disabled={!authed || busy}>
                                        {busy ? "Working…" : "Create placement"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-slate-900/85 p-5 shadow-2xl backdrop-blur">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <div className="text-sm font-semibold text-white">Live staffing dashboard</div>
                                <div className="text-xs text-slate-400">Backed by /staffing/dashboard with auth</div>
                            </div>
                            <div className="text-[11px] text-slate-400">Fetch + refresh</div>
                        </div>
                        <div className="mt-4">
                            <StaffingBoard />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
