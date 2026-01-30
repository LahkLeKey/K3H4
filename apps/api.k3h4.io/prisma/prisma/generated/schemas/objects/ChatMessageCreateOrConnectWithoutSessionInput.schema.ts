import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageWhereUniqueInputObjectSchema as ChatMessageWhereUniqueInputObjectSchema } from './ChatMessageWhereUniqueInput.schema';
import { ChatMessageCreateWithoutSessionInputObjectSchema as ChatMessageCreateWithoutSessionInputObjectSchema } from './ChatMessageCreateWithoutSessionInput.schema';
import { ChatMessageUncheckedCreateWithoutSessionInputObjectSchema as ChatMessageUncheckedCreateWithoutSessionInputObjectSchema } from './ChatMessageUncheckedCreateWithoutSessionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ChatMessageWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ChatMessageCreateWithoutSessionInputObjectSchema), z.lazy(() => ChatMessageUncheckedCreateWithoutSessionInputObjectSchema)])
}).strict();
export const ChatMessageCreateOrConnectWithoutSessionInputObjectSchema: z.ZodType<Prisma.ChatMessageCreateOrConnectWithoutSessionInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatMessageCreateOrConnectWithoutSessionInput>;
export const ChatMessageCreateOrConnectWithoutSessionInputObjectZodSchema = makeSchema();
