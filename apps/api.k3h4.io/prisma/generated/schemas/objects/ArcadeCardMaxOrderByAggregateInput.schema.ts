import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  label: SortOrderSchema.optional(),
  balance: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const ArcadeCardMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ArcadeCardMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardMaxOrderByAggregateInput>;
export const ArcadeCardMaxOrderByAggregateInputObjectZodSchema = makeSchema();
