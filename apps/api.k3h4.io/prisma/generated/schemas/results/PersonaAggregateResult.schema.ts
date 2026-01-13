import * as z from 'zod';
export const PersonaAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    alias: z.number(),
    account: z.number(),
    handle: z.number(),
    note: z.number(),
    tags: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    assignments: z.number(),
    assignmentPayouts: z.number(),
    attributes: z.number(),
    compatibilitySources: z.number(),
    compatibilityTargets: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    alias: z.string().nullable(),
    account: z.string().nullable(),
    handle: z.string().nullable(),
    note: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    alias: z.string().nullable(),
    account: z.string().nullable(),
    handle: z.string().nullable(),
    note: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});