import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const GeoRouteCacheOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.GeoRouteCacheOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoRouteCacheOrderByRelationAggregateInput>;
export const GeoRouteCacheOrderByRelationAggregateInputObjectZodSchema = makeSchema();
