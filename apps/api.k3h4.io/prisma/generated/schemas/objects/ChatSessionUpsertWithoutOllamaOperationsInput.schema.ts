import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatSessionUpdateWithoutOllamaOperationsInputObjectSchema as ChatSessionUpdateWithoutOllamaOperationsInputObjectSchema } from './ChatSessionUpdateWithoutOllamaOperationsInput.schema';
import { ChatSessionUncheckedUpdateWithoutOllamaOperationsInputObjectSchema as ChatSessionUncheckedUpdateWithoutOllamaOperationsInputObjectSchema } from './ChatSessionUncheckedUpdateWithoutOllamaOperationsInput.schema';
import { ChatSessionCreateWithoutOllamaOperationsInputObjectSchema as ChatSessionCreateWithoutOllamaOperationsInputObjectSchema } from './ChatSessionCreateWithoutOllamaOperationsInput.schema';
import { ChatSessionUncheckedCreateWithoutOllamaOperationsInputObjectSchema as ChatSessionUncheckedCreateWithoutOllamaOperationsInputObjectSchema } from './ChatSessionUncheckedCreateWithoutOllamaOperationsInput.schema';
import { ChatSessionWhereInputObjectSchema as ChatSessionWhereInputObjectSchema } from './ChatSessionWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ChatSessionUpdateWithoutOllamaOperationsInputObjectSchema), z.lazy(() => ChatSessionUncheckedUpdateWithoutOllamaOperationsInputObjectSchema)]),
  create: z.union([z.lazy(() => ChatSessionCreateWithoutOllamaOperationsInputObjectSchema), z.lazy(() => ChatSessionUncheckedCreateWithoutOllamaOperationsInputObjectSchema)]),
  where: z.lazy(() => ChatSessionWhereInputObjectSchema).optional()
}).strict();
export const ChatSessionUpsertWithoutOllamaOperationsInputObjectSchema: z.ZodType<Prisma.ChatSessionUpsertWithoutOllamaOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionUpsertWithoutOllamaOperationsInput>;
export const ChatSessionUpsertWithoutOllamaOperationsInputObjectZodSchema = makeSchema();
