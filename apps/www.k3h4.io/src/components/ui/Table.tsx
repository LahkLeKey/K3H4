import { Fragment, useEffect, useMemo, useRef, useState } from "react";
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
    bulkActions?: ReactNode;
    selectable?: boolean;
    selectedRowKeys?: string[];
    defaultSelectedRowKeys?: string[];
    onSelectionChange?: (keys: string[]) => void;
    rowActions?: (row: T) => ReactNode;
    rowFeedback?: Record<string, ReactNode>;
    onRowAction?: (row: T, action: string) => void;
    bulkActionItems?: Array<{ id: string; label: ReactNode; disabled?: boolean }>;
    onBulkAction?: (actionId: string) => void;
    rowActionItems?: (row: T) => Array<{ id: string; label: ReactNode; disabled?: boolean }>;
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
    bulkActions,
    selectable = false,
    selectedRowKeys,
    defaultSelectedRowKeys = [],
    onSelectionChange,
    rowActions,
    rowFeedback,
    onRowAction,
    bulkActionItems,
    onBulkAction,
    rowActionItems,
}: TableProps<T>) {
    const hasActionBar = Boolean(title || actions || bulkActions || bulkActionItems);
    const hasRowActions = Boolean(rowActions || rowActionItems);
    const isControlledSelection = selectedRowKeys !== undefined;
    const [internalSelection, setInternalSelection] = useState<string[]>(defaultSelectedRowKeys);
    const finalSelection = isControlledSelection ? selectedRowKeys! : internalSelection;
    const updateSelection = (next: string[]) => {
        if (!isControlledSelection) {
            setInternalSelection(next);
        }
        onSelectionChange?.(next);
    };
    const rowKeys = useMemo(() => rows.map((row, idx) => rowKey(row, idx)), [rows, rowKey]);
    const allSelected = selectable && rowKeys.length > 0 && rowKeys.every((key) => finalSelection.includes(key));
    const someSelected = selectable && rowKeys.some((key) => finalSelection.includes(key));
    const selectAllRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (!selectable || !selectAllRef.current) return;
        selectAllRef.current.indeterminate = !allSelected && someSelected;
    }, [selectable, allSelected, someSelected]);
    const toggleRow = (key: string) => {
        const next = finalSelection.includes(key)
            ? finalSelection.filter((value) => value !== key)
            : [...finalSelection, key];
        updateSelection(next);
    };
    const toggleAll = () => {
        updateSelection(allSelected ? [] : rowKeys);
    };
    const columnSpan = columns.length + (selectable ? 1 : 0) + (hasRowActions ? 1 : 0);

    return (
        <div className={`overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-xl ${className}`.trim()}>
            {hasActionBar ? (
                <div
                    className={`flex flex-wrap items-center justify-between gap-4 border-b border-white/5 px-4 py-3 text-slate-100 ${actionBarClassName}`.trim()}
                >
                    <div className="flex flex-wrap items-center gap-4">
                        {title ? (
                            <div>
                                <div className="text-sm uppercase tracking-[0.3em] text-slate-400">{title}</div>
                            </div>
                        ) : null}
                        {bulkActionItems ? (
                            <div className="flex flex-wrap items-center gap-2">
                                {bulkActionItems.map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => onBulkAction?.(item.id)}
                                        disabled={item.disabled}
                                        className="inline-flex items-center gap-1 rounded-full border border-white/20 px-3 py-1 text-[11px] font-semibold text-slate-100 transition hover:border-white/40 disabled:border-white/10 disabled:text-slate-500"
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        ) : null}
                        {bulkActions ? <div className="flex flex-wrap items-center gap-2">{bulkActions}</div> : null}
                    </div>
                    {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
                </div>
            ) : null}
            <table className="w-full border-collapse text-sm text-slate-100">
                <thead className="bg-white/5 text-xs uppercase tracking-[0.2em] text-slate-300">
                    <tr>
                        {selectable ? (
                            <th className="px-4 py-3 text-left font-semibold">
                                <input
                                    ref={selectAllRef}
                                    type="checkbox"
                                    checked={allSelected}
                                    onChange={toggleAll}
                                    className="h-4 w-4 accent-slate-200"
                                />
                            </th>
                        ) : null}
                        {columns.map((col) => (
                            <th key={String(col.key)} className="px-4 py-3 text-left font-semibold">
                                {col.label}
                            </th>
                        ))}
                        {hasRowActions ? <th className="px-4 py-3 text-right font-semibold">Actions</th> : null}
                    </tr>
                </thead>
                <tbody>
                    {rows.length === 0 ? (
                        <tr className="border-t border-white/5">
                            <td
                                colSpan={columnSpan}
                                className="px-4 py-8 text-center text-xs uppercase tracking-[0.2em] text-slate-400"
                            >
                                {noDataMessage}
                            </td>
                        </tr>
                    ) : (
                        rows.map((row, idx) => {
                            const key = rowKeys[idx];
                            const feedback = rowFeedback?.[key];
                            return (
                                <Fragment key={key}>
                                    <tr key={`${key}-row`} className="border-t border-white/5">
                                        {selectable ? (
                                            <td className="px-4 py-3">
                                                <input
                                                    type="checkbox"
                                                    checked={finalSelection.includes(key)}
                                                    onChange={() => toggleRow(key)}
                                                    className="h-4 w-4 accent-slate-200"
                                                />
                                            </td>
                                        ) : null}
                                        {columns.map((col) => (
                                            <td key={`${key}-${String(col.key)}`} className="px-4 py-3 text-slate-200">
                                                {col.render ? col.render(row) : (row as any)[col.key]}
                                            </td>
                                        ))}
                                        {hasRowActions ? (
                                            <td className="px-4 py-3 text-right text-slate-200">
                                                {rowActionItems?.(row)?.map((action) => (
                                                    <button
                                                        key={`${key}-action-${action.id}`}
                                                        type="button"
                                                        disabled={action.disabled}
                                                        onClick={() => onRowAction?.(row, action.id)}
                                                        className="inline-flex items-center gap-1 rounded-full border border-white/20 px-2 py-1 text-[11px] font-semibold text-slate-100 transition hover:border-white/40 disabled:border-white/10 disabled:text-slate-500"
                                                    >
                                                        {action.label}
                                                    </button>
                                                ))}
                                                {rowActions?.(row)}
                                            </td>
                                        ) : null}
                                    </tr>
                                    {feedback ? (
                                        <tr key={`${key}-feedback`} className="border-t border-white/5 bg-slate-900/40">
                                            <td
                                                colSpan={columnSpan}
                                                className="px-4 py-2 text-xs text-slate-300"
                                            >
                                                {feedback}
                                            </td>
                                        </tr>
                                    ) : null}
                                </Fragment>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}
