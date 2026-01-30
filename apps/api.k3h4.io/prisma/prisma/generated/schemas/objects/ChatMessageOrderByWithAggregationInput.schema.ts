import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ChatMessageCountOrderByAggregateInputObjectSchema as ChatMessageCountOrderByAggregateInputObjectSchema } from './ChatMessageCountOrderByAggregateInput.schema';
import { ChatMessageMaxOrderByAggregateInputObjectSchema as ChatMessageMaxOrderByAggregateInputObjectSchema } from './ChatMessageMaxOrderByAggregateInput.schema';
import { ChatMessageMinOrderByAggregateInputObjectSchema as ChatMessageMinOrderByAggregateInputObjectSchema } from './ChatMessageMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  sessionId: SortOrderSchema.optional(),
  role: SortOrderSchema.optional(),
  content: SortOrderSchema.optional(),
  metadata: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => ChatMessageCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ChatMessageMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ChatMessageMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ChatMessageOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ChatMessageOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatMessageOrderByWithAggregationInput>;
export const ChatMessageOrderByWithAggregationInputObjectZodSchema = makeSchema();
