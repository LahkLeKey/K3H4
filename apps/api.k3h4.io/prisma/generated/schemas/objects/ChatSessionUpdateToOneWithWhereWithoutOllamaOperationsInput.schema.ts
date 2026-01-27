import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatSessionWhereInputObjectSchema as ChatSessionWhereInputObjectSchema } from './ChatSessionWhereInput.schema';
import { ChatSessionUpdateWithoutOllamaOperationsInputObjectSchema as ChatSessionUpdateWithoutOllamaOperationsInputObjectSchema } from './ChatSessionUpdateWithoutOllamaOperationsInput.schema';
import { ChatSessionUncheckedUpdateWithoutOllamaOperationsInputObjectSchema as ChatSessionUncheckedUpdateWithoutOllamaOperationsInputObjectSchema } from './ChatSessionUncheckedUpdateWithoutOllamaOperationsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ChatSessionWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ChatSessionUpdateWithoutOllamaOperationsInputObjectSchema), z.lazy(() => ChatSessionUncheckedUpdateWithoutOllamaOperationsInputObjectSchema)])
}).strict();
export const ChatSessionUpdateToOneWithWhereWithoutOllamaOperationsInputObjectSchema: z.ZodType<Prisma.ChatSessionUpdateToOneWithWhereWithoutOllamaOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionUpdateToOneWithWhereWithoutOllamaOperationsInput>;
export const ChatSessionUpdateToOneWithWhereWithoutOllamaOperationsInputObjectZodSchema = makeSchema();
