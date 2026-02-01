import { Card, Stack } from "../ui";

export type JsonPanelProps = {
    title: string;
    subtitle?: string;
    payload?: unknown;
    emptyMessage?: string;
};

const formatJson = (value: unknown) => {
    if (value === undefined || value === null) return "-";
    try {
        return JSON.stringify(value, null, 2);
    } catch {
        return "[unserializable]";
    }
};

export function JsonPanel({ title, subtitle, payload, emptyMessage }: JsonPanelProps) {
    const hasPayload = payload !== undefined && payload !== null;
    return (
        <Card title={title} subtitle={subtitle}>
            {hasPayload ? (
                <pre className="max-h-64 overflow-auto rounded-xl border border-white/10 bg-slate-900/70 p-3 text-[11px] text-emerald-100">
                    {formatJson(payload)}
                </pre>
            ) : (
                <Stack gap="sm">
                    <div className="text-xs text-slate-300">{emptyMessage ?? "No payload selected."}</div>
                </Stack>
            )}
        </Card>
    );
}
