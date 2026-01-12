import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  gameTitle: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  location: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const ArcadeMachineMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ArcadeMachineMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeMachineMaxOrderByAggregateInput>;
export const ArcadeMachineMaxOrderByAggregateInputObjectZodSchema = makeSchema();
