import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageCreateWithoutSessionInputObjectSchema as ChatMessageCreateWithoutSessionInputObjectSchema } from './ChatMessageCreateWithoutSessionInput.schema';
import { ChatMessageUncheckedCreateWithoutSessionInputObjectSchema as ChatMessageUncheckedCreateWithoutSessionInputObjectSchema } from './ChatMessageUncheckedCreateWithoutSessionInput.schema';
import { ChatMessageCreateOrConnectWithoutSessionInputObjectSchema as ChatMessageCreateOrConnectWithoutSessionInputObjectSchema } from './ChatMessageCreateOrConnectWithoutSessionInput.schema';
import { ChatMessageUpsertWithWhereUniqueWithoutSessionInputObjectSchema as ChatMessageUpsertWithWhereUniqueWithoutSessionInputObjectSchema } from './ChatMessageUpsertWithWhereUniqueWithoutSessionInput.schema';
import { ChatMessageCreateManySessionInputEnvelopeObjectSchema as ChatMessageCreateManySessionInputEnvelopeObjectSchema } from './ChatMessageCreateManySessionInputEnvelope.schema';
import { ChatMessageWhereUniqueInputObjectSchema as ChatMessageWhereUniqueInputObjectSchema } from './ChatMessageWhereUniqueInput.schema';
import { ChatMessageUpdateWithWhereUniqueWithoutSessionInputObjectSchema as ChatMessageUpdateWithWhereUniqueWithoutSessionInputObjectSchema } from './ChatMessageUpdateWithWhereUniqueWithoutSessionInput.schema';
import { ChatMessageUpdateManyWithWhereWithoutSessionInputObjectSchema as ChatMessageUpdateManyWithWhereWithoutSessionInputObjectSchema } from './ChatMessageUpdateManyWithWhereWithoutSessionInput.schema';
import { ChatMessageScalarWhereInputObjectSchema as ChatMessageScalarWhereInputObjectSchema } from './ChatMessageScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ChatMessageCreateWithoutSessionInputObjectSchema), z.lazy(() => ChatMessageCreateWithoutSessionInputObjectSchema).array(), z.lazy(() => ChatMessageUncheckedCreateWithoutSessionInputObjectSchema), z.lazy(() => ChatMessageUncheckedCreateWithoutSessionInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ChatMessageCreateOrConnectWithoutSessionInputObjectSchema), z.lazy(() => ChatMessageCreateOrConnectWithoutSessionInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ChatMessageUpsertWithWhereUniqueWithoutSessionInputObjectSchema), z.lazy(() => ChatMessageUpsertWithWhereUniqueWithoutSessionInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ChatMessageCreateManySessionInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ChatMessageWhereUniqueInputObjectSchema), z.lazy(() => ChatMessageWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ChatMessageWhereUniqueInputObjectSchema), z.lazy(() => ChatMessageWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ChatMessageWhereUniqueInputObjectSchema), z.lazy(() => ChatMessageWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ChatMessageWhereUniqueInputObjectSchema), z.lazy(() => ChatMessageWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ChatMessageUpdateWithWhereUniqueWithoutSessionInputObjectSchema), z.lazy(() => ChatMessageUpdateWithWhereUniqueWithoutSessionInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ChatMessageUpdateManyWithWhereWithoutSessionInputObjectSchema), z.lazy(() => ChatMessageUpdateManyWithWhereWithoutSessionInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ChatMessageScalarWhereInputObjectSchema), z.lazy(() => ChatMessageScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ChatMessageUpdateManyWithoutSessionNestedInputObjectSchema: z.ZodType<Prisma.ChatMessageUpdateManyWithoutSessionNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatMessageUpdateManyWithoutSessionNestedInput>;
export const ChatMessageUpdateManyWithoutSessionNestedInputObjectZodSchema = makeSchema();
