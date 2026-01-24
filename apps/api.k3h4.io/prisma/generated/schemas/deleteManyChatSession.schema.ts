import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ChatSessionWhereInputObjectSchema as ChatSessionWhereInputObjectSchema } from './objects/ChatSessionWhereInput.schema';

export const ChatSessionDeleteManySchema: z.ZodType<Prisma.ChatSessionDeleteManyArgs> = z.object({ where: ChatSessionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ChatSessionDeleteManyArgs>;

export const ChatSessionDeleteManyZodSchema = z.object({ where: ChatSessionWhereInputObjectSchema.optional() }).strict();