import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  title: z.string().optional().nullable(),
  systemPrompt: z.string().optional().nullable(),
  model: z.string().optional().nullable(),
  temperature: z.number().optional().nullable(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const ChatSessionCreateManyUserInputObjectSchema: z.ZodType<Prisma.ChatSessionCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionCreateManyUserInput>;
export const ChatSessionCreateManyUserInputObjectZodSchema = makeSchema();
