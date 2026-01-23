import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatSessionUpdateWithoutMessagesInputObjectSchema as ChatSessionUpdateWithoutMessagesInputObjectSchema } from './ChatSessionUpdateWithoutMessagesInput.schema';
import { ChatSessionUncheckedUpdateWithoutMessagesInputObjectSchema as ChatSessionUncheckedUpdateWithoutMessagesInputObjectSchema } from './ChatSessionUncheckedUpdateWithoutMessagesInput.schema';
import { ChatSessionCreateWithoutMessagesInputObjectSchema as ChatSessionCreateWithoutMessagesInputObjectSchema } from './ChatSessionCreateWithoutMessagesInput.schema';
import { ChatSessionUncheckedCreateWithoutMessagesInputObjectSchema as ChatSessionUncheckedCreateWithoutMessagesInputObjectSchema } from './ChatSessionUncheckedCreateWithoutMessagesInput.schema';
import { ChatSessionWhereInputObjectSchema as ChatSessionWhereInputObjectSchema } from './ChatSessionWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ChatSessionUpdateWithoutMessagesInputObjectSchema), z.lazy(() => ChatSessionUncheckedUpdateWithoutMessagesInputObjectSchema)]),
  create: z.union([z.lazy(() => ChatSessionCreateWithoutMessagesInputObjectSchema), z.lazy(() => ChatSessionUncheckedCreateWithoutMessagesInputObjectSchema)]),
  where: z.lazy(() => ChatSessionWhereInputObjectSchema).optional()
}).strict();
export const ChatSessionUpsertWithoutMessagesInputObjectSchema: z.ZodType<Prisma.ChatSessionUpsertWithoutMessagesInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionUpsertWithoutMessagesInput>;
export const ChatSessionUpsertWithoutMessagesInputObjectZodSchema = makeSchema();
