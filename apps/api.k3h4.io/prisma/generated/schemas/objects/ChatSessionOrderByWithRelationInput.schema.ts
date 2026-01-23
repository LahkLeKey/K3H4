import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { ChatMessageOrderByRelationAggregateInputObjectSchema as ChatMessageOrderByRelationAggregateInputObjectSchema } from './ChatMessageOrderByRelationAggregateInput.schema'

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
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  messages: z.lazy(() => ChatMessageOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const ChatSessionOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ChatSessionOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionOrderByWithRelationInput>;
export const ChatSessionOrderByWithRelationInputObjectZodSchema = makeSchema();
