import { useMemo } from "react";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { PageHeader } from "../radix-components/PageHeader";
import { AssignmentBoard } from "../radix-components/AssignmentBoard";
import { R3FErrorBoundary } from "../r3f-components/R3FErrorBoundary";
import { useAssignmentState } from "../react-hooks/assignments";
import { useAuthStore } from "../react-hooks/auth";

type Endpoint = {
    method: "GET" | "POST";
    path: string;
    description: string;
};

const endpoints: Endpoint[] = [
    {
        method: "GET",
        path: "/assignments",
        description: "List assignments with nested timecards and payouts for the current session.",
    },
    {
        method: "POST",
        path: "/assignments",
        description: "Create a new assignment linked to a persona with an hourly rate.",
    },
    {
        method: "POST",
        path: "/assignments/{id}/timecards",
        description: "Append a timecard entry with hours worked and an optional note.",
    },
    {
        method: "POST",
        path: "/assignments/{id}/pay",
        description: "Mark a timecard as paid and record the payout with an optional note.",
    },
];

const methodColors: Record<Endpoint["method"], string> = {
    GET: "border-emerald-400/40 bg-emerald-500/10 text-emerald-100",
    POST: "border-sky-400/40 bg-sky-500/10 text-sky-100",
};

function MethodBadge({ method }: { method: Endpoint["method"] }) {
    return <span className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold ${methodColors[method]}`}>{method}</span>;
}

function EndpointCard({ endpoint }: { endpoint: Endpoint }) {
    return (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-lg transition hover:border-white/20 hover:bg-white/10">
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <MethodBadge method={endpoint.method} />
                    <span className="font-mono text-xs text-emerald-50/90">{endpoint.path}</span>
                </div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-white/60">Assignments</span>
            </div>
            <p className="mt-2 text-sm text-slate-200">{endpoint.description}</p>
        </div>
    );
}

function StatTile({ label, value, hint }: { label: string; value: string; hint?: string }) {
    return (
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">{label}</div>
            <div className="text-xl font-semibold text-white">{value}</div>
            {hint ? <div className="text-[11px] text-slate-400">{hint}</div> : null}
        </div>
    );
}

export function AssignmentsPage() {
    const { session } = useAuthStore();
    const { metrics, status, error, assignments, fetchAssignments } = useAssignmentState();

    const statusMessage = useMemo(() => {
        if (error) return error;
        if (status === "loading") return "Loading assignments...";
        if (status === "ready") return `${assignments.length} loaded`;
        return "Waiting for auth...";
    }, [status, error, assignments.length]);

    return (
        <div className="relative min-h-screen w-screen overflow-hidden bg-slate-950 text-white">
            <div className="pointer-events-none absolute inset-0">
                <R3FErrorBoundary>
                    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 9], fov: 45 }} gl={{ antialias: true, alpha: false }}>
                        <color attach="background" args={["#020617"]} />
                        <ambientLight intensity={0.22} color="#cbd5e1" />
                        <Stars radius={150} depth={110} count={1600} factor={1.0} saturation={0.07} fade speed={0.3} />
                        <Stars radius={90} depth={70} count={1100} factor={0.82} saturation={0.08} fade speed={0.46} />
                    </Canvas>
                </R3FErrorBoundary>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(52,211,153,0.12),transparent_45%),radial-gradient(circle_at_80%_12%,rgba(56,189,248,0.12),transparent_42%),radial-gradient(circle_at_70%_82%,rgba(236,72,153,0.12),transparent_40%)]" />
            </div>

            <div className="relative z-10 flex min-h-screen flex-col">
                <PageHeader className="sticky top-0 z-20" />
                <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-10">
                    <div className="rounded-2xl border border-white/10 bg-slate-900/85 p-6 shadow-2xl backdrop-blur">
                        <p className="text-xs uppercase tracking-[0.28em] text-emerald-200/80">Assignment</p>
                        <h1 className="mt-2 text-3xl font-semibold text-white">Assignments and tasks</h1>
                        <p className="mt-2 text-sm text-slate-200">
                            Live assignment ledger plus the HTTP endpoints to list work, log hours, and issue payouts.
                        </p>
                        <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-slate-300">
                            <button
                                type="button"
                                className="rounded border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-white/30 hover:bg-white/10 disabled:opacity-60"
                                onClick={() => fetchAssignments()}
                                disabled={!session?.accessToken || status === "loading"}
                            >
                                {status === "loading" ? "Refreshing..." : "Refresh data"}
                            </button>
                            <div className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-slate-200">Auth required: Bearer token</div>
                            <div className="text-[11px] text-slate-300">{statusMessage}</div>
                        </div>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            <StatTile label="Assignments" value={metrics.count.toString()} hint="GET /assignments" />
                            <StatTile label="Total hours" value={metrics.hours.toFixed(1)} hint="Sum of timecards" />
                            <StatTile label="Payouts" value={`₭${metrics.payouts.toFixed(2)}`} hint="POST /assignments/{id}/pay" />
                            <StatTile label="Create" value="POST /assignments" hint="Persona + rate" />
                        </div>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-2">
                        {endpoints.map((ep) => (
                            <EndpointCard key={ep.path + ep.method} endpoint={ep} />
                        ))}
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-slate-900/85 p-5 shadow-2xl backdrop-blur">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <div className="text-sm font-semibold text-white">Assignments board</div>
                                <div className="text-xs text-slate-400">Interactive UI backed by the endpoints above.</div>
                            </div>
                            <div className="text-[11px] text-slate-400">Endpoints: GET, POST, timecards, pay</div>
                        </div>
                        <div className="mt-4">
                            <AssignmentBoard />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
