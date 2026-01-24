import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatSessionArgsObjectSchema as ChatSessionArgsObjectSchema } from './ChatSessionArgs.schema'

const makeSchema = () => z.object({
  session: z.union([z.boolean(), z.lazy(() => ChatSessionArgsObjectSchema)]).optional()
}).strict();
export const ChatMessageIncludeObjectSchema: z.ZodType<Prisma.ChatMessageInclude> = makeSchema() as unknown as z.ZodType<Prisma.ChatMessageInclude>;
export const ChatMessageIncludeObjectZodSchema = makeSchema();
