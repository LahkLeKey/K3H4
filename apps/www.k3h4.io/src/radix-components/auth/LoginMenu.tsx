import { useMemo } from "react";

import { useAuthStore, type Provider } from "../../react-hooks/auth";

export function LoginMenu() {
    const { apiBase, providerLoading, error, startOAuth } = useAuthStore();
    const origin = useMemo(() => (typeof window !== "undefined" ? window.location.origin : ""), []);

    const handleStart = (provider: Provider) => {
        const redirectUri = origin ? `${origin}/auth/callback/${provider}` : undefined;
        void startOAuth(provider, redirectUri);
    };

    return (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-b from-slate-950/70 via-slate-950/82 to-slate-950/95 text-slate-50">
            <div className="pointer-events-auto w-full max-w-3xl rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-900/60 backdrop-blur">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="text-xs uppercase tracking-[0.3em] text-slate-400">Kyle Halek</div>
                        <div className="text-3xl font-bold text-white md:text-4xl">Welcome to my portfolio</div>
                        <p className="mt-2 max-w-xl text-sm text-slate-300">
                            Log in with GitHub or LinkedIn. You control your footprintdelete your own data from my production database any time from your profile.
                        </p>
                        <p className="mt-1 text-xs text-slate-500">API base: {apiBase}</p>
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-emerald-200">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        Live auth gateway
                    </div>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-2">
                    <button
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-left transition hover:border-white/30 hover:bg-white/10"
                        onClick={() => handleStart("github")}
                        disabled={!!providerLoading}
                    >
                        <div className="absolute inset-0 opacity-0 blur-3xl transition group-hover:opacity-25" style={{ background: "radial-gradient(circle at 20% 20%, rgba(125,211,252,0.6), transparent 40%)" }} />
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <div className="text-sm font-semibold text-white">Login with GitHub</div>
                                <div className="text-xs text-slate-300">GitHub OAuth redirect</div>
                            </div>
                            <span className="text-lg text-slate-200 transition group-hover:translate-x-1">{providerLoading === "github" ? "…" : "→"}</span>
                        </div>
                    </button>

                    <button
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-left transition hover:border-white/30 hover:bg-white/10"
                        onClick={() => handleStart("linkedin")}
                        disabled={!!providerLoading}
                    >
                        <div className="absolute inset-0 opacity-0 blur-3xl transition group-hover:opacity-25" style={{ background: "radial-gradient(circle at 80% 30%, rgba(165,180,252,0.6), transparent 40%)" }} />
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <div className="text-sm font-semibold text-white">Login with LinkedIn</div>
                                <div className="text-xs text-slate-300">LinkedIn OAuth redirect</div>
                            </div>
                            <span className="text-lg text-slate-200 transition group-hover:translate-x-1">{providerLoading === "linkedin" ? "…" : "→"}</span>
                        </div>
                    </button>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Build: portfolio login</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Providers: GitHub + LinkedIn</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Data control: self-delete</span>
                </div>

                {error ? <div className="mt-3 rounded-2xl border border-rose-400/30 bg-rose-900/40 px-4 py-2 text-sm text-rose-100">{error}</div> : null}
            </div>
        </div>
    );
}
