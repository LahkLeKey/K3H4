import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  name: z.literal(true).optional(),
  channel: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const PosStoreMinAggregateInputObjectSchema: z.ZodType<Prisma.PosStoreMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreMinAggregateInputType>;
export const PosStoreMinAggregateInputObjectZodSchema = makeSchema();
