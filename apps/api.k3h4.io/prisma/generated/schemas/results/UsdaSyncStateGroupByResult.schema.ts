import * as z from 'zod';
export const UsdaSyncStateGroupByResultSchema = z.array(z.object({
  id: z.string(),
  dataset: z.string(),
  scope: z.string(),
  lastReleaseOn: z.date(),
  lastSyncedAt: z.date(),
  note: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    dataset: z.number(),
    scope: z.number(),
    lastReleaseOn: z.number(),
    lastSyncedAt: z.number(),
    note: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    dataset: z.string().nullable(),
    scope: z.string().nullable(),
    lastReleaseOn: z.date().nullable(),
    lastSyncedAt: z.date().nullable(),
    note: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    dataset: z.string().nullable(),
    scope: z.string().nullable(),
    lastReleaseOn: z.date().nullable(),
    lastSyncedAt: z.date().nullable(),
    note: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));