import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageWhereUniqueInputObjectSchema as ChatMessageWhereUniqueInputObjectSchema } from './ChatMessageWhereUniqueInput.schema';
import { ChatMessageUpdateWithoutSessionInputObjectSchema as ChatMessageUpdateWithoutSessionInputObjectSchema } from './ChatMessageUpdateWithoutSessionInput.schema';
import { ChatMessageUncheckedUpdateWithoutSessionInputObjectSchema as ChatMessageUncheckedUpdateWithoutSessionInputObjectSchema } from './ChatMessageUncheckedUpdateWithoutSessionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ChatMessageWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ChatMessageUpdateWithoutSessionInputObjectSchema), z.lazy(() => ChatMessageUncheckedUpdateWithoutSessionInputObjectSchema)])
}).strict();
export const ChatMessageUpdateWithWhereUniqueWithoutSessionInputObjectSchema: z.ZodType<Prisma.ChatMessageUpdateWithWhereUniqueWithoutSessionInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatMessageUpdateWithWhereUniqueWithoutSessionInput>;
export const ChatMessageUpdateWithWhereUniqueWithoutSessionInputObjectZodSchema = makeSchema();
