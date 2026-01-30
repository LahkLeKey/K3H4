import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatRoleSchema } from '../enums/ChatRole.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  role: ChatRoleSchema,
  content: z.string(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional()
}).strict();
export const ChatMessageUncheckedCreateWithoutSessionInputObjectSchema: z.ZodType<Prisma.ChatMessageUncheckedCreateWithoutSessionInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatMessageUncheckedCreateWithoutSessionInput>;
export const ChatMessageUncheckedCreateWithoutSessionInputObjectZodSchema = makeSchema();
