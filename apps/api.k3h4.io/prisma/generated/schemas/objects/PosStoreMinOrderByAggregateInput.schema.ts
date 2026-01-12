import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  channel: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const PosStoreMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PosStoreMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreMinOrderByAggregateInput>;
export const PosStoreMinOrderByAggregateInputObjectZodSchema = makeSchema();
