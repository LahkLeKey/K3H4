import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  quantity: SortOrderSchema.optional()
}).strict();
export const WarehouseItemSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.WarehouseItemSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemSumOrderByAggregateInput>;
export const WarehouseItemSumOrderByAggregateInputObjectZodSchema = makeSchema();
