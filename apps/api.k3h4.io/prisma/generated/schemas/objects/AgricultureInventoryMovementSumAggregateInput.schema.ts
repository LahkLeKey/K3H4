import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  quantity: z.literal(true).optional()
}).strict();
export const AgricultureInventoryMovementSumAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementSumAggregateInputType>;
export const AgricultureInventoryMovementSumAggregateInputObjectZodSchema = makeSchema();
