import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const AgricultureSlotOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureSlotOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureSlotOrderByRelationAggregateInput>;
export const AgricultureSlotOrderByRelationAggregateInputObjectZodSchema = makeSchema();
