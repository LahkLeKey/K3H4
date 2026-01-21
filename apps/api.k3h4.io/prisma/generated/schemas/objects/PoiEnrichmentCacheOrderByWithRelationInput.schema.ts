import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  includeHash: SortOrderSchema.optional(),
  payload: SortOrderSchema.optional(),
  fetchedAt: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional()
}).strict();
export const PoiEnrichmentCacheOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.PoiEnrichmentCacheOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.PoiEnrichmentCacheOrderByWithRelationInput>;
export const PoiEnrichmentCacheOrderByWithRelationInputObjectZodSchema = makeSchema();
