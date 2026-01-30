import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ChatSessionSelectObjectSchema as ChatSessionSelectObjectSchema } from './objects/ChatSessionSelect.schema';
import { ChatSessionUpdateManyMutationInputObjectSchema as ChatSessionUpdateManyMutationInputObjectSchema } from './objects/ChatSessionUpdateManyMutationInput.schema';
import { ChatSessionWhereInputObjectSchema as ChatSessionWhereInputObjectSchema } from './objects/ChatSessionWhereInput.schema';

export const ChatSessionUpdateManyAndReturnSchema: z.ZodType<Prisma.ChatSessionUpdateManyAndReturnArgs> = z.object({ select: ChatSessionSelectObjectSchema.optional(), data: ChatSessionUpdateManyMutationInputObjectSchema, where: ChatSessionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ChatSessionUpdateManyAndReturnArgs>;

export const ChatSessionUpdateManyAndReturnZodSchema = z.object({ select: ChatSessionSelectObjectSchema.optional(), data: ChatSessionUpdateManyMutationInputObjectSchema, where: ChatSessionWhereInputObjectSchema.optional() }).strict();