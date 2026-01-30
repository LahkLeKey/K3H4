import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatSessionCreateWithoutUserInputObjectSchema as ChatSessionCreateWithoutUserInputObjectSchema } from './ChatSessionCreateWithoutUserInput.schema';
import { ChatSessionUncheckedCreateWithoutUserInputObjectSchema as ChatSessionUncheckedCreateWithoutUserInputObjectSchema } from './ChatSessionUncheckedCreateWithoutUserInput.schema';
import { ChatSessionCreateOrConnectWithoutUserInputObjectSchema as ChatSessionCreateOrConnectWithoutUserInputObjectSchema } from './ChatSessionCreateOrConnectWithoutUserInput.schema';
import { ChatSessionCreateManyUserInputEnvelopeObjectSchema as ChatSessionCreateManyUserInputEnvelopeObjectSchema } from './ChatSessionCreateManyUserInputEnvelope.schema';
import { ChatSessionWhereUniqueInputObjectSchema as ChatSessionWhereUniqueInputObjectSchema } from './ChatSessionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ChatSessionCreateWithoutUserInputObjectSchema), z.lazy(() => ChatSessionCreateWithoutUserInputObjectSchema).array(), z.lazy(() => ChatSessionUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => ChatSessionUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ChatSessionCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => ChatSessionCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ChatSessionCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ChatSessionWhereUniqueInputObjectSchema), z.lazy(() => ChatSessionWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ChatSessionCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.ChatSessionCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionCreateNestedManyWithoutUserInput>;
export const ChatSessionCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
