import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

import {type ActorCreateInput, ActorCreateSchema, type ActorResponse, ActorResponseSchema, type ActorsResponse, ActorsResponseSchema, type ActorUpdateInput, ActorUpdateSchema, type EntitiesResponse, EntitiesResponseSchema, type EntityCreateInput, EntityCreateSchema, type EntityResponse, EntityResponseSchema, type EntityUpdateInput, EntityUpdateSchema,} from '../schemas/actor-entity';

import {useAuthStore} from './auth';
import {apiFetch} from './lib/api-client';

export type ActorFilters = {
  type?: string;
  category?: string;
  limit?: number;
};

export type EntityFilters = {
  actorId: string;
  kind?: string;
  direction?: string;
  targetType?: string;
  targetId?: string;
  limit?: number;
};

const buildQueryString =
    (filters: Record<string, string|number|undefined|null>) => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        if (typeof value === 'string' && value.trim().length === 0) return;
        params.set(key, String(value));
      });
      return params.toString();
    };


export function useActorsQuery(filters: ActorFilters, enabled = true) {
  const {apiBase, session, kickToLogin} = useAuthStore();
  const qs = buildQueryString(filters);

  return useQuery<ActorsResponse, Error>({
    queryKey: ['actors', qs],
    enabled,
    staleTime: 5_000,
    refetchInterval: 10_000,
    queryFn: async () => {
      try {
        return await apiFetch<ActorsResponse>(`/actors${qs ? `?${qs}` : ''}`, {
          token: session?.accessToken ?? null,
          baseUrl: apiBase,
          schema: ActorsResponseSchema,
        });
      } catch (err) {
        if ((err as Error)?.message?.includes('Unauthorized')) {
          kickToLogin('session-expired');
        }
        throw err;
      }
    },
  });
}

export function useEntitiesQuery(filters: EntityFilters|null, enabled = true) {
  const {apiBase, session, kickToLogin} = useAuthStore();
  const qs = buildQueryString(filters ?? {});
  const actorId = filters?.actorId ?? '';

  return useQuery<EntitiesResponse, Error>({
    queryKey: ['entities', actorId, qs],
    enabled: enabled && Boolean(actorId),
    staleTime: 5_000,
    refetchInterval: 10_000,
    queryFn: async () => {
      const path = `/actors/${actorId}/entities${qs ? `?${qs}` : ''}`;
      try {
        return await apiFetch<EntitiesResponse>(path, {
          token: session?.accessToken ?? null,
          baseUrl: apiBase,
          schema: EntitiesResponseSchema,
        });
      } catch (err) {
        if ((err as Error)?.message?.includes('Unauthorized')) {
          kickToLogin('session-expired');
        }
        throw err;
      }
    },
  });
}

export type ActorCreatePayload = ActorCreateInput;
export type ActorUpdatePayload = ActorUpdateInput&{id: string};
export type EntityCreatePayload = EntityCreateInput;
export type EntityUpdatePayload = EntityUpdateInput&{
  id: string;
  actorId?: string|null;
};

export function useCreateActorMutation() {
  const {apiBase, session} = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ActorCreatePayload) => {
      const parsed = ActorCreateSchema.parse(payload);
      return apiFetch<ActorResponse>('/actors', {
        method: 'POST',
        token: session?.accessToken ?? null,
        baseUrl: apiBase,
        body: parsed,
        schema: ActorResponseSchema,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['actors']});
    },
  });
}

export function useUpdateActorMutation() {
  const {apiBase, session} = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ActorUpdatePayload) => {
      const {id, ...rest} = payload;
      const parsed = ActorUpdateSchema.parse(rest);
      return apiFetch<ActorResponse>(`/actors/${id}`, {
        method: 'PATCH',
        token: session?.accessToken ?? null,
        baseUrl: apiBase,
        body: parsed,
        schema: ActorResponseSchema,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['actors']});
    },
  });
}

export function useCreateEntityMutation() {
  const {apiBase, session} = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: EntityCreatePayload) => {
      const parsed = EntityCreateSchema.parse(payload);
      const {actorId, ...rest} = parsed;
      return apiFetch<EntityResponse>(`/actors/${actorId}/entities`, {
        method: 'POST',
        token: session?.accessToken ?? null,
        baseUrl: apiBase,
        body: rest,
        schema: EntityResponseSchema,
      });
    },
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries(
          {queryKey: ['entities', variables.actorId]});
    },
  });
}

export function useUpdateEntityMutation() {
  const {apiBase, session} = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: EntityUpdatePayload) => {
      const {id, ...rest} = payload;
      const parsed = EntityUpdateSchema.parse(rest);
      return apiFetch<EntityResponse>(`/entities/${id}`, {
        method: 'PATCH',
        token: session?.accessToken ?? null,
        baseUrl: apiBase,
        body: parsed,
        schema: EntityResponseSchema,
      });
    },
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({queryKey: ['entities']});
      if (variables.actorId) {
        await queryClient.invalidateQueries(
            {queryKey: ['entities', variables.actorId]});
      }
    },
  });
}
