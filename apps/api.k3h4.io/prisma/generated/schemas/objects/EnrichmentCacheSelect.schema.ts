import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.boolean().optional(),
  provider: z.boolean().optional(),
  namespace: z.boolean().optional(),
  kind: z.boolean().optional(),
  sourceKey: z.boolean().optional(),
  paramsHash: z.boolean().optional(),
  wikidataId: z.boolean().optional(),
  payload: z.boolean().optional(),
  status: z.boolean().optional(),
  fetchedAt: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  note: z.boolean().optional()
}).strict();
export const EnrichmentCacheSelectObjectSchema: z.ZodType<Prisma.EnrichmentCacheSelect> = makeSchema() as unknown as z.ZodType<Prisma.EnrichmentCacheSelect>;
export const EnrichmentCacheSelectObjectZodSchema = makeSchema();
