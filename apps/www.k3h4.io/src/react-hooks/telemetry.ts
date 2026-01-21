import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "./auth";

export type TelemetryFilters = {
    eventTypes?: string[];
    sources?: string[];
    sessionId?: string;
    userId?: string;
    since?: string;
    limit?: number;
};

export type TelemetryEvent = {
    id: string;
    userId?: string | null;
    sessionId: string;
    eventType: string;
    source: string;
    path?: string | null;
    payload?: unknown;
    createdAt: string;
};

export type TelemetrySummary = {
    total: number;
    byEventType: Record<string, number>;
    bySource: Record<string, number>;
    newestTs: string | null;
    oldestTs: string | null;
};

export type TelemetryResponse = {
    events: TelemetryEvent[];
    summary: TelemetrySummary;
};

const buildQueryString = (filters: TelemetryFilters) => {
    const params = new URLSearchParams();
    if (filters.eventTypes?.length) params.set("eventType", filters.eventTypes.join(","));
    if (filters.sources?.length) params.set("source", filters.sources.join(","));
    if (filters.sessionId) params.set("sessionId", filters.sessionId);
    if (filters.userId) params.set("userId", filters.userId);
    if (filters.since) params.set("since", filters.since);
    if (filters.limit) params.set("limit", String(filters.limit));
    return params.toString();
};

export function useTelemetryQuery(filters: TelemetryFilters, enabled = true) {
    const { apiBase, session, kickToLogin } = useAuthStore();
    const qs = buildQueryString(filters);

    return useQuery<TelemetryResponse, Error>({
        queryKey: ["telemetry", qs],
        enabled,
        staleTime: 5_000,
        refetchInterval: 5_000,
        queryFn: async () => {
            const url = qs ? `${apiBase}/telemetry?${qs}` : `${apiBase}/telemetry`;
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    ...(session?.accessToken ? { Authorization: `Bearer ${session.accessToken}` } : {}),
                },
                credentials: "include",
            });

            if (res.status === 401) {
                kickToLogin("session-expired");
                throw new Error("Unauthorized");
            }

            if (!res.ok) {
                const text = await res.text().catch(() => "");
                throw new Error(text || `Telemetry fetch failed (${res.status})`);
            }

            return (await res.json()) as TelemetryResponse;
        },
    });
}