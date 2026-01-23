import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageScalarWhereInputObjectSchema as ChatMessageScalarWhereInputObjectSchema } from './ChatMessageScalarWhereInput.schema';
import { ChatMessageUpdateManyMutationInputObjectSchema as ChatMessageUpdateManyMutationInputObjectSchema } from './ChatMessageUpdateManyMutationInput.schema';
import { ChatMessageUncheckedUpdateManyWithoutSessionInputObjectSchema as ChatMessageUncheckedUpdateManyWithoutSessionInputObjectSchema } from './ChatMessageUncheckedUpdateManyWithoutSessionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ChatMessageScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ChatMessageUpdateManyMutationInputObjectSchema), z.lazy(() => ChatMessageUncheckedUpdateManyWithoutSessionInputObjectSchema)])
}).strict();
export const ChatMessageUpdateManyWithWhereWithoutSessionInputObjectSchema: z.ZodType<Prisma.ChatMessageUpdateManyWithWhereWithoutSessionInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatMessageUpdateManyWithWhereWithoutSessionInput>;
export const ChatMessageUpdateManyWithWhereWithoutSessionInputObjectZodSchema = makeSchema();
