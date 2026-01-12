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
export const ArcadeCardCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ArcadeCardCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardCountOrderByAggregateInput>;
export const ArcadeCardCountOrderByAggregateInputObjectZodSchema = makeSchema();
