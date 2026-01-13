import * as z from 'zod';
export const ProviderGrantAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    provider: z.number(),
    providerId: z.number(),
    accessToken: z.number(),
    scope: z.number(),
    expiresAt: z.number(),
    createdAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    provider: z.string().nullable(),
    providerId: z.string().nullable(),
    accessToken: z.string().nullable(),
    scope: z.string().nullable(),
    expiresAt: z.date().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    provider: z.string().nullable(),
    providerId: z.string().nullable(),
    accessToken: z.string().nullable(),
    scope: z.string().nullable(),
    expiresAt: z.date().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional()});