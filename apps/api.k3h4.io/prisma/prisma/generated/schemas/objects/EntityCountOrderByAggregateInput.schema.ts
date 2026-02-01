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
  metadata: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const EntityCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.EntityCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityCountOrderByAggregateInput>;
export const EntityCountOrderByAggregateInputObjectZodSchema = makeSchema();
