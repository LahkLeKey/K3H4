import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatSessionCreateWithoutOllamaOperationsInputObjectSchema as ChatSessionCreateWithoutOllamaOperationsInputObjectSchema } from './ChatSessionCreateWithoutOllamaOperationsInput.schema';
import { ChatSessionUncheckedCreateWithoutOllamaOperationsInputObjectSchema as ChatSessionUncheckedCreateWithoutOllamaOperationsInputObjectSchema } from './ChatSessionUncheckedCreateWithoutOllamaOperationsInput.schema';
import { ChatSessionCreateOrConnectWithoutOllamaOperationsInputObjectSchema as ChatSessionCreateOrConnectWithoutOllamaOperationsInputObjectSchema } from './ChatSessionCreateOrConnectWithoutOllamaOperationsInput.schema';
import { ChatSessionUpsertWithoutOllamaOperationsInputObjectSchema as ChatSessionUpsertWithoutOllamaOperationsInputObjectSchema } from './ChatSessionUpsertWithoutOllamaOperationsInput.schema';
import { ChatSessionWhereInputObjectSchema as ChatSessionWhereInputObjectSchema } from './ChatSessionWhereInput.schema';
import { ChatSessionWhereUniqueInputObjectSchema as ChatSessionWhereUniqueInputObjectSchema } from './ChatSessionWhereUniqueInput.schema';
import { ChatSessionUpdateToOneWithWhereWithoutOllamaOperationsInputObjectSchema as ChatSessionUpdateToOneWithWhereWithoutOllamaOperationsInputObjectSchema } from './ChatSessionUpdateToOneWithWhereWithoutOllamaOperationsInput.schema';
import { ChatSessionUpdateWithoutOllamaOperationsInputObjectSchema as ChatSessionUpdateWithoutOllamaOperationsInputObjectSchema } from './ChatSessionUpdateWithoutOllamaOperationsInput.schema';
import { ChatSessionUncheckedUpdateWithoutOllamaOperationsInputObjectSchema as ChatSessionUncheckedUpdateWithoutOllamaOperationsInputObjectSchema } from './ChatSessionUncheckedUpdateWithoutOllamaOperationsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ChatSessionCreateWithoutOllamaOperationsInputObjectSchema), z.lazy(() => ChatSessionUncheckedCreateWithoutOllamaOperationsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ChatSessionCreateOrConnectWithoutOllamaOperationsInputObjectSchema).optional(),
  upsert: z.lazy(() => ChatSessionUpsertWithoutOllamaOperationsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => ChatSessionWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => ChatSessionWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => ChatSessionWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ChatSessionUpdateToOneWithWhereWithoutOllamaOperationsInputObjectSchema), z.lazy(() => ChatSessionUpdateWithoutOllamaOperationsInputObjectSchema), z.lazy(() => ChatSessionUncheckedUpdateWithoutOllamaOperationsInputObjectSchema)]).optional()
}).strict();
export const ChatSessionUpdateOneWithoutOllamaOperationsNestedInputObjectSchema: z.ZodType<Prisma.ChatSessionUpdateOneWithoutOllamaOperationsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionUpdateOneWithoutOllamaOperationsNestedInput>;
export const ChatSessionUpdateOneWithoutOllamaOperationsNestedInputObjectZodSchema = makeSchema();
