import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { ChatMessageFindManySchema as ChatMessageFindManySchema } from '../findManyChatMessage.schema';
import { OllamaOperationFindManySchema as OllamaOperationFindManySchema } from '../findManyOllamaOperation.schema';
import { ChatSessionCountOutputTypeArgsObjectSchema as ChatSessionCountOutputTypeArgsObjectSchema } from './ChatSessionCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  title: z.boolean().optional(),
  systemPrompt: z.boolean().optional(),
  model: z.boolean().optional(),
  temperature: z.boolean().optional(),
  metadata: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  messages: z.union([z.boolean(), z.lazy(() => ChatMessageFindManySchema)]).optional(),
  ollamaOperations: z.union([z.boolean(), z.lazy(() => OllamaOperationFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ChatSessionCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ChatSessionSelectObjectSchema: z.ZodType<Prisma.ChatSessionSelect> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionSelect>;
export const ChatSessionSelectObjectZodSchema = makeSchema();
