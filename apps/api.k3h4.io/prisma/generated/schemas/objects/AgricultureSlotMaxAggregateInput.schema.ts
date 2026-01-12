import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  slotIndex: z.literal(true).optional(),
  unlockedAt: z.literal(true).optional(),
  costPaid: z.literal(true).optional(),
  plotId: z.literal(true).optional()
}).strict();
export const AgricultureSlotMaxAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureSlotMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureSlotMaxAggregateInputType>;
export const AgricultureSlotMaxAggregateInputObjectZodSchema = makeSchema();
