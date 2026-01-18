import { useAuthStore } from "../react-hooks/auth";

export function FooterBar() {
    const { apiBase } = useAuthStore();
    const docsHref = `${apiBase}/docs`;
    const sourceHref = "https://github.com/LahkLeKey/K3H4";

    const buttonClass =
        "rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-white/30 hover:bg-white/20";

    return (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center pb-6">
            <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 shadow-lg shadow-black/40 backdrop-blur">
                <span className="text-xs uppercase tracking-[0.25em] text-slate-300">Explore</span>
                <a className={buttonClass} href={docsHref} target="_blank" rel="noreferrer">
                    API Docs
                </a>
                <a className={buttonClass} href={sourceHref} target="_blank" rel="noreferrer">
                    Source Code
                </a>
            </div>
        </div>
    );
}
