import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const GeoPoiCacheOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.GeoPoiCacheOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoPoiCacheOrderByRelationAggregateInput>;
export const GeoPoiCacheOrderByRelationAggregateInputObjectZodSchema = makeSchema();
