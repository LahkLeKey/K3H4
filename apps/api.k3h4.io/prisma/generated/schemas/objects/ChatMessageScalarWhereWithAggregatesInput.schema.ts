import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { EnumChatRoleWithAggregatesFilterObjectSchema as EnumChatRoleWithAggregatesFilterObjectSchema } from './EnumChatRoleWithAggregatesFilter.schema';
import { ChatRoleSchema } from '../enums/ChatRole.schema';
import { JsonNullableWithAggregatesFilterObjectSchema as JsonNullableWithAggregatesFilterObjectSchema } from './JsonNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const chatmessagescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => ChatMessageScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ChatMessageScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ChatMessageScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ChatMessageScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ChatMessageScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  sessionId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  role: z.union([z.lazy(() => EnumChatRoleWithAggregatesFilterObjectSchema), ChatRoleSchema]).optional(),
  content: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  metadata: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const ChatMessageScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.ChatMessageScalarWhereWithAggregatesInput> = chatmessagescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.ChatMessageScalarWhereWithAggregatesInput>;
export const ChatMessageScalarWhereWithAggregatesInputObjectZodSchema = chatmessagescalarwherewithaggregatesinputSchema;
