import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  totalQuantity: z.literal(true).optional()
}).strict();
export const AgricultureInventorySumAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureInventorySumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventorySumAggregateInputType>;
export const AgricultureInventorySumAggregateInputObjectZodSchema = makeSchema();
