import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  totalQuantity: SortOrderSchema.optional()
}).strict();
export const AgricultureInventoryAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryAvgOrderByAggregateInput>;
export const AgricultureInventoryAvgOrderByAggregateInputObjectZodSchema = makeSchema();
