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
export const CulinaryPrepTaskCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CulinaryPrepTaskCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryPrepTaskCountOrderByAggregateInput>;
export const CulinaryPrepTaskCountOrderByAggregateInputObjectZodSchema = makeSchema();
