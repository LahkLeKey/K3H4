import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const AgricultureTaskOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureTaskOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskOrderByRelationAggregateInput>;
export const AgricultureTaskOrderByRelationAggregateInputObjectZodSchema = makeSchema();
