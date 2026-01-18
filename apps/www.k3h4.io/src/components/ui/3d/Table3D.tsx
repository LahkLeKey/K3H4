import { Html3D } from "./Html3D";

export type Table3DColumn<T> = {
    key: keyof T;
    label: string;
    render?: (row: T) => React.ReactNode;
};

export type Table3DProps<T> = {
    position?: [number, number, number];
    width?: number;
    columns: Table3DColumn<T>[];
    rows: T[];
    rowKey: (row: T, idx: number) => string;
    className?: string;
};

export function Table3D<T>({ position = [0, 1.2, 0], width = 360, columns, rows, rowKey, className = "" }: Table3DProps<T>) {
    return (
        <Html3D position={position} distanceFactor={7}>
            <div className={`overflow-hidden rounded-2xl border border-white/10 bg-slate-950/85 shadow-2xl backdrop-blur ${className}`.trim()} style={{ width }}>
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
        </Html3D>
    );
}
