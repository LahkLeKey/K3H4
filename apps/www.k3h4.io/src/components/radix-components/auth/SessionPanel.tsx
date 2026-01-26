import { useMemo, useState } from "react";

import { useAuthStore, type Session } from "../../../react-hooks/auth";
import { useGeoState } from "../../../zustand-stores/geo";
import { ExploreBar } from "../../ui";

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

type SessionPanelProps = {
    session: Session;
    onClose?: () => void;
    variant?: "overlay" | "page";
};

export function SessionPanel({ session, onClose, variant = "overlay" }: SessionPanelProps) {
    const { signOut, requestDelete, deleteStatus, deleteProgress, deleteMessage } = useAuthStore();
    const { reset: resetGeo } = useGeoState();
    const [confirmText, setConfirmText] = useState<string>("");
    const decoded = useMemo(() => decodeJwt(session.accessToken), [session.accessToken]);
    const phrase = "Delete-My-K3H4-Data";
    const canDelete = confirmText === phrase && deleteStatus !== "running" && deleteStatus !== "queued";

    const card = (
        <div className="pointer-events-auto w-full max-w-3xl rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-900/60 backdrop-blur">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                    <div className="text-xs uppercase tracking-[0.3em] text-slate-400">Session active</div>
                    <div className="text-3xl font-bold text-white md:text-4xl">Welcome back</div>
                    <p className="mt-2 max-w-xl text-sm text-slate-300">
                        You are signed in. Tokens stay client-side; reload to persist. Manage your data from the profile tools.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-white/40 hover:bg-white/20"
                        onClick={() => {
                            resetGeo();
                            void signOut();
                            onClose?.();
                        }}
                    >
                        Sign out
                    </button>
                    {onClose ? (
                        <button
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200 transition hover:border-white/20 hover:bg-white/10"
                            onClick={onClose}
                            type="button"
                        >
                            Close
                        </button>
                    ) : null}
                </div>
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

            <div className="mt-6 rounded-2xl border border-rose-300/20 bg-rose-900/15 p-4">
                <div className="text-xs uppercase tracking-[0.25em] text-rose-200">Delete account</div>
                <p className="mt-2 text-sm text-rose-100">Type the confirmation phrase to delete all data. This cannot be undone.</p>
                <p className="mt-1 text-xs text-rose-200">Phrase: {phrase}</p>
                <input
                    className="mt-3 w-full rounded-xl border border-rose-200/30 bg-rose-950/40 px-3 py-2 text-sm text-rose-50 placeholder:text-rose-300/60 focus:border-rose-200/70 focus:outline-none"
                    placeholder="Type phrase exactly"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                />
                <div className="mt-3 flex flex-col gap-2 text-xs text-rose-100">
                    <div className="flex items-center justify-between">
                        <span>Status: {deleteStatus}</span>
                        <span>{deleteProgress}%</span>
                    </div>
                    {deleteMessage ? <div className="rounded-lg border border-rose-200/20 bg-rose-900/20 px-3 py-2 text-[13px]">{deleteMessage}</div> : null}
                </div>
                <button
                    className="mt-3 w-full rounded-2xl border border-rose-200/40 bg-rose-500/30 px-4 py-2 text-sm font-semibold text-rose-50 transition hover:border-rose-200/70 hover:bg-rose-500/40 disabled:cursor-not-allowed disabled:border-rose-200/20 disabled:bg-rose-500/15 disabled:text-rose-200"
                    disabled={!canDelete}
                    onClick={async () => {
                        await requestDelete(confirmText);
                        resetGeo();
                        onClose?.();
                    }}
                >
                    {deleteStatus === "running" || deleteStatus === "queued" ? "Deleting..." : "Delete my account"}
                </button>
            </div>

            <div className="mt-6">
                <ExploreBar floating={false} className="pointer-events-auto justify-start" />
            </div>
        </div>
    );

    if (variant === "overlay") {
        return (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-b from-slate-950/65 via-slate-950/82 to-slate-950/94 text-slate-50">
                {card}
            </div>
        );
    }

    return <div className="mx-auto text-slate-50">{card}</div>;
}
