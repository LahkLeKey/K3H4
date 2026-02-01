import * as z from 'zod';
export const UserAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    email: z.number(),
    provider: z.number(),
    providerId: z.number(),
    k3h4CoinBalance: z.number(),
    displayName: z.number(),
    avatarUrl: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    telemetry: z.number(),
    chatSessions: z.number(),
    ollamaOperations: z.number(),
    actors: z.number()
  }).optional(),
  _sum: z.object({
    k3h4CoinBalance: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    k3h4CoinBalance: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    email: z.string().nullable(),
    provider: z.string().nullable(),
    providerId: z.string().nullable(),
    k3h4CoinBalance: z.number().nullable(),
    displayName: z.string().nullable(),
    avatarUrl: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    email: z.string().nullable(),
    provider: z.string().nullable(),
    providerId: z.string().nullable(),
    k3h4CoinBalance: z.number().nullable(),
    displayName: z.string().nullable(),
    avatarUrl: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});