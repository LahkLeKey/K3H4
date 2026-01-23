import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ChatSessionUpdateManyMutationInputObjectSchema as ChatSessionUpdateManyMutationInputObjectSchema } from './objects/ChatSessionUpdateManyMutationInput.schema';
import { ChatSessionWhereInputObjectSchema as ChatSessionWhereInputObjectSchema } from './objects/ChatSessionWhereInput.schema';

export const ChatSessionUpdateManySchema: z.ZodType<Prisma.ChatSessionUpdateManyArgs> = z.object({ data: ChatSessionUpdateManyMutationInputObjectSchema, where: ChatSessionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ChatSessionUpdateManyArgs>;

export const ChatSessionUpdateManyZodSchema = z.object({ data: ChatSessionUpdateManyMutationInputObjectSchema, where: ChatSessionWhereInputObjectSchema.optional() }).strict();