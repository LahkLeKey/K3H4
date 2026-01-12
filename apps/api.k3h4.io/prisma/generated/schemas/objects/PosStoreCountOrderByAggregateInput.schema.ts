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
export const PosStoreCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PosStoreCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreCountOrderByAggregateInput>;
export const PosStoreCountOrderByAggregateInputObjectZodSchema = makeSchema();
