import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatSessionCountOutputTypeSelectObjectSchema as ChatSessionCountOutputTypeSelectObjectSchema } from './ChatSessionCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ChatSessionCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const ChatSessionCountOutputTypeArgsObjectSchema = makeSchema();
export const ChatSessionCountOutputTypeArgsObjectZodSchema = makeSchema();
