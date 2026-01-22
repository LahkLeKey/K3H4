import { useMemo } from "react";

import { useAuthStore, type Provider } from "../../react-hooks/auth";
import { ExploreBar } from "../../components/ui";
import { SignInProviderCard } from "./SignInProviderCard.tsx";

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
                            Log in with GitHub or LinkedIn. You control your footprint—delete your own data from my production database any time from your profile.
                        </p>
                        <p className="mt-1 text-xs text-slate-500">API base: {apiBase}</p>
                    </div>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-2">
                    <SignInProviderCard
                        provider="github"
                        title="Login with GitHub"
                        subtitle="GitHub OAuth redirect"
                        loading={providerLoading === "github"}
                        onStart={handleStart}
                        accentPosition="left"
                    />
                    <SignInProviderCard
                        provider="linkedin"
                        title="Login with LinkedIn"
                        subtitle="LinkedIn OAuth redirect"
                        loading={providerLoading === "linkedin"}
                        onStart={handleStart}
                        accentPosition="right"
                    />
                </div>

                <div className="mt-6">
                    <ExploreBar floating={false} className="pointer-events-auto justify-start" />
                </div>

                {error ? <div className="mt-3 rounded-2xl border border-rose-400/30 bg-rose-900/40 px-4 py-2 text-sm text-rose-100">{error}</div> : null}

            </div>
        </div>
    );
}
