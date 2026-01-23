import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { UserCreateNestedOneWithoutChatSessionsInputObjectSchema as UserCreateNestedOneWithoutChatSessionsInputObjectSchema } from './UserCreateNestedOneWithoutChatSessionsInput.schema';
import { ChatMessageCreateNestedManyWithoutSessionInputObjectSchema as ChatMessageCreateNestedManyWithoutSessionInputObjectSchema } from './ChatMessageCreateNestedManyWithoutSessionInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  title: z.string().optional().nullable(),
  systemPrompt: z.string().optional().nullable(),
  model: z.string().optional().nullable(),
  temperature: z.number().optional().nullable(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutChatSessionsInputObjectSchema),
  messages: z.lazy(() => ChatMessageCreateNestedManyWithoutSessionInputObjectSchema).optional()
}).strict();
export const ChatSessionCreateInputObjectSchema: z.ZodType<Prisma.ChatSessionCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionCreateInput>;
export const ChatSessionCreateInputObjectZodSchema = makeSchema();
