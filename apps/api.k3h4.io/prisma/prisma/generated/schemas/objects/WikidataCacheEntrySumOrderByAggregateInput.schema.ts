import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  statusCode: SortOrderSchema.optional(),
  cacheControlSeconds: SortOrderSchema.optional()
}).strict();
export const WikidataCacheEntrySumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.WikidataCacheEntrySumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.WikidataCacheEntrySumOrderByAggregateInput>;
export const WikidataCacheEntrySumOrderByAggregateInputObjectZodSchema = makeSchema();
