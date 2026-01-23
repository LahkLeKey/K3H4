import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { ChatRoleSchema } from '../enums/ChatRole.schema';
import { EnumChatRoleFieldUpdateOperationsInputObjectSchema as EnumChatRoleFieldUpdateOperationsInputObjectSchema } from './EnumChatRoleFieldUpdateOperationsInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { ChatSessionUpdateOneRequiredWithoutMessagesNestedInputObjectSchema as ChatSessionUpdateOneRequiredWithoutMessagesNestedInputObjectSchema } from './ChatSessionUpdateOneRequiredWithoutMessagesNestedInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  role: z.union([ChatRoleSchema, z.lazy(() => EnumChatRoleFieldUpdateOperationsInputObjectSchema)]).optional(),
  content: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  session: z.lazy(() => ChatSessionUpdateOneRequiredWithoutMessagesNestedInputObjectSchema).optional()
}).strict();
export const ChatMessageUpdateInputObjectSchema: z.ZodType<Prisma.ChatMessageUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatMessageUpdateInput>;
export const ChatMessageUpdateInputObjectZodSchema = makeSchema();
