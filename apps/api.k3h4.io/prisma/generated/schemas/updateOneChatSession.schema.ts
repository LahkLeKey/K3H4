import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ChatSessionSelectObjectSchema as ChatSessionSelectObjectSchema } from './objects/ChatSessionSelect.schema';
import { ChatSessionIncludeObjectSchema as ChatSessionIncludeObjectSchema } from './objects/ChatSessionInclude.schema';
import { ChatSessionUpdateInputObjectSchema as ChatSessionUpdateInputObjectSchema } from './objects/ChatSessionUpdateInput.schema';
import { ChatSessionUncheckedUpdateInputObjectSchema as ChatSessionUncheckedUpdateInputObjectSchema } from './objects/ChatSessionUncheckedUpdateInput.schema';
import { ChatSessionWhereUniqueInputObjectSchema as ChatSessionWhereUniqueInputObjectSchema } from './objects/ChatSessionWhereUniqueInput.schema';

export const ChatSessionUpdateOneSchema: z.ZodType<Prisma.ChatSessionUpdateArgs> = z.object({ select: ChatSessionSelectObjectSchema.optional(), include: ChatSessionIncludeObjectSchema.optional(), data: z.union([ChatSessionUpdateInputObjectSchema, ChatSessionUncheckedUpdateInputObjectSchema]), where: ChatSessionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ChatSessionUpdateArgs>;

export const ChatSessionUpdateOneZodSchema = z.object({ select: ChatSessionSelectObjectSchema.optional(), include: ChatSessionIncludeObjectSchema.optional(), data: z.union([ChatSessionUpdateInputObjectSchema, ChatSessionUncheckedUpdateInputObjectSchema]), where: ChatSessionWhereUniqueInputObjectSchema }).strict();