import { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Stars } from "@react-three/drei";

import { Html } from "../../r3f-primitives/Html";
import { R3FErrorBoundary } from "../../r3f-components/R3FErrorBoundary";
import { useAuthStore, type Session } from "../../../react-hooks/auth";
import { useGeoState } from "../../../zustand-stores/geo";

type Decoded = {
    sub?: string;
    email?: string;
    [key: string]: unknown;
};

const decodeJwt = (token?: string): Decoded => {
    if (!token) return {};
    const parts = token.split(".");
    if (parts.length !== 3) return {};
    try {
        const payload = JSON.parse(atob(parts[1]));
        return payload as Decoded;
    } catch (err) {
        console.warn("decode failed", err);
        return {};
    }
};

const fmt = (value?: string) => (value ? new Date(value).toLocaleString() : "-");
const truncate = (value?: string) => (value ? `${value.slice(0, 8)}…${value.slice(-6)}` : "-");

function NeonRing({ color, radius, z }: { color: string; radius: number; z: number }) {
    return (
        <Float speed={1.1} rotationIntensity={0.3} floatIntensity={0.35} position={[0, 0.1, z]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <torusGeometry args={[radius, 0.08, 24, 128]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} metalness={0.55} roughness={0.2} />
            </mesh>
        </Float>
    );
}

function FloatingMonolith() {
    return (
        <Float speed={0.8} rotationIntensity={0.32} floatIntensity={0.55} position={[0, 0.4, 0]}>
            <mesh castShadow position={[0, 0.6, 0]}>
                <boxGeometry args={[1.9, 2.9, 0.4]} />
                <meshStandardMaterial color="#0ea5e9" emissive="#38bdf8" emissiveIntensity={0.5} metalness={0.45} roughness={0.25} />
            </mesh>
        </Float>
    );
}

function GroundGrid() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="#0b1224" metalness={0.2} roughness={0.9} transparent opacity={0.92} />
        </mesh>
    );
}

function ProfileHud({ session, decoded, onClose }: { session: Session; decoded: Decoded; onClose?: () => void }) {
    const { signOut, requestDelete, deleteStatus, deleteProgress, deleteMessage } = useAuthStore();
    const { reset: resetGeo } = useGeoState();
    const [confirmText, setConfirmText] = useState<string>("");
    const phrase = "Delete-My-K3H4-Data";
    const canDelete = confirmText === phrase && deleteStatus !== "running" && deleteStatus !== "queued";

    return (
        <div className="pointer-events-auto w-[500px] max-w-[92vw] rounded-2xl border border-white/12 bg-slate-900/80 p-6 text-slate-50 shadow-2xl backdrop-blur">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <div className="text-[11px] uppercase tracking-[0.24em] text-slate-400">Profile</div>
                    <div className="text-2xl font-semibold text-white">Welcome back</div>
                    <p className="mt-1 text-sm text-slate-300">Manage tokens, identity, and data lifecycle.</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <button
                        className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white transition hover:border-white/40 hover:bg-white/15"
                        onClick={() => {
                            resetGeo();
                            void signOut();
                            onClose?.();
                        }}
                        type="button"
                    >
                        Sign out
                    </button>
                    {onClose ? (
                        <button
                            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-200 transition hover:border-white/20 hover:bg-white/10"
                            onClick={onClose}
                            type="button"
                        >
                            Close
                        </button>
                    ) : null}
                </div>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Identity</div>
                    <div className="mt-2 space-y-1 text-[13px] text-slate-100">
                        <div className="flex justify-between gap-3"><span className="text-slate-400">Email</span><span>{(decoded.email as string) || "-"}</span></div>
                        <div className="flex justify-between gap-3"><span className="text-slate-400">User</span><span>{(decoded.sub as string) || "-"}</span></div>
                        <div className="flex justify-between gap-3"><span className="text-slate-400">Expires</span><span>{fmt(session.expiresAt)}</span></div>
                    </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Tokens</div>
                    <div className="mt-2 space-y-1 text-[13px] text-slate-100">
                        <div className="flex justify-between gap-3"><span className="text-slate-400">Access</span><span className="font-mono text-[11px]">{truncate(session.accessToken)}</span></div>
                        <div className="flex justify-between gap-3"><span className="text-slate-400">Refresh</span><span className="font-mono text-[11px]">{truncate(session.refreshToken)}</span></div>
                    </div>
                    <div className="mt-3 text-[11px] text-slate-400">Stored locally as k3h4.session. Delete to force re-auth.</div>
                </div>
            </div>

            <div className="mt-4 rounded-xl border border-rose-300/25 bg-rose-900/20 p-3">
                <div className="text-[11px] uppercase tracking-[0.2em] text-rose-200">Delete account</div>
                <p className="mt-1 text-[13px] text-rose-100">Type the confirmation phrase to delete all data. This cannot be undone.</p>
                <p className="mt-1 text-[11px] text-rose-200">Phrase: {phrase}</p>
                <input
                    className="mt-2 w-full rounded-lg border border-rose-200/30 bg-rose-950/40 px-3 py-2 text-sm text-rose-50 placeholder:text-rose-300/60 focus:border-rose-200/70 focus:outline-none"
                    placeholder="Type phrase exactly"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                />
                <div className="mt-2 flex flex-col gap-2 text-[11px] text-rose-100">
                    <div className="flex items-center justify-between">
                        <span>Status: {deleteStatus}</span>
                        <span>{deleteProgress}%</span>
                    </div>
                    {deleteMessage ? <div className="rounded-lg border border-rose-200/20 bg-rose-900/20 px-3 py-2 text-[12px]">{deleteMessage}</div> : null}
                </div>
                <button
                    className="mt-2 w-full rounded-xl border border-rose-200/40 bg-rose-500/30 px-3 py-2 text-sm font-semibold text-rose-50 transition hover:border-rose-200/70 hover:bg-rose-500/40 disabled:cursor-not-allowed disabled:border-rose-200/20 disabled:bg-rose-500/15 disabled:text-rose-200"
                    disabled={!canDelete}
                    onClick={async () => {
                        await requestDelete(confirmText);
                        resetGeo();
                        onClose?.();
                    }}
                    type="button"
                >
                    {deleteStatus === "running" || deleteStatus === "queued" ? "Deleting..." : "Delete my account"}
                </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-[12px] text-slate-200">
                <a
                    href="/map"
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 font-semibold text-white transition hover:border-white/30 hover:bg-white/15"
                >
                    Launch map
                </a>
                <a
                    href="/telemetry"
                    className="rounded-full border border-white/15 bg-emerald-500/30 px-3 py-1.5 font-semibold text-white transition hover:border-white/30 hover:bg-emerald-500/40"
                >
                    Telemetry deck
                </a>
            </div>
        </div>
    );
}

export function SessionLanding({ session, onClose }: { session: Session; onClose?: () => void }) {
    const decoded = useMemo(() => decodeJwt(session.accessToken), [session.accessToken]);

    return (
        <div className="relative h-screen w-screen bg-slate-950 text-white">
            <R3FErrorBoundary>
                <Canvas
                    shadows
                    dpr={[1, 2]}
                    camera={{ position: [0, 2.6, 7], fov: 55 }}
                    gl={{ antialias: true, alpha: false }}
                >
                    <color attach="background" args={["#030712"]} />
                    <fog attach="fog" args={["#030712", 10, 24]} />
                    <ambientLight intensity={0.4} color="#e0f2fe" />
                    <pointLight position={[6, 4, 6]} intensity={1.4} color="#38bdf8" castShadow />
                    <pointLight position={[-5, 3, -5]} intensity={1.1} color="#f472b6" />
                    <Stars radius={80} depth={50} count={1200} factor={3} saturation={0.2} fade speed={1} />

                    <GroundGrid />
                    <FloatingMonolith />
                    <NeonRing color="#38bdf8" radius={2.8} z={-1.2} />
                    <NeonRing color="#a855f7" radius={3.8} z={1.2} />
                    <NeonRing color="#22d3ee" radius={5.2} z={-2.4} />

                    <Html position={[0, 1.4, 0]} distanceFactor={10}>
                        <ProfileHud session={session} decoded={decoded} onClose={onClose} />
                    </Html>

                    <OrbitControls enablePan={false} maxDistance={12} minDistance={4} maxPolarAngle={Math.PI / 2.1} />
                </Canvas>
            </R3FErrorBoundary>
        </div>
    );
}
