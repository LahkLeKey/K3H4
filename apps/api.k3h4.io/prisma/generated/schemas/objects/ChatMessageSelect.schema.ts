import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatSessionArgsObjectSchema as ChatSessionArgsObjectSchema } from './ChatSessionArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  sessionId: z.boolean().optional(),
  session: z.union([z.boolean(), z.lazy(() => ChatSessionArgsObjectSchema)]).optional(),
  role: z.boolean().optional(),
  content: z.boolean().optional(),
  metadata: z.boolean().optional(),
  createdAt: z.boolean().optional()
}).strict();
export const ChatMessageSelectObjectSchema: z.ZodType<Prisma.ChatMessageSelect> = makeSchema() as unknown as z.ZodType<Prisma.ChatMessageSelect>;
export const ChatMessageSelectObjectZodSchema = makeSchema();
