import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  targetType: SortOrderSchema.optional(),
  targetId: SortOrderSchema.optional(),
  targetLabel: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  metadata: SortOrderSchema.optional(),
  payload: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const AiInsightCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AiInsightCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AiInsightCountOrderByAggregateInput>;
export const AiInsightCountOrderByAggregateInputObjectZodSchema = makeSchema();
