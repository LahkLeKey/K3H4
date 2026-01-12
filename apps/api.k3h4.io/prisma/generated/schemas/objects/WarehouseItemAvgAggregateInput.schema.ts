import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  quantity: z.literal(true).optional()
}).strict();
export const WarehouseItemAvgAggregateInputObjectSchema: z.ZodType<Prisma.WarehouseItemAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemAvgAggregateInputType>;
export const WarehouseItemAvgAggregateInputObjectZodSchema = makeSchema();
