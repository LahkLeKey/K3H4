import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatSessionCreateWithoutMessagesInputObjectSchema as ChatSessionCreateWithoutMessagesInputObjectSchema } from './ChatSessionCreateWithoutMessagesInput.schema';
import { ChatSessionUncheckedCreateWithoutMessagesInputObjectSchema as ChatSessionUncheckedCreateWithoutMessagesInputObjectSchema } from './ChatSessionUncheckedCreateWithoutMessagesInput.schema';
import { ChatSessionCreateOrConnectWithoutMessagesInputObjectSchema as ChatSessionCreateOrConnectWithoutMessagesInputObjectSchema } from './ChatSessionCreateOrConnectWithoutMessagesInput.schema';
import { ChatSessionUpsertWithoutMessagesInputObjectSchema as ChatSessionUpsertWithoutMessagesInputObjectSchema } from './ChatSessionUpsertWithoutMessagesInput.schema';
import { ChatSessionWhereUniqueInputObjectSchema as ChatSessionWhereUniqueInputObjectSchema } from './ChatSessionWhereUniqueInput.schema';
import { ChatSessionUpdateToOneWithWhereWithoutMessagesInputObjectSchema as ChatSessionUpdateToOneWithWhereWithoutMessagesInputObjectSchema } from './ChatSessionUpdateToOneWithWhereWithoutMessagesInput.schema';
import { ChatSessionUpdateWithoutMessagesInputObjectSchema as ChatSessionUpdateWithoutMessagesInputObjectSchema } from './ChatSessionUpdateWithoutMessagesInput.schema';
import { ChatSessionUncheckedUpdateWithoutMessagesInputObjectSchema as ChatSessionUncheckedUpdateWithoutMessagesInputObjectSchema } from './ChatSessionUncheckedUpdateWithoutMessagesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ChatSessionCreateWithoutMessagesInputObjectSchema), z.lazy(() => ChatSessionUncheckedCreateWithoutMessagesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ChatSessionCreateOrConnectWithoutMessagesInputObjectSchema).optional(),
  upsert: z.lazy(() => ChatSessionUpsertWithoutMessagesInputObjectSchema).optional(),
  connect: z.lazy(() => ChatSessionWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ChatSessionUpdateToOneWithWhereWithoutMessagesInputObjectSchema), z.lazy(() => ChatSessionUpdateWithoutMessagesInputObjectSchema), z.lazy(() => ChatSessionUncheckedUpdateWithoutMessagesInputObjectSchema)]).optional()
}).strict();
export const ChatSessionUpdateOneRequiredWithoutMessagesNestedInputObjectSchema: z.ZodType<Prisma.ChatSessionUpdateOneRequiredWithoutMessagesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionUpdateOneRequiredWithoutMessagesNestedInput>;
export const ChatSessionUpdateOneRequiredWithoutMessagesNestedInputObjectZodSchema = makeSchema();
