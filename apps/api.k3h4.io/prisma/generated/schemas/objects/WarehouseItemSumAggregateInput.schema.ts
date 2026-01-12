import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  quantity: z.literal(true).optional()
}).strict();
export const WarehouseItemSumAggregateInputObjectSchema: z.ZodType<Prisma.WarehouseItemSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemSumAggregateInputType>;
export const WarehouseItemSumAggregateInputObjectZodSchema = makeSchema();
