import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatSessionWhereUniqueInputObjectSchema as ChatSessionWhereUniqueInputObjectSchema } from './ChatSessionWhereUniqueInput.schema';
import { ChatSessionUpdateWithoutUserInputObjectSchema as ChatSessionUpdateWithoutUserInputObjectSchema } from './ChatSessionUpdateWithoutUserInput.schema';
import { ChatSessionUncheckedUpdateWithoutUserInputObjectSchema as ChatSessionUncheckedUpdateWithoutUserInputObjectSchema } from './ChatSessionUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ChatSessionWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ChatSessionUpdateWithoutUserInputObjectSchema), z.lazy(() => ChatSessionUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const ChatSessionUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.ChatSessionUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionUpdateWithWhereUniqueWithoutUserInput>;
export const ChatSessionUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
