import type { ReactNode } from "react";

import { Card, Pill } from "../radix-primitives";

export type Endpoint = {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | string;
    path: string;
    description: string;
    tag?: string;
};

export type EndpointListProps = {
    title?: string;
    eyebrow?: string;
    endpoints: Endpoint[];
    tag?: string;
    className?: string;
    actionSlot?: ReactNode;
};

export function EndpointList({ title, eyebrow, endpoints, tag, className = "", actionSlot }: EndpointListProps) {
    return (
        <Card title={title} eyebrow={eyebrow} actions={actionSlot} className={className}>
            <div className="grid gap-4 lg:grid-cols-3">
                {endpoints.map((endpoint) => {
                    const tone = endpoint.method === "GET" ? "emerald" : endpoint.method === "POST" ? "sky" : "slate";
                    return (
                        <div
                            key={`${endpoint.method}:${endpoint.path}`}
                            className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-lg transition hover:border-white/20 hover:bg-white/10"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                                    <Pill tone={tone}>{endpoint.method}</Pill>
                                    <span className="font-mono text-xs text-emerald-50/90">{endpoint.path}</span>
                                </div>
                                <span className="text-[11px] uppercase tracking-[0.2em] text-white/60">{endpoint.tag ?? tag ?? "API"}</span>
                            </div>
                            <p className="mt-2 text-sm text-slate-200">{endpoint.description}</p>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}
