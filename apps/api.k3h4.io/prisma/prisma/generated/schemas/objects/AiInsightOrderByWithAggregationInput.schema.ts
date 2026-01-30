import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { AiInsightCountOrderByAggregateInputObjectSchema as AiInsightCountOrderByAggregateInputObjectSchema } from './AiInsightCountOrderByAggregateInput.schema';
import { AiInsightMaxOrderByAggregateInputObjectSchema as AiInsightMaxOrderByAggregateInputObjectSchema } from './AiInsightMaxOrderByAggregateInput.schema';
import { AiInsightMinOrderByAggregateInputObjectSchema as AiInsightMinOrderByAggregateInputObjectSchema } from './AiInsightMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  targetType: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  targetId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  targetLabel: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  description: SortOrderSchema.optional(),
  metadata: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  payload: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => AiInsightCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => AiInsightMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => AiInsightMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const AiInsightOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.AiInsightOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.AiInsightOrderByWithAggregationInput>;
export const AiInsightOrderByWithAggregationInputObjectZodSchema = makeSchema();
