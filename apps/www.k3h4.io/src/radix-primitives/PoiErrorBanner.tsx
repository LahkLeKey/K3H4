type Props = {
    status: "idle" | "loading" | "ready" | "error";
    error: string | null;
};

export function PoiErrorBanner({ status, error }: Props) {
    if (status !== "error") return null;
    return (
        <div className="pointer-events-none absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full bg-slate-900/85 px-4 py-2 text-xs font-semibold text-white shadow-lg">
            poi fetch failed
            {error ? <span className="ml-2 text-[11px] font-normal text-amber-200/80">{error}</span> : null}
        </div>
    );
}