import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatSessionSelectObjectSchema as ChatSessionSelectObjectSchema } from './ChatSessionSelect.schema';
import { ChatSessionIncludeObjectSchema as ChatSessionIncludeObjectSchema } from './ChatSessionInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ChatSessionSelectObjectSchema).optional(),
  include: z.lazy(() => ChatSessionIncludeObjectSchema).optional()
}).strict();
export const ChatSessionArgsObjectSchema = makeSchema();
export const ChatSessionArgsObjectZodSchema = makeSchema();
