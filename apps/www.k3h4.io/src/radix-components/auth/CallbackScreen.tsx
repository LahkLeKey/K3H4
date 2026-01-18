import { useEffect, useMemo, useState } from "react";

import { useAuthStore, type Provider } from "../../react-hooks/auth";
import { ExploreBar } from "../../radix-primitives/ExploreBar.tsx";

export function CallbackScreen() {
    const { apiBase, finalizeCallback } = useAuthStore();
    const [status, setStatus] = useState<"pending" | "success" | "error">("pending");
    const [message, setMessage] = useState<string>("Finishing sign-in...");
    const [elapsed, setElapsed] = useState<number>(0);
    const provider = useMemo(() => {
        if (typeof window === "undefined") return null;
        if (window.location.pathname.includes("github")) return "github" as Provider;
        if (window.location.pathname.includes("linkedin")) return "linkedin" as Provider;
        return null;
    }, []);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setElapsed((prev) => prev + 1);
        }, 1000);
        return () => window.clearInterval(timer);
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");
        const redirectUri = url.origin + url.pathname;

        if (!provider || !code) {
            setStatus("error");
            setMessage("Missing provider or code in callback.");
            return;
        }

        const run = async () => {
            await finalizeCallback(provider, code, redirectUri);
            const hasError = useAuthStore.getState().error;
            if (hasError) {
                setStatus("error");
                setMessage("Unable to finish sign-in. Please retry.");
            } else {
                setStatus("success");
                setMessage("Signed in. Redirecting to command...");
                setTimeout(() => window.location.replace("/"), 800);
            }
        };

        void run();
    }, [provider, finalizeCallback]);

    const countdown = Math.max(0, 15 - elapsed);
    const showRetry = countdown === 0 || status === "error";
    const displayMessage =
        status === "pending"
            ? "Please wait while we finish sign-in. OAuth may take a bit."
            : status === "success"
                ? "Signed in. Redirecting to command..."
                : "Unable to finish sign-in. Please retry.";

    const handleRetry = () => {
        window.location.replace("/");
    };

    return (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-b from-slate-950/80 via-slate-950/86 to-slate-950/95 text-slate-50">
            <div className="pointer-events-auto w-full max-w-xl rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-900/60 backdrop-blur">
                <div className="text-xs uppercase tracking-[0.3em] text-slate-400">Kyle Halek</div>
                <div className="text-2xl font-bold text-white">Completing sign-in</div>
                <p className="mt-2 text-sm text-slate-300">{displayMessage}</p>
                <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100">
                    {status === "pending" ? <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-200 border-t-transparent" /> : null}
                    <span>{message}</span>
                </div>
                {status === "pending" ? <div className="mt-3 text-xs text-slate-400">Working with {apiBase}</div> : null}
                <div className="mt-3 text-xs text-slate-400">Retry in {countdown}s</div>
                {showRetry ? (
                    <button
                        className="mt-4 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-white/30 hover:bg-white/20"
                        onClick={handleRetry}
                    >
                        Retry sign-in
                    </button>
                ) : null}

                <div className="mt-6">
                    <ExploreBar floating={false} className="pointer-events-auto justify-start flex-wrap gap-2" />
                </div>
            </div>
        </div>
    );
}
