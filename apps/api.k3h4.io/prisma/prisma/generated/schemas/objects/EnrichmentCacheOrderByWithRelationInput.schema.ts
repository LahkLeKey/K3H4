import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  provider: SortOrderSchema.optional(),
  namespace: SortOrderSchema.optional(),
  kind: SortOrderSchema.optional(),
  sourceKey: SortOrderSchema.optional(),
  paramsHash: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  wikidataId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  payload: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  status: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  fetchedAt: SortOrderSchema.optional(),
  expiresAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  note: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional()
}).strict();
export const EnrichmentCacheOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.EnrichmentCacheOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.EnrichmentCacheOrderByWithRelationInput>;
export const EnrichmentCacheOrderByWithRelationInputObjectZodSchema = makeSchema();
