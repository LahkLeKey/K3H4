import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { ChatMessageFindManySchema as ChatMessageFindManySchema } from '../findManyChatMessage.schema';
import { ChatSessionCountOutputTypeArgsObjectSchema as ChatSessionCountOutputTypeArgsObjectSchema } from './ChatSessionCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  messages: z.union([z.boolean(), z.lazy(() => ChatMessageFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ChatSessionCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ChatSessionIncludeObjectSchema: z.ZodType<Prisma.ChatSessionInclude> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionInclude>;
export const ChatSessionIncludeObjectZodSchema = makeSchema();
