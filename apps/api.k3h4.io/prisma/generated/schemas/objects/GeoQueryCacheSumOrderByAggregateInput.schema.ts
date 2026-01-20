import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  count: SortOrderSchema.optional()
}).strict();
export const GeoQueryCacheSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.GeoQueryCacheSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoQueryCacheSumOrderByAggregateInput>;
export const GeoQueryCacheSumOrderByAggregateInputObjectZodSchema = makeSchema();
