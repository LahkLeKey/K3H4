import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatSessionCreateWithoutMessagesInputObjectSchema as ChatSessionCreateWithoutMessagesInputObjectSchema } from './ChatSessionCreateWithoutMessagesInput.schema';
import { ChatSessionUncheckedCreateWithoutMessagesInputObjectSchema as ChatSessionUncheckedCreateWithoutMessagesInputObjectSchema } from './ChatSessionUncheckedCreateWithoutMessagesInput.schema';
import { ChatSessionCreateOrConnectWithoutMessagesInputObjectSchema as ChatSessionCreateOrConnectWithoutMessagesInputObjectSchema } from './ChatSessionCreateOrConnectWithoutMessagesInput.schema';
import { ChatSessionWhereUniqueInputObjectSchema as ChatSessionWhereUniqueInputObjectSchema } from './ChatSessionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ChatSessionCreateWithoutMessagesInputObjectSchema), z.lazy(() => ChatSessionUncheckedCreateWithoutMessagesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ChatSessionCreateOrConnectWithoutMessagesInputObjectSchema).optional(),
  connect: z.lazy(() => ChatSessionWhereUniqueInputObjectSchema).optional()
}).strict();
export const ChatSessionCreateNestedOneWithoutMessagesInputObjectSchema: z.ZodType<Prisma.ChatSessionCreateNestedOneWithoutMessagesInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionCreateNestedOneWithoutMessagesInput>;
export const ChatSessionCreateNestedOneWithoutMessagesInputObjectZodSchema = makeSchema();
