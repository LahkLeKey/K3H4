import type { Provider } from "../../react-hooks/auth";

export type SignInProviderCardProps = {
    provider: Provider;
    title: string;
    subtitle: string;
    loading: boolean;
    onStart: (provider: Provider) => void;
    accentPosition?: "left" | "right";
};

export function SignInProviderCard({ provider, title, subtitle, loading, onStart, accentPosition = "left" }: SignInProviderCardProps) {
    const accentStyle =
        accentPosition === "left"
            ? "radial-gradient(circle at 20% 20%, rgba(125,211,252,0.6), transparent 40%)"
            : "radial-gradient(circle at 80% 30%, rgba(165,180,252,0.6), transparent 40%)";

    return (
        <button
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-left transition hover:border-white/30 hover:bg-white/10"
            onClick={() => onStart(provider)}
            disabled={loading}
        >
            <div className="absolute inset-0 opacity-0 blur-3xl transition group-hover:opacity-25" style={{ background: accentStyle }} />
            <div className="flex items-center justify-between gap-3">
                <div>
                    <div className="text-sm font-semibold text-white">{title}</div>
                    <div className="text-xs text-slate-300">{subtitle}</div>
                </div>
                <span className="text-lg text-slate-200 transition group-hover:translate-x-1">{loading ? "…" : "→"}</span>
            </div>
        </button>
    );
}
