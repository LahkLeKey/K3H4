import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { FloatNullableFilterObjectSchema as FloatNullableFilterObjectSchema } from './FloatNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { ChatMessageListRelationFilterObjectSchema as ChatMessageListRelationFilterObjectSchema } from './ChatMessageListRelationFilter.schema'

const chatsessionwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ChatSessionWhereInputObjectSchema), z.lazy(() => ChatSessionWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ChatSessionWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ChatSessionWhereInputObjectSchema), z.lazy(() => ChatSessionWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  title: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  systemPrompt: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  model: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  temperature: z.union([z.lazy(() => FloatNullableFilterObjectSchema), z.number()]).optional().nullable(),
  metadata: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  messages: z.lazy(() => ChatMessageListRelationFilterObjectSchema).optional()
}).strict();
export const ChatSessionWhereInputObjectSchema: z.ZodType<Prisma.ChatSessionWhereInput> = chatsessionwhereinputSchema as unknown as z.ZodType<Prisma.ChatSessionWhereInput>;
export const ChatSessionWhereInputObjectZodSchema = chatsessionwhereinputSchema;
