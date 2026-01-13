import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  slotIndex: z.literal(true).optional(),
  costPaid: z.literal(true).optional()
}).strict();
export const AgricultureSlotAvgAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureSlotAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureSlotAvgAggregateInputType>;
export const AgricultureSlotAvgAggregateInputObjectZodSchema = makeSchema();
