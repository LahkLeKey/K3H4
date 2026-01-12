import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const AgricultureInventoryOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryOrderByRelationAggregateInput>;
export const AgricultureInventoryOrderByRelationAggregateInputObjectZodSchema = makeSchema();
