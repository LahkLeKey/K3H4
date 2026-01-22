import type { ReactNode } from "react";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import { Card } from "../ui";

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
    className,
}: BarChartCardProps<T>) {
    const horizontal = layout === "horizontal";
    const formatCategory = (value: any) => value?.toString?.() ?? "";
    const formatNumber = (formatter?: (value: any) => string) => (value: any) =>
        formatter ? formatter(value) : formatCategory(value);
    return (
        <Card title={title} actions={hint ? <span className="text-xs text-slate-400">{hint}</span> : null} className={className}>
            <div className="mt-3 h-56">
                <ResponsiveContainer>
                    <BarChart
                        data={data}
                        margin={{ left: 0, right: horizontal ? 0 : 10, top: 10, bottom: 0 }}
                        layout={horizontal ? "horizontal" : "vertical"}
                    >
                        <CartesianGrid stroke="#0f172a" strokeDasharray="3 3" opacity={0.6} />
                        <XAxis
                            type={horizontal ? "category" : "number"}
                            dataKey={horizontal ? (categoryKey as string) : (dataKey as string)}
                            stroke="#1e293b"
                            tick={axisStyle}
                            tickFormatter={horizontal ? formatCategory : formatNumber(xTickFormatter)}
                        />
                        <YAxis
                            type={horizontal ? "number" : "category"}
                            dataKey={!horizontal ? (categoryKey as string) : (undefined as any)}
                            stroke="#1e293b"
                            tick={axisStyle}
                            tickFormatter={horizontal ? formatNumber(yTickFormatter) : formatCategory}
                            width={!horizontal && categoryKey ? categoryWidth : undefined}
                        />
                        <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12 }} />
                        <Bar dataKey={dataKey as string} fill={barColor} radius={[6, 6, 0, 0]} label={horizontal ? undefined : { position: "right" }} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}
