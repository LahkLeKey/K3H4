import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatSessionWhereInputObjectSchema as ChatSessionWhereInputObjectSchema } from './ChatSessionWhereInput.schema';
import { ChatSessionUpdateWithoutMessagesInputObjectSchema as ChatSessionUpdateWithoutMessagesInputObjectSchema } from './ChatSessionUpdateWithoutMessagesInput.schema';
import { ChatSessionUncheckedUpdateWithoutMessagesInputObjectSchema as ChatSessionUncheckedUpdateWithoutMessagesInputObjectSchema } from './ChatSessionUncheckedUpdateWithoutMessagesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ChatSessionWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ChatSessionUpdateWithoutMessagesInputObjectSchema), z.lazy(() => ChatSessionUncheckedUpdateWithoutMessagesInputObjectSchema)])
}).strict();
export const ChatSessionUpdateToOneWithWhereWithoutMessagesInputObjectSchema: z.ZodType<Prisma.ChatSessionUpdateToOneWithWhereWithoutMessagesInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionUpdateToOneWithWhereWithoutMessagesInput>;
export const ChatSessionUpdateToOneWithWhereWithoutMessagesInputObjectZodSchema = makeSchema();
