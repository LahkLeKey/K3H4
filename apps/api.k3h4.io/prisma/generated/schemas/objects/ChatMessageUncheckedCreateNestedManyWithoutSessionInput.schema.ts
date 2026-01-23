import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageCreateWithoutSessionInputObjectSchema as ChatMessageCreateWithoutSessionInputObjectSchema } from './ChatMessageCreateWithoutSessionInput.schema';
import { ChatMessageUncheckedCreateWithoutSessionInputObjectSchema as ChatMessageUncheckedCreateWithoutSessionInputObjectSchema } from './ChatMessageUncheckedCreateWithoutSessionInput.schema';
import { ChatMessageCreateOrConnectWithoutSessionInputObjectSchema as ChatMessageCreateOrConnectWithoutSessionInputObjectSchema } from './ChatMessageCreateOrConnectWithoutSessionInput.schema';
import { ChatMessageCreateManySessionInputEnvelopeObjectSchema as ChatMessageCreateManySessionInputEnvelopeObjectSchema } from './ChatMessageCreateManySessionInputEnvelope.schema';
import { ChatMessageWhereUniqueInputObjectSchema as ChatMessageWhereUniqueInputObjectSchema } from './ChatMessageWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ChatMessageCreateWithoutSessionInputObjectSchema), z.lazy(() => ChatMessageCreateWithoutSessionInputObjectSchema).array(), z.lazy(() => ChatMessageUncheckedCreateWithoutSessionInputObjectSchema), z.lazy(() => ChatMessageUncheckedCreateWithoutSessionInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ChatMessageCreateOrConnectWithoutSessionInputObjectSchema), z.lazy(() => ChatMessageCreateOrConnectWithoutSessionInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ChatMessageCreateManySessionInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ChatMessageWhereUniqueInputObjectSchema), z.lazy(() => ChatMessageWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ChatMessageUncheckedCreateNestedManyWithoutSessionInputObjectSchema: z.ZodType<Prisma.ChatMessageUncheckedCreateNestedManyWithoutSessionInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatMessageUncheckedCreateNestedManyWithoutSessionInput>;
export const ChatMessageUncheckedCreateNestedManyWithoutSessionInputObjectZodSchema = makeSchema();
