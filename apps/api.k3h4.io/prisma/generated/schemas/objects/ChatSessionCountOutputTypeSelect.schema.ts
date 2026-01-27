import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatSessionCountOutputTypeCountMessagesArgsObjectSchema as ChatSessionCountOutputTypeCountMessagesArgsObjectSchema } from './ChatSessionCountOutputTypeCountMessagesArgs.schema';
import { ChatSessionCountOutputTypeCountOllamaOperationsArgsObjectSchema as ChatSessionCountOutputTypeCountOllamaOperationsArgsObjectSchema } from './ChatSessionCountOutputTypeCountOllamaOperationsArgs.schema'

const makeSchema = () => z.object({
  messages: z.union([z.boolean(), z.lazy(() => ChatSessionCountOutputTypeCountMessagesArgsObjectSchema)]).optional(),
  ollamaOperations: z.union([z.boolean(), z.lazy(() => ChatSessionCountOutputTypeCountOllamaOperationsArgsObjectSchema)]).optional()
}).strict();
export const ChatSessionCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.ChatSessionCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionCountOutputTypeSelect>;
export const ChatSessionCountOutputTypeSelectObjectZodSchema = makeSchema();
