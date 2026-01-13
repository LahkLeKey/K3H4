import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  total: z.literal(true).optional(),
  itemsCount: z.literal(true).optional()
}).strict();
export const PosTicketAvgAggregateInputObjectSchema: z.ZodType<Prisma.PosTicketAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketAvgAggregateInputType>;
export const PosTicketAvgAggregateInputObjectZodSchema = makeSchema();
