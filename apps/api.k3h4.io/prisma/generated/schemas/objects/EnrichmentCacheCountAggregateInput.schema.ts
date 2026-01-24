import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  provider: z.literal(true).optional(),
  namespace: z.literal(true).optional(),
  kind: z.literal(true).optional(),
  sourceKey: z.literal(true).optional(),
  paramsHash: z.literal(true).optional(),
  wikidataId: z.literal(true).optional(),
  payload: z.literal(true).optional(),
  status: z.literal(true).optional(),
  fetchedAt: z.literal(true).optional(),
  expiresAt: z.literal(true).optional(),
  note: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const EnrichmentCacheCountAggregateInputObjectSchema: z.ZodType<Prisma.EnrichmentCacheCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.EnrichmentCacheCountAggregateInputType>;
export const EnrichmentCacheCountAggregateInputObjectZodSchema = makeSchema();
