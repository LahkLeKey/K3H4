import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  provider: SortOrderSchema.optional(),
  namespace: SortOrderSchema.optional(),
  kind: SortOrderSchema.optional(),
  sourceKey: SortOrderSchema.optional(),
  paramsHash: SortOrderSchema.optional(),
  wikidataId: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  fetchedAt: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  note: SortOrderSchema.optional()
}).strict();
export const EnrichmentCacheMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.EnrichmentCacheMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.EnrichmentCacheMaxOrderByAggregateInput>;
export const EnrichmentCacheMaxOrderByAggregateInputObjectZodSchema = makeSchema();
