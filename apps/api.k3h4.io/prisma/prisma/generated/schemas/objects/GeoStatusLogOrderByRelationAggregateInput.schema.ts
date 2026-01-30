import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const GeoStatusLogOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.GeoStatusLogOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoStatusLogOrderByRelationAggregateInput>;
export const GeoStatusLogOrderByRelationAggregateInputObjectZodSchema = makeSchema();
