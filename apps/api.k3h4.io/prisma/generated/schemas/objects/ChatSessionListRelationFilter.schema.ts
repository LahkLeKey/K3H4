import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatSessionWhereInputObjectSchema as ChatSessionWhereInputObjectSchema } from './ChatSessionWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => ChatSessionWhereInputObjectSchema).optional(),
  some: z.lazy(() => ChatSessionWhereInputObjectSchema).optional(),
  none: z.lazy(() => ChatSessionWhereInputObjectSchema).optional()
}).strict();
export const ChatSessionListRelationFilterObjectSchema: z.ZodType<Prisma.ChatSessionListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionListRelationFilter>;
export const ChatSessionListRelationFilterObjectZodSchema = makeSchema();
