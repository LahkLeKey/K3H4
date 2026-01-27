import {useQuery} from '@tanstack/react-query';
import {z} from 'zod';

import {useAuthStore} from '../zustand-stores/auth';

import {apiFetch} from './lib/api-client';

const FreightDirectionStopSchema = z.object({
  id: z.string(),
  sequence: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  label: z.string().nullable(),
  address: z.string().nullable(),
  source: z.string(),
  metadata: z.any().nullable(),
});

const FreightDirectionSegmentSchema = z.object({
  id: z.string(),
  sequence: z.number(),
  instruction: z.string(),
  maneuverType: z.string().nullable(),
  maneuverModifier: z.string().nullable(),
  distanceMeters: z.number(),
  durationSeconds: z.number().nullable(),
  startLat: z.number(),
  startLng: z.number(),
  endLat: z.number(),
  endLng: z.number(),
  geometry: z.any().nullable(),
  metadata: z.any().nullable(),
});

const FreightDirectionSchema = z.object({
  signature: z.string(),
  provider: z.string(),
  profile: z.string(),
  geometry: z.any().nullable(),
  originLat: z.number().nullable(),
  originLng: z.number().nullable(),
  destinationLat: z.number().nullable(),
  destinationLng: z.number().nullable(),
  distanceMeters: z.number().nullable(),
  durationSeconds: z.number().nullable(),
  stops: z.array(FreightDirectionStopSchema),
  segments: z.array(FreightDirectionSegmentSchema),
});

const FreightDirectionResponseSchema = z.object({
  direction: FreightDirectionSchema,
});

export type FreightDirectionStop = z.infer<typeof FreightDirectionStopSchema>;
export type FreightDirectionSegment =
    z.infer<typeof FreightDirectionSegmentSchema>;
export type FreightDirection = z.infer<typeof FreightDirectionSchema>;

export function useFreightDirections(loadId: string|null, enabled = true) {
  const {session, apiBase} = useAuthStore();

  return useQuery<FreightDirection, Error>({
    queryKey: ['freight-directions', loadId ?? ''],
    enabled: Boolean(enabled && loadId && session?.accessToken),
    staleTime: 30_000,
    queryFn: async () => {
      const {direction} = await apiFetch<{direction: FreightDirection}>(
          `/freight/${loadId}/directions`,
          {
            token: session?.accessToken ?? null,
            baseUrl: apiBase,
            schema: FreightDirectionResponseSchema,
          },
      );
      return direction;
    },
  });
}