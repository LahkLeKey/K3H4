import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  actorId: SortOrderSchema.optional(),
  kind: SortOrderSchema.optional(),
  direction: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  targetType: SortOrderSchema.optional(),
  targetId: SortOrderSchema.optional(),
  source: SortOrderSchema.optional(),
  isGlobal: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const EntityMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.EntityMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityMaxOrderByAggregateInput>;
export const EntityMaxOrderByAggregateInputObjectZodSchema = makeSchema();
