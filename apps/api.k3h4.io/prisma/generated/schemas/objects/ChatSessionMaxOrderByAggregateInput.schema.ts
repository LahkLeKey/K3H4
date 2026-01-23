import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  systemPrompt: SortOrderSchema.optional(),
  model: SortOrderSchema.optional(),
  temperature: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const ChatSessionMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ChatSessionMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionMaxOrderByAggregateInput>;
export const ChatSessionMaxOrderByAggregateInputObjectZodSchema = makeSchema();
