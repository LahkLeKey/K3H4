import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { ChatMessageUncheckedCreateNestedManyWithoutSessionInputObjectSchema as ChatMessageUncheckedCreateNestedManyWithoutSessionInputObjectSchema } from './ChatMessageUncheckedCreateNestedManyWithoutSessionInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  title: z.string().optional().nullable(),
  systemPrompt: z.string().optional().nullable(),
  model: z.string().optional().nullable(),
  temperature: z.number().optional().nullable(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  messages: z.lazy(() => ChatMessageUncheckedCreateNestedManyWithoutSessionInputObjectSchema).optional()
}).strict();
export const ChatSessionUncheckedCreateInputObjectSchema: z.ZodType<Prisma.ChatSessionUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionUncheckedCreateInput>;
export const ChatSessionUncheckedCreateInputObjectZodSchema = makeSchema();
