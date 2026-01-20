import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const GeoQueryCacheOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.GeoQueryCacheOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoQueryCacheOrderByRelationAggregateInput>;
export const GeoQueryCacheOrderByRelationAggregateInputObjectZodSchema = makeSchema();
