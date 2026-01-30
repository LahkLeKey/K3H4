import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ChatSessionSelectObjectSchema as ChatSessionSelectObjectSchema } from './objects/ChatSessionSelect.schema';
import { ChatSessionIncludeObjectSchema as ChatSessionIncludeObjectSchema } from './objects/ChatSessionInclude.schema';
import { ChatSessionWhereUniqueInputObjectSchema as ChatSessionWhereUniqueInputObjectSchema } from './objects/ChatSessionWhereUniqueInput.schema';

export const ChatSessionDeleteOneSchema: z.ZodType<Prisma.ChatSessionDeleteArgs> = z.object({ select: ChatSessionSelectObjectSchema.optional(), include: ChatSessionIncludeObjectSchema.optional(), where: ChatSessionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ChatSessionDeleteArgs>;

export const ChatSessionDeleteOneZodSchema = z.object({ select: ChatSessionSelectObjectSchema.optional(), include: ChatSessionIncludeObjectSchema.optional(), where: ChatSessionWhereUniqueInputObjectSchema }).strict();