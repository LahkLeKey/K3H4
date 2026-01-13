import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  ticketId: z.literal(true).optional(),
  name: z.literal(true).optional(),
  quantity: z.literal(true).optional(),
  price: z.literal(true).optional(),
  createdAt: z.literal(true).optional()
}).strict();
export const PosLineItemMaxAggregateInputObjectSchema: z.ZodType<Prisma.PosLineItemMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PosLineItemMaxAggregateInputType>;
export const PosLineItemMaxAggregateInputObjectZodSchema = makeSchema();
