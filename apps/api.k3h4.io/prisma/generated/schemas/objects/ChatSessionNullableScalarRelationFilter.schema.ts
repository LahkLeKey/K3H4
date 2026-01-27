import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatSessionWhereInputObjectSchema as ChatSessionWhereInputObjectSchema } from './ChatSessionWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => ChatSessionWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => ChatSessionWhereInputObjectSchema).optional().nullable()
}).strict();
export const ChatSessionNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.ChatSessionNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionNullableScalarRelationFilter>;
export const ChatSessionNullableScalarRelationFilterObjectZodSchema = makeSchema();
