import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  sessionId: SortOrderSchema.optional(),
  role: SortOrderSchema.optional(),
  content: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const ChatMessageMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ChatMessageMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatMessageMinOrderByAggregateInput>;
export const ChatMessageMinOrderByAggregateInputObjectZodSchema = makeSchema();
