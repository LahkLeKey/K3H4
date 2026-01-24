import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatSessionWhereInputObjectSchema as ChatSessionWhereInputObjectSchema } from './ChatSessionWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => ChatSessionWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => ChatSessionWhereInputObjectSchema).optional()
}).strict();
export const ChatSessionScalarRelationFilterObjectSchema: z.ZodType<Prisma.ChatSessionScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionScalarRelationFilter>;
export const ChatSessionScalarRelationFilterObjectZodSchema = makeSchema();
