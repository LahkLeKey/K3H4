import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  quantity: SortOrderSchema.optional()
}).strict();
export const AgricultureInventoryMovementAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementAvgOrderByAggregateInput>;
export const AgricultureInventoryMovementAvgOrderByAggregateInputObjectZodSchema = makeSchema();
