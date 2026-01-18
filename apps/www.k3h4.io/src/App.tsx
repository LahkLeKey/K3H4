import "./index.css";

import { Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo, useState } from "react";

import { AtlasScene } from "./components/AtlasScene";

type Provider = "github" | "linkedin";

function LoginMenu() {
    const apiBase = useMemo(() => (globalThis as any).__API_URL__ || (import.meta as any)?.env?.API_URL || "http://localhost:3001", []);
    const [loading, setLoading] = useState<Provider | null>(null);
    const [error, setError] = useState<string | null>(null);

    const startOAuth = async (provider: Provider) => {
        setError(null);
        setLoading(provider);
        const fallback = `${apiBase}/auth/${provider}`;
        try {
            const res = await fetch(`${apiBase}/auth/${provider}/url`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });
            if (!res.ok) throw new Error(`Auth init failed (${res.status})`);
            const data = await res.json().catch(() => ({}));
            const redirect = data.url || data.authorizationUrl || data.redirect || data.location || fallback;
            window.location.href = redirect;
        } catch (err) {
            console.error(err);
            setError("Could not start authentication. Check API_URL and try again.");
            setLoading(null);
        }
    };

    return (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-b from-slate-950/70 via-slate-950/82 to-slate-950/95 text-slate-50">
            <div className="pointer-events-auto w-full max-w-3xl rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-900/60 backdrop-blur">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="text-xs uppercase tracking-[0.3em] text-slate-400">K3H4</div>
                        <div className="text-3xl font-bold text-white md:text-4xl">Atlas Command</div>
                        <p className="mt-2 max-w-xl text-sm text-slate-300">
                            Sign in to launch the K3H4 client. Use your GitHub or LinkedIn account; we’ll bounce you through our auth gateway.
                        </p>
                        <p className="mt-1 text-xs text-slate-500">API base: {apiBase}</p>
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-emerald-200">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        Auth gateway: ready
                    </div>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-2">
                    <button
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-left transition hover:border-white/30 hover:bg-white/10"
                        onClick={() => startOAuth("github")}
                        disabled={!!loading}
                    >
                        <div className="absolute inset-0 opacity-0 blur-3xl transition group-hover:opacity-25" style={{ background: "radial-gradient(circle at 20% 20%, rgba(125,211,252,0.6), transparent 40%)" }} />
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <div className="text-sm font-semibold text-white">Login with GitHub</div>
                                <div className="text-xs text-slate-300">Uses /auth/github/url</div>
                            </div>
                            <span className="text-lg text-slate-200 transition group-hover:translate-x-1">{loading === "github" ? "…" : "→"}</span>
                        </div>
                    </button>

                    <button
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-left transition hover:border-white/30 hover:bg-white/10"
                        onClick={() => startOAuth("linkedin")}
                        disabled={!!loading}
                    >
                        <div className="absolute inset-0 opacity-0 blur-3xl transition group-hover:opacity-25" style={{ background: "radial-gradient(circle at 80% 30%, rgba(165,180,252,0.6), transparent 40%)" }} />
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <div className="text-sm font-semibold text-white">Login with LinkedIn</div>
                                <div className="text-xs text-slate-300">Uses /auth/linkedin/url</div>
                            </div>
                            <span className="text-lg text-slate-200 transition group-hover:translate-x-1">{loading === "linkedin" ? "…" : "→"}</span>
                        </div>
                    </button>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Build: login gateway</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Providers: GitHub, LinkedIn</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Region: auto</span>
                </div>

                {error ? <div className="mt-3 rounded-2xl border border-rose-400/30 bg-rose-900/40 px-4 py-2 text-sm text-rose-100">{error}</div> : null}
            </div>
        </div>
    );
}

export default function App() {
    return (
        <div className="relative h-screen w-screen overflow-hidden bg-slate-950">
            <Canvas shadows dpr={[1, 1.8]} className="h-full w-full">
                <AtlasScene />
                <Html fullscreen>
                    <LoginMenu />
                </Html>
            </Canvas>
        </div>
    );
}
