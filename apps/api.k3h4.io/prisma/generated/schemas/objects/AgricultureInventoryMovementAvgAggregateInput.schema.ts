import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  quantity: z.literal(true).optional()
}).strict();
export const AgricultureInventoryMovementAvgAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementAvgAggregateInputType>;
export const AgricultureInventoryMovementAvgAggregateInputObjectZodSchema = makeSchema();
