import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  quantity: SortOrderSchema.optional()
}).strict();
export const WarehouseItemAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.WarehouseItemAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemAvgOrderByAggregateInput>;
export const WarehouseItemAvgOrderByAggregateInputObjectZodSchema = makeSchema();
