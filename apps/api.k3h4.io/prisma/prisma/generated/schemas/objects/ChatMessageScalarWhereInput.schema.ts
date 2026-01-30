import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumChatRoleFilterObjectSchema as EnumChatRoleFilterObjectSchema } from './EnumChatRoleFilter.schema';
import { ChatRoleSchema } from '../enums/ChatRole.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const chatmessagescalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ChatMessageScalarWhereInputObjectSchema), z.lazy(() => ChatMessageScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ChatMessageScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ChatMessageScalarWhereInputObjectSchema), z.lazy(() => ChatMessageScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  sessionId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  role: z.union([z.lazy(() => EnumChatRoleFilterObjectSchema), ChatRoleSchema]).optional(),
  content: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  metadata: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const ChatMessageScalarWhereInputObjectSchema: z.ZodType<Prisma.ChatMessageScalarWhereInput> = chatmessagescalarwhereinputSchema as unknown as z.ZodType<Prisma.ChatMessageScalarWhereInput>;
export const ChatMessageScalarWhereInputObjectZodSchema = chatmessagescalarwhereinputSchema;
