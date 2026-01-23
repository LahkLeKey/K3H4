import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ChatSessionOrderByWithRelationInputObjectSchema as ChatSessionOrderByWithRelationInputObjectSchema } from './ChatSessionOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  sessionId: SortOrderSchema.optional(),
  role: SortOrderSchema.optional(),
  content: SortOrderSchema.optional(),
  metadata: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  session: z.lazy(() => ChatSessionOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const ChatMessageOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ChatMessageOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatMessageOrderByWithRelationInput>;
export const ChatMessageOrderByWithRelationInputObjectZodSchema = makeSchema();
