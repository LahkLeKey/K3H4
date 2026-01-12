import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  quantity: SortOrderSchema.optional()
}).strict();
export const AgricultureInventoryMovementSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementSumOrderByAggregateInput>;
export const AgricultureInventoryMovementSumOrderByAggregateInputObjectZodSchema = makeSchema();
