import { Fragment, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Popover } from "../radix-primitives/Popover";
import { Tooltip } from "../radix-primitives/Tooltip";
import { Button } from "./Button";
import { Info, User } from "lucide-react";

export type TableColumn<T> = {
    key: keyof T;
    label: string;
    render?: (row: T) => ReactNode;
};

export type TableRowActionConfirmation = {
    title?: ReactNode;
    description?: ReactNode;
    confirmLabel?: ReactNode;
    loadingLabel?: ReactNode;
    cancelLabel?: ReactNode;
    accent?: string;
};

export type TableRowActionItem = {
    id: string;
    label: ReactNode;
    disabled?: boolean;
    confirmation?: TableRowActionConfirmation;
};

export type TableProps<T> = {
    columns: TableColumn<T>[];
    rows: T[];
    rowKey: (row: T, idx: number) => string;
    idAccessor?: (row: T) => string;
    idLabel?: string;
    ownerAccessor?: (row: T) => string | undefined | null;
    ownerLabel?: string;
    className?: string;
    noDataMessage?: string;
    title?: string;
    actions?: ReactNode;
    actionBarClassName?: string;
    rowActions?: (row: T) => ReactNode;
    rowExpansion?: (row: T) => ReactNode;
    rowExpansionLabel?: string;
    onRowExpand?: (row: T, expanded: boolean) => void;
    rowFeedback?: Record<string, ReactNode>;
    onRowAction?: (row: T, action: string) => Promise<void> | void;
    rowActionItems?: (row: T) => TableRowActionItem[];
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
    rowActions,
    rowExpansion,
    rowExpansionLabel = "Details",
    onRowExpand,
    rowFeedback,
    onRowAction,
    rowActionItems,
    idAccessor,
    idLabel = "ID",
    ownerAccessor,
    ownerLabel = "Owner",
}: TableProps<T>) {
    const hasActionBar = Boolean(title || actions);
    const hasRowActions = Boolean(rowActions || rowActionItems || rowExpansion);
    const rowKeys = useMemo(() => rows.map((row, idx) => rowKey(row, idx)), [rows, rowKey]);
    const hasIdColumn = typeof idAccessor === "function";
    const hasOwnerColumn = typeof ownerAccessor === "function";
    const showCombinedColumn = hasIdColumn && hasOwnerColumn;
    const extraColumns = showCombinedColumn ? 1 : (hasOwnerColumn ? 1 : 0) + (hasIdColumn ? 1 : 0);
    const columnSpan = columns.length + extraColumns + (hasRowActions ? 1 : 0);
    const [confirmingAction, setConfirmingAction] = useState<{ rowKey: string; actionId: string } | null>(null);
    const [loadingActionKey, setLoadingActionKey] = useState<string | null>(null);
    const pendingActionRef = useRef<string | null>(null);
    const [expandedRows, setExpandedRows] = useState<Set<string>>(() => new Set());

    const toggleExpanded = (key: string, row: T) => {
        setExpandedRows((prev) => {
            const next = new Set(prev);
            if (next.has(key)) {
                next.delete(key);
                onRowExpand?.(row, false);
            } else {
                next.add(key);
                onRowExpand?.(row, true);
            }
            return next;
        });
    };

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
                    </div>
                    {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
                </div>
            ) : null}
            <table className="w-full border-collapse text-sm text-slate-100">
                <thead className="bg-white/5 text-xs uppercase tracking-[0.2em] text-slate-300">
                    <tr>
                        {showCombinedColumn ? (
                            <th className="px-4 py-3 text-left font-semibold">
                                <span className="text-xs uppercase tracking-[0.2em] text-slate-300">{`${idLabel}/${ownerLabel}`}</span>
                            </th>
                        ) : null}
                        {!showCombinedColumn && hasOwnerColumn ? (
                            <th className="px-4 py-3 text-left font-semibold">
                                <span className="text-xs uppercase tracking-[0.2em] text-slate-300">
                                    {ownerLabel}
                                </span>
                            </th>
                        ) : null}
                        {!showCombinedColumn && hasIdColumn ? (
                            <th className="px-4 py-3 text-left font-semibold">
                                <span className="text-xs uppercase tracking-[0.2em] text-slate-300">
                                    {idLabel}
                                </span>
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
                                        {showCombinedColumn ? (
                                            <td className="px-4 py-3">
                                                {(() => {
                                                    const ownerValue = ownerAccessor!(row);
                                                    const ownerDisplay = ownerValue ?? "Unassigned";
                                                    const idValue = idAccessor!(row);
                                                    const idDisplay = idValue ?? "";
                                                    return (
                                                        <div className="inline-flex h-8 items-stretch rounded-full border border-white/10 bg-slate-900 text-slate-200 shadow-inner">
                                                            <Tooltip content={ownerDisplay}>
                                                                <button
                                                                    type="button"
                                                                    title={ownerDisplay}
                                                                    aria-label={`${ownerLabel} ${ownerDisplay}`}
                                                                    className="flex items-center justify-center px-3 text-[11px] font-semibold tracking-wide transition hover:bg-white/5"
                                                                >
                                                                    <User className="h-4 w-4" />
                                                                </button>
                                                            </Tooltip>
                                                            <button
                                                                type="button"
                                                                title={idDisplay}
                                                                aria-label={`${idLabel} ${idDisplay}`}
                                                                className="flex items-center justify-center px-3 text-[11px] font-semibold tracking-wide border-l border-white/10 transition hover:bg-white/5"
                                                            >
                                                                <Info className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    );
                                                })()}
                                            </td>
                                        ) : hasOwnerColumn ? (
                                            <td className="px-4 py-3">
                                                {(() => {
                                                    const ownerValue = ownerAccessor!(row);
                                                    const ownerDisplay = ownerValue ?? "Unassigned";
                                                    return (
                                                        <Tooltip content={ownerDisplay}>
                                                            <button
                                                                type="button"
                                                                title={ownerDisplay}
                                                                aria-label={`${ownerLabel} ${ownerDisplay}`}
                                                                className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-slate-900 text-slate-200 transition hover:border-white/40"
                                                            >
                                                                <User className="h-4 w-4" />
                                                            </button>
                                                        </Tooltip>
                                                    );
                                                })()}
                                            </td>
                                        ) : null}
                                        {!showCombinedColumn && hasIdColumn ? (
                                            <td className="px-4 py-3">
                                                {(() => {
                                                    const idValue = idAccessor!(row);
                                                    return (
                                                        <button
                                                            type="button"
                                                            title={idValue}
                                                            aria-label={`${idLabel} ${idValue}`}
                                                            className="inline-flex h-6 w-8 items-center justify-center rounded-full border border-white/10 bg-slate-900 text-slate-200 transition hover:border-white/40"
                                                        >
                                                            <Info className="h-4 w-4" />
                                                        </button>
                                                    );
                                                })()}
                                            </td>
                                        ) : null}
                                        {columns.map((col) => (
                                            <td key={`${key}-${String(col.key)}`} className="px-4 py-3 text-slate-200">
                                                {col.render ? col.render(row) : (row as any)[col.key]}
                                            </td>
                                        ))}
                                        {hasRowActions ? (
                                            <td className="px-4 py-3 text-right text-slate-200">
                                                {rowExpansion ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleExpanded(key, row)}
                                                        className={`mr-2 inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] transition ${expandedRows.has(key)
                                                                ? "border-emerald-300/40 text-emerald-200"
                                                                : "border-white/20 text-slate-100 hover:border-white/40"
                                                            }`.trim()}
                                                    >
                                                        {expandedRows.has(key) ? "Collapse" : rowExpansionLabel}
                                                    </button>
                                                ) : null}
                                                {rowActionItems?.(row)?.map((action) => {
                                                    const actionKey = `${key}-action-${action.id}`;
                                                    const confirmation = action.confirmation;
                                                    const isConfirming =
                                                        confirmingAction?.rowKey === key && confirmingAction?.actionId === action.id;
                                                    const isLoading = loadingActionKey === actionKey;
                                                    const confirmLabel = confirmation?.confirmLabel ?? action.label;
                                                    const loadingLabel = confirmation?.loadingLabel ?? confirmLabel;
                                                    const cancelLabel = confirmation?.cancelLabel ?? "Cancel";
                                                    const confirmAccent = confirmation?.accent ?? "#ef4444";
                                                    const handleConfirm = () => {
                                                        pendingActionRef.current = actionKey;
                                                        const result = onRowAction?.(row, action.id);
                                                        const isPromise = result && typeof (result as Promise<void>).then === "function";
                                                        if (isPromise) {
                                                            setLoadingActionKey(actionKey);
                                                            (result as Promise<void>)
                                                                .finally(() => {
                                                                    setLoadingActionKey(null);
                                                                    pendingActionRef.current = null;
                                                                    setConfirmingAction(null);
                                                                });
                                                        } else {
                                                            pendingActionRef.current = null;
                                                            setConfirmingAction(null);
                                                        }
                                                    };
                                                    if (confirmation) {
                                                        return (
                                                            <Popover
                                                                key={actionKey}
                                                                open={isConfirming || isLoading}
                                                                modal
                                                                onOpenChange={(open) => {
                                                                    if (!open &&
                                                                        (loadingActionKey === actionKey || pendingActionRef.current === actionKey)
                                                                    ) {
                                                                        return;
                                                                    }
                                                                    setConfirmingAction(open ? { rowKey: key, actionId: action.id } : null);
                                                                }}
                                                                trigger={
                                                                    <button
                                                                        type="button"
                                                                        disabled={action.disabled || isLoading}
                                                                        className="inline-flex items-center gap-1 rounded-full border border-white/20 px-2 py-1 text-[11px] font-semibold text-slate-100 transition hover:border-white/40 disabled:border-white/10 disabled:text-slate-500"
                                                                    >
                                                                        {action.label}
                                                                    </button>
                                                                }
                                                                content={
                                                                    <div className="flex w-64 flex-col gap-3">
                                                                        {confirmation.title ? (
                                                                            <p className="text-[10px] uppercase tracking-[0.4em] text-slate-400">
                                                                                {confirmation.title}
                                                                            </p>
                                                                        ) : null}
                                                                        {confirmation.description ? (
                                                                            <p className="text-sm text-slate-200">
                                                                                {confirmation.description}
                                                                            </p>
                                                                        ) : null}
                                                                        <div className="flex justify-end gap-2">
                                                                            <button
                                                                                type="button"
                                                                                className="rounded-full border border-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-200 transition hover:border-white/40"
                                                                                onClick={() => setConfirmingAction(null)}
                                                                                disabled={isLoading}
                                                                            >
                                                                                {cancelLabel}
                                                                            </button>
                                                                            <Button
                                                                                accent={confirmAccent}
                                                                                variant="solid"
                                                                                disabled={isLoading}
                                                                                onClick={handleConfirm}
                                                                            >
                                                                                {isLoading ? (
                                                                                    <span className="inline-flex items-center gap-2">
                                                                                        <span className="h-2 w-2 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
                                                                                        {loadingLabel}
                                                                                    </span>
                                                                                ) : (
                                                                                    confirmLabel
                                                                                )}
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                }
                                                                contentClassName="w-72"
                                                            />
                                                        );
                                                    }
                                                    return (
                                                        <button
                                                            key={actionKey}
                                                            type="button"
                                                            disabled={action.disabled}
                                                            onClick={() => onRowAction?.(row, action.id)}
                                                            className="inline-flex items-center gap-1 rounded-full border border-white/20 px-2 py-1 text-[11px] font-semibold text-slate-100 transition hover:border-white/40 disabled:border-white/10 disabled:text-slate-500"
                                                        >
                                                            {action.label}
                                                        </button>
                                                    );
                                                })}
                                                {rowActions?.(row)}
                                            </td>
                                        ) : null}
                                    </tr>
                                    {rowExpansion && expandedRows.has(key) ? (
                                        <tr key={`${key}-expanded`} className="border-t border-white/5 bg-slate-900/30">
                                            <td colSpan={columnSpan} className="px-4 py-4">
                                                {rowExpansion(row)}
                                            </td>
                                        </tr>
                                    ) : null}
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
