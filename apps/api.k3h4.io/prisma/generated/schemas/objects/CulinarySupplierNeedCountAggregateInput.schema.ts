import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  item: z.literal(true).optional(),
  quantity: z.literal(true).optional(),
  status: z.literal(true).optional(),
  dueDate: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const CulinarySupplierNeedCountAggregateInputObjectSchema: z.ZodType<Prisma.CulinarySupplierNeedCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CulinarySupplierNeedCountAggregateInputType>;
export const CulinarySupplierNeedCountAggregateInputObjectZodSchema = makeSchema();
