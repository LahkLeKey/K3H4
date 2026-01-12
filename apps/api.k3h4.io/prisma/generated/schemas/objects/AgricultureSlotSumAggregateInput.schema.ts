import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  slotIndex: z.literal(true).optional(),
  costPaid: z.literal(true).optional()
}).strict();
export const AgricultureSlotSumAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureSlotSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureSlotSumAggregateInputType>;
export const AgricultureSlotSumAggregateInputObjectZodSchema = makeSchema();
