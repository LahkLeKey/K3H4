import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const PoiOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.PoiOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PoiOrderByRelationAggregateInput>;
export const PoiOrderByRelationAggregateInputObjectZodSchema = makeSchema();
