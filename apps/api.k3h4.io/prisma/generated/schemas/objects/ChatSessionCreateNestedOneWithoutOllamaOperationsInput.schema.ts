import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatSessionCreateWithoutOllamaOperationsInputObjectSchema as ChatSessionCreateWithoutOllamaOperationsInputObjectSchema } from './ChatSessionCreateWithoutOllamaOperationsInput.schema';
import { ChatSessionUncheckedCreateWithoutOllamaOperationsInputObjectSchema as ChatSessionUncheckedCreateWithoutOllamaOperationsInputObjectSchema } from './ChatSessionUncheckedCreateWithoutOllamaOperationsInput.schema';
import { ChatSessionCreateOrConnectWithoutOllamaOperationsInputObjectSchema as ChatSessionCreateOrConnectWithoutOllamaOperationsInputObjectSchema } from './ChatSessionCreateOrConnectWithoutOllamaOperationsInput.schema';
import { ChatSessionWhereUniqueInputObjectSchema as ChatSessionWhereUniqueInputObjectSchema } from './ChatSessionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ChatSessionCreateWithoutOllamaOperationsInputObjectSchema), z.lazy(() => ChatSessionUncheckedCreateWithoutOllamaOperationsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ChatSessionCreateOrConnectWithoutOllamaOperationsInputObjectSchema).optional(),
  connect: z.lazy(() => ChatSessionWhereUniqueInputObjectSchema).optional()
}).strict();
export const ChatSessionCreateNestedOneWithoutOllamaOperationsInputObjectSchema: z.ZodType<Prisma.ChatSessionCreateNestedOneWithoutOllamaOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionCreateNestedOneWithoutOllamaOperationsInput>;
export const ChatSessionCreateNestedOneWithoutOllamaOperationsInputObjectZodSchema = makeSchema();
