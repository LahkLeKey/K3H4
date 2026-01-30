import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ChatSessionSelectObjectSchema as ChatSessionSelectObjectSchema } from './objects/ChatSessionSelect.schema';
import { ChatSessionIncludeObjectSchema as ChatSessionIncludeObjectSchema } from './objects/ChatSessionInclude.schema';
import { ChatSessionWhereUniqueInputObjectSchema as ChatSessionWhereUniqueInputObjectSchema } from './objects/ChatSessionWhereUniqueInput.schema';
import { ChatSessionCreateInputObjectSchema as ChatSessionCreateInputObjectSchema } from './objects/ChatSessionCreateInput.schema';
import { ChatSessionUncheckedCreateInputObjectSchema as ChatSessionUncheckedCreateInputObjectSchema } from './objects/ChatSessionUncheckedCreateInput.schema';
import { ChatSessionUpdateInputObjectSchema as ChatSessionUpdateInputObjectSchema } from './objects/ChatSessionUpdateInput.schema';
import { ChatSessionUncheckedUpdateInputObjectSchema as ChatSessionUncheckedUpdateInputObjectSchema } from './objects/ChatSessionUncheckedUpdateInput.schema';

export const ChatSessionUpsertOneSchema: z.ZodType<Prisma.ChatSessionUpsertArgs> = z.object({ select: ChatSessionSelectObjectSchema.optional(), include: ChatSessionIncludeObjectSchema.optional(), where: ChatSessionWhereUniqueInputObjectSchema, create: z.union([ ChatSessionCreateInputObjectSchema, ChatSessionUncheckedCreateInputObjectSchema ]), update: z.union([ ChatSessionUpdateInputObjectSchema, ChatSessionUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.ChatSessionUpsertArgs>;

export const ChatSessionUpsertOneZodSchema = z.object({ select: ChatSessionSelectObjectSchema.optional(), include: ChatSessionIncludeObjectSchema.optional(), where: ChatSessionWhereUniqueInputObjectSchema, create: z.union([ ChatSessionCreateInputObjectSchema, ChatSessionUncheckedCreateInputObjectSchema ]), update: z.union([ ChatSessionUpdateInputObjectSchema, ChatSessionUncheckedUpdateInputObjectSchema ]) }).strict();