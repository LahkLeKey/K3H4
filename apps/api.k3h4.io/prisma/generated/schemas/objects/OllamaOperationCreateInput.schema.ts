import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { UserCreateNestedOneWithoutOllamaOperationsInputObjectSchema as UserCreateNestedOneWithoutOllamaOperationsInputObjectSchema } from './UserCreateNestedOneWithoutOllamaOperationsInput.schema';
import { ChatSessionCreateNestedOneWithoutOllamaOperationsInputObjectSchema as ChatSessionCreateNestedOneWithoutOllamaOperationsInputObjectSchema } from './ChatSessionCreateNestedOneWithoutOllamaOperationsInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  source: z.string(),
  model: z.string(),
  temperature: z.number().optional().nullable(),
  systemPrompt: z.string().optional().nullable(),
  requestBody: z.union([JsonNullValueInputSchema, jsonSchema]),
  responseBody: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  statusCode: z.number().int().optional().nullable(),
  errorMessage: z.string().optional().nullable(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutOllamaOperationsInputObjectSchema),
  session: z.lazy(() => ChatSessionCreateNestedOneWithoutOllamaOperationsInputObjectSchema).optional()
}).strict();
export const OllamaOperationCreateInputObjectSchema: z.ZodType<Prisma.OllamaOperationCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.OllamaOperationCreateInput>;
export const OllamaOperationCreateInputObjectZodSchema = makeSchema();
