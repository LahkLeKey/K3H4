import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  total: z.literal(true).optional(),
  itemsCount: z.literal(true).optional()
}).strict();
export const PosTicketSumAggregateInputObjectSchema: z.ZodType<Prisma.PosTicketSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketSumAggregateInputType>;
export const PosTicketSumAggregateInputObjectZodSchema = makeSchema();
