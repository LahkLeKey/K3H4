import {useQuery} from '@tanstack/react-query';
import {z} from 'zod';

import {useAuthStore} from '../zustand-stores/auth';

import {apiFetch} from './lib/api-client';

const AgricultureSlotPlotSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  crop: z.string().nullable(),
  stage: z.string().nullable(),
});

const AgricultureSlotSchema = z.object({
  id: z.string(),
  slotIndex: z.number(),
  plotId: z.string().nullable(),
  plot: AgricultureSlotPlotSchema.nullable(),
});

const AgricultureSlotsResponseSchema =
    z.object({slots: z.array(AgricultureSlotSchema)});

export type AgricultureSlot = z.infer<typeof AgricultureSlotSchema>;

export function useAgricultureSlots() {
  const {session, apiBase} = useAuthStore();

  return useQuery<AgricultureSlot[]>({
    queryKey: ['agriculture', 'slots'],
    enabled: Boolean(session?.accessToken),
    queryFn: async () => {
      const {slots} = await apiFetch<{slots: AgricultureSlot[]}>(
          '/agriculture/slots',
          {
            token: session?.accessToken ?? null,
            baseUrl: apiBase,
            schema: AgricultureSlotsResponseSchema,
          },
      );
      return slots;
    },
    staleTime: 30_000,
  });
}
