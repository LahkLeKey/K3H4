import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatSessionWhereUniqueInputObjectSchema as ChatSessionWhereUniqueInputObjectSchema } from './ChatSessionWhereUniqueInput.schema';
import { ChatSessionCreateWithoutOllamaOperationsInputObjectSchema as ChatSessionCreateWithoutOllamaOperationsInputObjectSchema } from './ChatSessionCreateWithoutOllamaOperationsInput.schema';
import { ChatSessionUncheckedCreateWithoutOllamaOperationsInputObjectSchema as ChatSessionUncheckedCreateWithoutOllamaOperationsInputObjectSchema } from './ChatSessionUncheckedCreateWithoutOllamaOperationsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ChatSessionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ChatSessionCreateWithoutOllamaOperationsInputObjectSchema), z.lazy(() => ChatSessionUncheckedCreateWithoutOllamaOperationsInputObjectSchema)])
}).strict();
export const ChatSessionCreateOrConnectWithoutOllamaOperationsInputObjectSchema: z.ZodType<Prisma.ChatSessionCreateOrConnectWithoutOllamaOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionCreateOrConnectWithoutOllamaOperationsInput>;
export const ChatSessionCreateOrConnectWithoutOllamaOperationsInputObjectZodSchema = makeSchema();
