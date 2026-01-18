export type TableColumn<T> = {
    key: keyof T;
    label: string;
    render?: (row: T) => React.ReactNode;
};

export type Table2DProps<T> = {
    columns: TableColumn<T>[];
    rows: T[];
    rowKey: (row: T, idx: number) => string;
    className?: string;
};

export function Table2D<T>({ columns, rows, rowKey, className = "" }: Table2DProps<T>) {
    return (
        <div className={`overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-xl ${className}`.trim()}>
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
                    {rows.map((row, idx) => (
                        <tr key={rowKey(row, idx)} className="border-t border-white/5">
                            {columns.map((col) => (
                                <td key={`${rowKey(row, idx)}-${String(col.key)}`} className="px-4 py-3 text-slate-200">
                                    {col.render ? col.render(row) : (row as any)[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
