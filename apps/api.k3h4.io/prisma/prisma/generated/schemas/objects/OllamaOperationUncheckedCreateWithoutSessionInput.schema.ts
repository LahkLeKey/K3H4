import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
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
  updatedAt: z.coerce.date().optional()
}).strict();
export const OllamaOperationUncheckedCreateWithoutSessionInputObjectSchema: z.ZodType<Prisma.OllamaOperationUncheckedCreateWithoutSessionInput> = makeSchema() as unknown as z.ZodType<Prisma.OllamaOperationUncheckedCreateWithoutSessionInput>;
export const OllamaOperationUncheckedCreateWithoutSessionInputObjectZodSchema = makeSchema();
