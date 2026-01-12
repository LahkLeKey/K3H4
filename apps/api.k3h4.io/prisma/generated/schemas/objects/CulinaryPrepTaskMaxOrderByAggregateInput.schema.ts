import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  task: SortOrderSchema.optional(),
  station: SortOrderSchema.optional(),
  dueAt: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const CulinaryPrepTaskMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CulinaryPrepTaskMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryPrepTaskMaxOrderByAggregateInput>;
export const CulinaryPrepTaskMaxOrderByAggregateInputObjectZodSchema = makeSchema();
