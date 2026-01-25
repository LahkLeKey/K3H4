import * as z from 'zod';
export const PersonaCompatibilityAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    sourceId: z.number(),
    source: z.number(),
    targetId: z.number(),
    target: z.number(),
    jaccardScore: z.number(),
    intersectionCount: z.number(),
    unionCount: z.number(),
    overlappingTokens: z.number(),
    computedAt: z.number(),
    rationale: z.number(),
    status: z.number()
  }).optional(),
  _sum: z.object({
    jaccardScore: z.number().nullable(),
    intersectionCount: z.number().nullable(),
    unionCount: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    jaccardScore: z.number().nullable(),
    intersectionCount: z.number().nullable(),
    unionCount: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    sourceId: z.string().nullable(),
    targetId: z.string().nullable(),
    jaccardScore: z.number().nullable(),
    intersectionCount: z.number().int().nullable(),
    unionCount: z.number().int().nullable(),
    computedAt: z.date().nullable(),
    rationale: z.string().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    sourceId: z.string().nullable(),
    targetId: z.string().nullable(),
    jaccardScore: z.number().nullable(),
    intersectionCount: z.number().int().nullable(),
    unionCount: z.number().int().nullable(),
    computedAt: z.date().nullable(),
    rationale: z.string().nullable()
  }).nullable().optional()});