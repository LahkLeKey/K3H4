import { useMemo } from "react";

import { useAuthStore, type Session } from "../../react-hooks/auth";

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

export function SessionLanding({ session }: { session: Session }) {
    const { signOut } = useAuthStore();
    const decoded = useMemo(() => decodeJwt(session.accessToken), [session.accessToken]);

    return (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-b from-slate-950/65 via-slate-950/82 to-slate-950/94 text-slate-50">
            <div className="pointer-events-auto w-full max-w-3xl rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-900/60 backdrop-blur">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="text-xs uppercase tracking-[0.3em] text-slate-400">Session active</div>
                        <div className="text-3xl font-bold text-white md:text-4xl">Welcome back</div>
                        <p className="mt-2 max-w-xl text-sm text-slate-300">You are signed in. Tokens stay client-side; reload to persist. Manage your data from the profile tools.</p>
                    </div>
                    <button
                        className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-white/40 hover:bg-white/20"
                        onClick={signOut}
                    >
                        Sign out
                    </button>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="text-xs uppercase tracking-[0.25em] text-slate-400">Identity</div>
                        <div className="mt-2 space-y-1 text-sm text-slate-100">
                            <div className="flex justify-between gap-3"><span className="text-slate-400">Email</span><span>{(decoded.email as string) || "-"}</span></div>
                            <div className="flex justify-between gap-3"><span className="text-slate-400">User</span><span>{(decoded.sub as string) || "-"}</span></div>
                            <div className="flex justify-between gap-3"><span className="text-slate-400">Expires</span><span>{fmt(session.expiresAt)}</span></div>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="text-xs uppercase tracking-[0.25em] text-slate-400">Tokens</div>
                        <div className="mt-2 space-y-1 text-sm text-slate-100">
                            <div className="flex justify-between gap-3"><span className="text-slate-400">Access</span><span className="font-mono text-xs">{truncate(session.accessToken)}</span></div>
                            <div className="flex justify-between gap-3"><span className="text-slate-400">Refresh</span><span className="font-mono text-xs">{truncate(session.refreshToken)}</span></div>
                        </div>
                        <div className="mt-3 text-xs text-slate-400">Stored locally as k3h4.session. Delete to force re-auth.</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
