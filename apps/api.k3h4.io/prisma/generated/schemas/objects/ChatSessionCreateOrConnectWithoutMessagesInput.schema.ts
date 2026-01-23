import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatSessionWhereUniqueInputObjectSchema as ChatSessionWhereUniqueInputObjectSchema } from './ChatSessionWhereUniqueInput.schema';
import { ChatSessionCreateWithoutMessagesInputObjectSchema as ChatSessionCreateWithoutMessagesInputObjectSchema } from './ChatSessionCreateWithoutMessagesInput.schema';
import { ChatSessionUncheckedCreateWithoutMessagesInputObjectSchema as ChatSessionUncheckedCreateWithoutMessagesInputObjectSchema } from './ChatSessionUncheckedCreateWithoutMessagesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ChatSessionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ChatSessionCreateWithoutMessagesInputObjectSchema), z.lazy(() => ChatSessionUncheckedCreateWithoutMessagesInputObjectSchema)])
}).strict();
export const ChatSessionCreateOrConnectWithoutMessagesInputObjectSchema: z.ZodType<Prisma.ChatSessionCreateOrConnectWithoutMessagesInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionCreateOrConnectWithoutMessagesInput>;
export const ChatSessionCreateOrConnectWithoutMessagesInputObjectZodSchema = makeSchema();
