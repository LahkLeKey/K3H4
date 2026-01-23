import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageWhereUniqueInputObjectSchema as ChatMessageWhereUniqueInputObjectSchema } from './ChatMessageWhereUniqueInput.schema';
import { ChatMessageUpdateWithoutSessionInputObjectSchema as ChatMessageUpdateWithoutSessionInputObjectSchema } from './ChatMessageUpdateWithoutSessionInput.schema';
import { ChatMessageUncheckedUpdateWithoutSessionInputObjectSchema as ChatMessageUncheckedUpdateWithoutSessionInputObjectSchema } from './ChatMessageUncheckedUpdateWithoutSessionInput.schema';
import { ChatMessageCreateWithoutSessionInputObjectSchema as ChatMessageCreateWithoutSessionInputObjectSchema } from './ChatMessageCreateWithoutSessionInput.schema';
import { ChatMessageUncheckedCreateWithoutSessionInputObjectSchema as ChatMessageUncheckedCreateWithoutSessionInputObjectSchema } from './ChatMessageUncheckedCreateWithoutSessionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ChatMessageWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ChatMessageUpdateWithoutSessionInputObjectSchema), z.lazy(() => ChatMessageUncheckedUpdateWithoutSessionInputObjectSchema)]),
  create: z.union([z.lazy(() => ChatMessageCreateWithoutSessionInputObjectSchema), z.lazy(() => ChatMessageUncheckedCreateWithoutSessionInputObjectSchema)])
}).strict();
export const ChatMessageUpsertWithWhereUniqueWithoutSessionInputObjectSchema: z.ZodType<Prisma.ChatMessageUpsertWithWhereUniqueWithoutSessionInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatMessageUpsertWithWhereUniqueWithoutSessionInput>;
export const ChatMessageUpsertWithWhereUniqueWithoutSessionInputObjectZodSchema = makeSchema();
