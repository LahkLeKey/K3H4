import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { ChatSessionArgsObjectSchema as ChatSessionArgsObjectSchema } from './ChatSessionArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  session: z.union([z.boolean(), z.lazy(() => ChatSessionArgsObjectSchema)]).optional()
}).strict();
export const OllamaOperationIncludeObjectSchema: z.ZodType<Prisma.OllamaOperationInclude> = makeSchema() as unknown as z.ZodType<Prisma.OllamaOperationInclude>;
export const OllamaOperationIncludeObjectZodSchema = makeSchema();
