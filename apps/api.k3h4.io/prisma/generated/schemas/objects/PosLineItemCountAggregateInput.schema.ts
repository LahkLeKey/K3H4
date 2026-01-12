import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  ticketId: z.literal(true).optional(),
  name: z.literal(true).optional(),
  quantity: z.literal(true).optional(),
  price: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const PosLineItemCountAggregateInputObjectSchema: z.ZodType<Prisma.PosLineItemCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PosLineItemCountAggregateInputType>;
export const PosLineItemCountAggregateInputObjectZodSchema = makeSchema();
