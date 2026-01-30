import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatSessionCreateWithoutUserInputObjectSchema as ChatSessionCreateWithoutUserInputObjectSchema } from './ChatSessionCreateWithoutUserInput.schema';
import { ChatSessionUncheckedCreateWithoutUserInputObjectSchema as ChatSessionUncheckedCreateWithoutUserInputObjectSchema } from './ChatSessionUncheckedCreateWithoutUserInput.schema';
import { ChatSessionCreateOrConnectWithoutUserInputObjectSchema as ChatSessionCreateOrConnectWithoutUserInputObjectSchema } from './ChatSessionCreateOrConnectWithoutUserInput.schema';
import { ChatSessionUpsertWithWhereUniqueWithoutUserInputObjectSchema as ChatSessionUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './ChatSessionUpsertWithWhereUniqueWithoutUserInput.schema';
import { ChatSessionCreateManyUserInputEnvelopeObjectSchema as ChatSessionCreateManyUserInputEnvelopeObjectSchema } from './ChatSessionCreateManyUserInputEnvelope.schema';
import { ChatSessionWhereUniqueInputObjectSchema as ChatSessionWhereUniqueInputObjectSchema } from './ChatSessionWhereUniqueInput.schema';
import { ChatSessionUpdateWithWhereUniqueWithoutUserInputObjectSchema as ChatSessionUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './ChatSessionUpdateWithWhereUniqueWithoutUserInput.schema';
import { ChatSessionUpdateManyWithWhereWithoutUserInputObjectSchema as ChatSessionUpdateManyWithWhereWithoutUserInputObjectSchema } from './ChatSessionUpdateManyWithWhereWithoutUserInput.schema';
import { ChatSessionScalarWhereInputObjectSchema as ChatSessionScalarWhereInputObjectSchema } from './ChatSessionScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ChatSessionCreateWithoutUserInputObjectSchema), z.lazy(() => ChatSessionCreateWithoutUserInputObjectSchema).array(), z.lazy(() => ChatSessionUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => ChatSessionUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ChatSessionCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => ChatSessionCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ChatSessionUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => ChatSessionUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ChatSessionCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ChatSessionWhereUniqueInputObjectSchema), z.lazy(() => ChatSessionWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ChatSessionWhereUniqueInputObjectSchema), z.lazy(() => ChatSessionWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ChatSessionWhereUniqueInputObjectSchema), z.lazy(() => ChatSessionWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ChatSessionWhereUniqueInputObjectSchema), z.lazy(() => ChatSessionWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ChatSessionUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => ChatSessionUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ChatSessionUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => ChatSessionUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ChatSessionScalarWhereInputObjectSchema), z.lazy(() => ChatSessionScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ChatSessionUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.ChatSessionUncheckedUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionUncheckedUpdateManyWithoutUserNestedInput>;
export const ChatSessionUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
