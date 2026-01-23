import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatSessionWhereUniqueInputObjectSchema as ChatSessionWhereUniqueInputObjectSchema } from './ChatSessionWhereUniqueInput.schema';
import { ChatSessionUpdateWithoutUserInputObjectSchema as ChatSessionUpdateWithoutUserInputObjectSchema } from './ChatSessionUpdateWithoutUserInput.schema';
import { ChatSessionUncheckedUpdateWithoutUserInputObjectSchema as ChatSessionUncheckedUpdateWithoutUserInputObjectSchema } from './ChatSessionUncheckedUpdateWithoutUserInput.schema';
import { ChatSessionCreateWithoutUserInputObjectSchema as ChatSessionCreateWithoutUserInputObjectSchema } from './ChatSessionCreateWithoutUserInput.schema';
import { ChatSessionUncheckedCreateWithoutUserInputObjectSchema as ChatSessionUncheckedCreateWithoutUserInputObjectSchema } from './ChatSessionUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ChatSessionWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ChatSessionUpdateWithoutUserInputObjectSchema), z.lazy(() => ChatSessionUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => ChatSessionCreateWithoutUserInputObjectSchema), z.lazy(() => ChatSessionUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const ChatSessionUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.ChatSessionUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionUpsertWithWhereUniqueWithoutUserInput>;
export const ChatSessionUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
