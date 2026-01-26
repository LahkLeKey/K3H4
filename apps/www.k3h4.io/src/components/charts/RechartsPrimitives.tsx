import type { ReactNode } from "react";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import { Card } from "../ui";
import { R3FErrorBoundary } from "../r3f-components/R3FErrorBoundary";

export const axisStyle = { fill: "#cbd5e1", fontSize: 11 };

export type AreaSeries = {
    key: string;
    color: string;
    gradientId?: string;
    fillOpacity?: number;
    strokeOpacity?: number;
    gradientStops?: { offset: string; stopColor: string; stopOpacity: number }[];
};

export type TimeAreaChartCardProps<T> = {
    title: string;
    hint?: ReactNode;
    data: T[];
    series: AreaSeries[];
    xDataKey?: keyof T;
    yDomain?: [number, number] | [number, number | "auto"] | ["auto", "auto"];
    xTickFormatter?: (value: any) => string;
    className?: string;
};

export function TimeAreaChartCard<T extends Record<string, any>>({
    title,
    hint,
    data,
    series,
    xDataKey = "ts" as keyof T,
    yDomain,
    xTickFormatter = (ts) => new Date(ts).toLocaleTimeString(),
    className,
}: TimeAreaChartCardProps<T>) {
    return (
        <Card title={title} actions={hint ? <span className="text-xs text-slate-400">{hint}</span> : null} className={className}>
            <div className="mt-3 h-56">
                <R3FErrorBoundary>
                    <ResponsiveContainer>
                        <AreaChart data={data} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                            <defs>
                                {series.map((s) => {
                                    const id = s.gradientId ?? `${s.key}-gradient`;
                                    const stops = s.gradientStops ?? [
                                        { offset: "5%", stopColor: s.color, stopOpacity: 0.42 },
                                        { offset: "95%", stopColor: s.color, stopOpacity: 0.04 },
                                    ];
                                    return (
                                        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1" key={id}>
                                            {stops.map((stop) => (
                                                <stop key={`${id}-${stop.offset}`} offset={stop.offset} stopColor={stop.stopColor} stopOpacity={stop.stopOpacity} />
                                            ))}
                                        </linearGradient>
                                    );
                                })}
                            </defs>
                            <CartesianGrid stroke="#0f172a" strokeDasharray="3 3" opacity={0.6} />
                            <XAxis dataKey={xDataKey as string} tickFormatter={xTickFormatter} stroke="#1e293b" tick={axisStyle} />
                            <YAxis stroke="#1e293b" tick={axisStyle} domain={yDomain}
                            />
                            <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12 }} />
                            {series.map((s) => {
                                const gradient = s.gradientId ?? `${s.key}-gradient`;
                                return (
                                    <Area
                                        key={s.key}
                                        type="monotone"
                                        dataKey={s.key}
                                        stroke={s.color}
                                        strokeOpacity={s.strokeOpacity ?? 1}
                                        fillOpacity={s.fillOpacity ?? 1}
                                        fill={`url(#${gradient})`}
                                    />
                                );
                            })}
                        </AreaChart>
                    </ResponsiveContainer>
                </R3FErrorBoundary>
            </div>
        </Card>
    );
}

export type BarChartCardProps<T> = {
    title: string;
    hint?: ReactNode;
    data: T[];
    dataKey: keyof T;
    categoryKey?: keyof T;
    barColor?: string;
    layout?: "vertical" | "horizontal";
    xTickFormatter?: (value: any) => string;
    yTickFormatter?: (value: any) => string;
    categoryWidth?: number;
    showCategoryLabels?: boolean;
    categoryLabelFormatter?: (value: any) => string;
    className?: string;
};

export function BarChartCard<T extends Record<string, any>>({
    title,
    hint,
    data,
    dataKey,
    categoryKey,
    barColor = "#22d3ee",
    layout = "horizontal",
    xTickFormatter,
    yTickFormatter,
    categoryWidth = 160,
    showCategoryLabels = false,
    categoryLabelFormatter,
    className,
}: BarChartCardProps<T>) {
    const horizontal = layout === "horizontal";
    const formatCategory = (value: any) => value?.toString?.() ?? "";
    const formatNumber = (formatter?: (value: any) => string) => (value: any) =>
        formatter ? formatter(value) : formatCategory(value);
    const fallbackCategoryKey = "__category__" as const;
    const resolvedCategoryKey = (categoryKey as string) ?? fallbackCategoryKey;
    const resolvedDataKey = dataKey as string;

    // Normalize values to avoid NaN from malformed payloads that can break Recharts layout.
    const preparedData = data
        .map((d, idx) => {
            const rawValue = (d as any)[resolvedDataKey];
            const numericValue = Number(rawValue);
            if (!Number.isFinite(numericValue)) return null;

            const rawCategory = categoryKey ? (d as any)[categoryKey as string] : idx;
            const formattedCategory = formatCategory(rawCategory);
            const safeCategory = formattedCategory === "" ? String(idx) : formattedCategory;

            return {
                ...d,
                [resolvedDataKey]: numericValue,
                [resolvedCategoryKey]: safeCategory,
                [fallbackCategoryKey]: safeCategory,
            };
        })
        .filter(Boolean) as Array<Record<string, any>>;

    if (!preparedData.length) {
        return (
            <Card title={title} actions={hint ? <span className="text-xs text-slate-400">{hint}</span> : null} className={className}>
                <div className="mt-3 h-56">
                    <R3FErrorBoundary>
                        <div className="flex h-full items-center justify-center text-sm text-slate-400">No data</div>
                    </R3FErrorBoundary>
                </div>
            </Card>
        );
    }

    const maxValue = Math.max(...preparedData.map((d) => Number((d as any)[resolvedDataKey]) || 0));
    const yDomain = horizontal ? [0, Math.max(maxValue, 1)] : undefined;

    const safeData = preparedData.filter((d, idx) => {
        const v = Number((d as any)[resolvedDataKey]);
        const cat = (d as any)[resolvedCategoryKey];
        const catOk = typeof cat === "string" ? cat.length > 0 : typeof cat === "number";
        const valOk = Number.isFinite(v);
        if (!catOk || !valOk) {
            console.warn("BarChartCard dropped invalid row", { idx, v, cat, dataKey: resolvedDataKey, categoryKey: resolvedCategoryKey });
        }
        return catOk && valOk;
    });

    if (!safeData.length) {
        return (
            <Card title={title} actions={hint ? <span className="text-xs text-slate-400">{hint}</span> : null} className={className}>
                <div className="mt-3 h-56">
                    <R3FErrorBoundary>
                        <div className="flex h-full items-center justify-center text-sm text-slate-400">No data</div>
                    </R3FErrorBoundary>
                </div>
            </Card>
        );
    }
    return (
        <Card title={title} actions={hint ? <span className="text-xs text-slate-400">{hint}</span> : null} className={className}>
            <div className="mt-3 h-56">
                <R3FErrorBoundary>
                    <ResponsiveContainer>
                        <BarChart
                            data={safeData}
                            margin={{ left: 0, right: horizontal ? 0 : 10, top: 10, bottom: 0 }}
                            layout={horizontal ? "horizontal" : "vertical"}
                        >
                            <CartesianGrid stroke="#0f172a" strokeDasharray="3 3" opacity={0.6} />
                            <XAxis
                                type={horizontal ? "category" : "number"}
                                dataKey={horizontal ? resolvedCategoryKey : (dataKey as string)}
                                stroke="#1e293b"
                                tick={axisStyle}
                                tickFormatter={horizontal ? formatCategory : formatNumber(xTickFormatter)}
                            />
                            <YAxis
                                type={horizontal ? "number" : "category"}
                                dataKey={!horizontal ? resolvedCategoryKey : (undefined as any)}
                                stroke="#1e293b"
                                tick={axisStyle}
                                tickFormatter={horizontal ? formatNumber(yTickFormatter) : formatCategory}
                                domain={horizontal ? yDomain : undefined}
                                width={!horizontal && categoryKey ? categoryWidth : undefined}
                            />
                            <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12 }} />
                            <Bar dataKey={dataKey as string} fill={barColor} radius={[6, 6, 0, 0]} label={horizontal ? undefined : { position: "right" }}>
                                {showCategoryLabels ? (
                                    <LabelList
                                        dataKey={resolvedCategoryKey}
                                        position={horizontal ? "insideTop" : "insideLeft"}
                                        formatter={categoryLabelFormatter ?? formatCategory}
                                        fill="#e2e8f0"
                                        fontSize={11}
                                    />
                                ) : null}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </R3FErrorBoundary>
            </div>
        </Card>
    );
}
