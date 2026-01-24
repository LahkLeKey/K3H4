import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatSessionCountOutputTypeCountMessagesArgsObjectSchema as ChatSessionCountOutputTypeCountMessagesArgsObjectSchema } from './ChatSessionCountOutputTypeCountMessagesArgs.schema'

const makeSchema = () => z.object({
  messages: z.union([z.boolean(), z.lazy(() => ChatSessionCountOutputTypeCountMessagesArgsObjectSchema)]).optional()
}).strict();
export const ChatSessionCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.ChatSessionCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionCountOutputTypeSelect>;
export const ChatSessionCountOutputTypeSelectObjectZodSchema = makeSchema();
