import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableFloatFieldUpdateOperationsInputObjectSchema as NullableFloatFieldUpdateOperationsInputObjectSchema } from './NullableFloatFieldUpdateOperationsInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { ChatMessageUpdateManyWithoutSessionNestedInputObjectSchema as ChatMessageUpdateManyWithoutSessionNestedInputObjectSchema } from './ChatMessageUpdateManyWithoutSessionNestedInput.schema';
import { OllamaOperationUpdateManyWithoutSessionNestedInputObjectSchema as OllamaOperationUpdateManyWithoutSessionNestedInputObjectSchema } from './OllamaOperationUpdateManyWithoutSessionNestedInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  systemPrompt: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  model: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  temperature: z.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  messages: z.lazy(() => ChatMessageUpdateManyWithoutSessionNestedInputObjectSchema).optional(),
  ollamaOperations: z.lazy(() => OllamaOperationUpdateManyWithoutSessionNestedInputObjectSchema).optional()
}).strict();
export const ChatSessionUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.ChatSessionUpdateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionUpdateWithoutUserInput>;
export const ChatSessionUpdateWithoutUserInputObjectZodSchema = makeSchema();
