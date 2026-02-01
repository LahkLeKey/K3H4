import {useInfiniteQuery, useQuery} from '@tanstack/react-query';

import {useAuthStore} from './auth';
import {buildApiUrl} from './lib/apiBase';

export type TelemetryFilters = {
  eventTypes?: string[];
  sources?: string[];
  sessionId?: string;
  userId?: string;
  since?: string;
  limit?: number;
  cursorTs?: string;
  cursorId?: string;
};

export type TelemetryEvent = {
  id: string;
  userId?: string | null; sessionId: string; eventType: string; source: string;
  path?: string | null;
  payload?: unknown;
  durationMs?: number | null;
  error?: boolean | null; createdAt: string;
};

export type TelemetryCursor = {
  cursorTs: string; cursorId: string;
};

export type TelemetrySummary = {
  total: number; byEventType: Record<string, number>;
  bySource: Record<string, number>;
  newestTs: string | null;
  oldestTs: string | null;
};

export type TelemetryResponse = {
  events: TelemetryEvent[]; summary: TelemetrySummary;
  nextCursor: TelemetryCursor | null;
};

const buildQueryString = (filters: TelemetryFilters) => {
  const params = new URLSearchParams();
  if (filters.eventTypes?.length)
    params.set('eventType', filters.eventTypes.join(','));
  if (filters.sources?.length) params.set('source', filters.sources.join(','));
  if (filters.sessionId) params.set('sessionId', filters.sessionId);
  if (filters.userId) params.set('userId', filters.userId);
  if (filters.since) params.set('since', filters.since);
  if (filters.limit) params.set('limit', String(filters.limit));
  if (filters.cursorTs) params.set('cursorTs', filters.cursorTs);
  if (filters.cursorId) params.set('cursorId', filters.cursorId);
  return params.toString();
};

export function useTelemetryQuery(filters: TelemetryFilters, enabled = true) {
  const {apiBase, session, kickToLogin} = useAuthStore();
  const qs = buildQueryString(filters);

  return useQuery<TelemetryResponse, Error>({
    queryKey: ['telemetry', qs],
    enabled,
    staleTime: 5_000,
    refetchInterval: 5_000,
    queryFn: async () => {
      const url = buildApiUrl(apiBase, qs ? `/telemetry?${qs}` : '/telemetry');
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          ...(session?.accessToken ?
                  {Authorization: `Bearer ${session.accessToken}`} :
                  {}),
        },
        credentials: 'include',
      });

      if (res.status === 401) {
        kickToLogin('session-expired');
        throw new Error('Unauthorized');
      }

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(text || `Telemetry fetch failed (${res.status})`);
      }

      return (await res.json()) as TelemetryResponse;
    },
  });
}

export function useTelemetryInfiniteQuery(
    filters: TelemetryFilters, enabled = true) {
  const {apiBase, session, kickToLogin} = useAuthStore();
  const {cursorTs: _ignoreCursorTs, cursorId: _ignoreCursorId, ...baseFilters} =
      filters;
  const baseQs = buildQueryString(baseFilters);

  return useInfiniteQuery<TelemetryResponse, Error>(
      {
        queryKey: ['telemetry-infinite', baseQs],
        enabled,
        staleTime: 5_000,
        refetchInterval: 5_000,
        initialPageParam: undefined,
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
        queryFn: async ({pageParam}) => {
          const cursor =
              (pageParam ?? undefined) as TelemetryCursor | undefined;
          const qs = buildQueryString({
            ...baseFilters,
            ...(cursor ?
                    {cursorTs: cursor.cursorTs, cursorId: cursor.cursorId} :
                    {})
          });
          const url =
              buildApiUrl(apiBase, qs ? `/telemetry?${qs}` : '/telemetry');
          const res = await fetch(url, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              ...(session?.accessToken ?
                      {Authorization: `Bearer ${session.accessToken}`} :
                      {}),
            },
            credentials: 'include',
          });

          if (res.status === 401) {
            kickToLogin('session-expired');
            throw new Error('Unauthorized');
          }

          if (!res.ok) {
            const text = await res.text().catch(() => '');
            throw new Error(text || `Telemetry fetch failed (${res.status})`);
          }

          return (await res.json()) as TelemetryResponse;
        },
      },
  );
}