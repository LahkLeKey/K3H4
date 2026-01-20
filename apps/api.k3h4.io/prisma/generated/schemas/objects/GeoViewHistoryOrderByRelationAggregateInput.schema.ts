import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const GeoViewHistoryOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.GeoViewHistoryOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoViewHistoryOrderByRelationAggregateInput>;
export const GeoViewHistoryOrderByRelationAggregateInputObjectZodSchema = makeSchema();
