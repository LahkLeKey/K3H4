import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  storeId: z.literal(true).optional(),
  total: z.literal(true).optional(),
  itemsCount: z.literal(true).optional(),
  channel: z.literal(true).optional(),
  status: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const PosTicketMinAggregateInputObjectSchema: z.ZodType<Prisma.PosTicketMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketMinAggregateInputType>;
export const PosTicketMinAggregateInputObjectZodSchema = makeSchema();
