export type Pagination2DProps = {
    page: number;
    pageCount: number;
    onPageChange: (page: number) => void;
    className?: string;
};

export function Pagination2D({ page, pageCount, onPageChange, className = "" }: Pagination2DProps) {
    const prev = () => onPageChange(Math.max(1, page - 1));
    const next = () => onPageChange(Math.min(pageCount, page + 1));
    return (
        <div className={`flex items-center gap-2 text-sm text-slate-100 ${className}`.trim()}>
            <button
                type="button"
                onClick={prev}
                disabled={page <= 1}
                className="rounded-full border border-white/12 bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 disabled:opacity-50"
            >
                Prev
            </button>
            <span className="text-xs uppercase tracking-[0.2em] text-slate-400">{page} / {pageCount}</span>
            <button
                type="button"
                onClick={next}
                disabled={page >= pageCount}
                className="rounded-full border border-white/12 bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}
