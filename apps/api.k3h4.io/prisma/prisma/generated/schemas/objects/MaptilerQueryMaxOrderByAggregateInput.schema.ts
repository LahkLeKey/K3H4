import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  signature: SortOrderSchema.optional(),
  kind: SortOrderSchema.optional(),
  path: SortOrderSchema.optional(),
  lastUsedAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const MaptilerQueryMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.MaptilerQueryMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerQueryMaxOrderByAggregateInput>;
export const MaptilerQueryMaxOrderByAggregateInputObjectZodSchema = makeSchema();
