import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  actorId: SortOrderSchema.optional(),
  kind: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  targetType: SortOrderSchema.optional(),
  targetId: SortOrderSchema.optional(),
  source: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const EntityMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.EntityMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityMinOrderByAggregateInput>;
export const EntityMinOrderByAggregateInputObjectZodSchema = makeSchema();
