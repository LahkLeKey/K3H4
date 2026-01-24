import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatSessionWhereUniqueInputObjectSchema as ChatSessionWhereUniqueInputObjectSchema } from './ChatSessionWhereUniqueInput.schema';
import { ChatSessionCreateWithoutUserInputObjectSchema as ChatSessionCreateWithoutUserInputObjectSchema } from './ChatSessionCreateWithoutUserInput.schema';
import { ChatSessionUncheckedCreateWithoutUserInputObjectSchema as ChatSessionUncheckedCreateWithoutUserInputObjectSchema } from './ChatSessionUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ChatSessionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ChatSessionCreateWithoutUserInputObjectSchema), z.lazy(() => ChatSessionUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const ChatSessionCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.ChatSessionCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionCreateOrConnectWithoutUserInput>;
export const ChatSessionCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
