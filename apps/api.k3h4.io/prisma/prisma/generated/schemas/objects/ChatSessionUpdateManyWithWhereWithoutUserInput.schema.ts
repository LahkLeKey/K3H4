import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatSessionScalarWhereInputObjectSchema as ChatSessionScalarWhereInputObjectSchema } from './ChatSessionScalarWhereInput.schema';
import { ChatSessionUpdateManyMutationInputObjectSchema as ChatSessionUpdateManyMutationInputObjectSchema } from './ChatSessionUpdateManyMutationInput.schema';
import { ChatSessionUncheckedUpdateManyWithoutUserInputObjectSchema as ChatSessionUncheckedUpdateManyWithoutUserInputObjectSchema } from './ChatSessionUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ChatSessionScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ChatSessionUpdateManyMutationInputObjectSchema), z.lazy(() => ChatSessionUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const ChatSessionUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.ChatSessionUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionUpdateManyWithWhereWithoutUserInput>;
export const ChatSessionUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
