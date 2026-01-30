import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ChatSessionCountOrderByAggregateInputObjectSchema as ChatSessionCountOrderByAggregateInputObjectSchema } from './ChatSessionCountOrderByAggregateInput.schema';
import { ChatSessionAvgOrderByAggregateInputObjectSchema as ChatSessionAvgOrderByAggregateInputObjectSchema } from './ChatSessionAvgOrderByAggregateInput.schema';
import { ChatSessionMaxOrderByAggregateInputObjectSchema as ChatSessionMaxOrderByAggregateInputObjectSchema } from './ChatSessionMaxOrderByAggregateInput.schema';
import { ChatSessionMinOrderByAggregateInputObjectSchema as ChatSessionMinOrderByAggregateInputObjectSchema } from './ChatSessionMinOrderByAggregateInput.schema';
import { ChatSessionSumOrderByAggregateInputObjectSchema as ChatSessionSumOrderByAggregateInputObjectSchema } from './ChatSessionSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  title: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  systemPrompt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  model: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  temperature: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  metadata: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => ChatSessionCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => ChatSessionAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ChatSessionMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ChatSessionMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => ChatSessionSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ChatSessionOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ChatSessionOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionOrderByWithAggregationInput>;
export const ChatSessionOrderByWithAggregationInputObjectZodSchema = makeSchema();
