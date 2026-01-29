import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  label: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  note: SortOrderSchema.optional(),
  source: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const ActorMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ActorMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorMinOrderByAggregateInput>;
export const ActorMinOrderByAggregateInputObjectZodSchema = makeSchema();
