import type { ReactNode } from "react";

export type TableColumn<T> = {
    key: keyof T;
    label: string;
    render?: (row: T) => ReactNode;
};

export type TableProps<T> = {
    columns: TableColumn<T>[];
    rows: T[];
    rowKey: (row: T, idx: number) => string;
    className?: string;
    noDataMessage?: string;
    title?: string;
    actions?: ReactNode;
    actionBarClassName?: string;
};

export function Table<T>({
    columns,
    rows,
    rowKey,
    className = "",
    noDataMessage = "No data to display.",
    title,
    actions,
    actionBarClassName = "",
}: TableProps<T>) {
    const hasActionBar = Boolean(title || actions);

    return (
        <div className={`overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-xl ${className}`.trim()}>
            {hasActionBar ? (
                <div
                    className={`flex flex-wrap items-center justify-between gap-4 border-b border-white/5 px-4 py-3 text-slate-100 ${actionBarClassName}`.trim()}
                >
                    {title ? (
                        <div>
                            <div className="text-sm uppercase tracking-[0.3em] text-slate-400">{title}</div>
                        </div>
                    ) : null}
                    {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
                </div>
            ) : null}
            <table className="w-full border-collapse text-sm text-slate-100">
                <thead className="bg-white/5 text-xs uppercase tracking-[0.2em] text-slate-300">
                    <tr>
                        {columns.map((col) => (
                            <th key={String(col.key)} className="px-4 py-3 text-left font-semibold">
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.length === 0 ? (
                        <tr className="border-t border-white/5">
                            <td colSpan={columns.length} className="px-4 py-8 text-center text-xs uppercase tracking-[0.2em] text-slate-400">
                                {noDataMessage}
                            </td>
                        </tr>
                    ) : (
                        rows.map((row, idx) => (
                            <tr key={rowKey(row, idx)} className="border-t border-white/5">
                                {columns.map((col) => (
                                    <td key={`${rowKey(row, idx)}-${String(col.key)}`} className="px-4 py-3 text-slate-200">
                                        {col.render ? col.render(row) : (row as any)[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
