import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumChatRoleFilterObjectSchema as EnumChatRoleFilterObjectSchema } from './EnumChatRoleFilter.schema';
import { ChatRoleSchema } from '../enums/ChatRole.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { ChatSessionScalarRelationFilterObjectSchema as ChatSessionScalarRelationFilterObjectSchema } from './ChatSessionScalarRelationFilter.schema';
import { ChatSessionWhereInputObjectSchema as ChatSessionWhereInputObjectSchema } from './ChatSessionWhereInput.schema'

const chatmessagewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ChatMessageWhereInputObjectSchema), z.lazy(() => ChatMessageWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ChatMessageWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ChatMessageWhereInputObjectSchema), z.lazy(() => ChatMessageWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  sessionId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  role: z.union([z.lazy(() => EnumChatRoleFilterObjectSchema), ChatRoleSchema]).optional(),
  content: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  metadata: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  session: z.union([z.lazy(() => ChatSessionScalarRelationFilterObjectSchema), z.lazy(() => ChatSessionWhereInputObjectSchema)]).optional()
}).strict();
export const ChatMessageWhereInputObjectSchema: z.ZodType<Prisma.ChatMessageWhereInput> = chatmessagewhereinputSchema as unknown as z.ZodType<Prisma.ChatMessageWhereInput>;
export const ChatMessageWhereInputObjectZodSchema = chatmessagewhereinputSchema;
