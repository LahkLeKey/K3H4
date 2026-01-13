import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  totalQuantity: SortOrderSchema.optional()
}).strict();
export const AgricultureInventorySumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureInventorySumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventorySumOrderByAggregateInput>;
export const AgricultureInventorySumOrderByAggregateInputObjectZodSchema = makeSchema();
