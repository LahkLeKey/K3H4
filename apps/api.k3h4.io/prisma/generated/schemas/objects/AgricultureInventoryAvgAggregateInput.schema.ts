import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  totalQuantity: z.literal(true).optional()
}).strict();
export const AgricultureInventoryAvgAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryAvgAggregateInputType>;
export const AgricultureInventoryAvgAggregateInputObjectZodSchema = makeSchema();
