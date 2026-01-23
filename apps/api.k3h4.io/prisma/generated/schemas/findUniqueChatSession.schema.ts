import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ChatSessionSelectObjectSchema as ChatSessionSelectObjectSchema } from './objects/ChatSessionSelect.schema';
import { ChatSessionIncludeObjectSchema as ChatSessionIncludeObjectSchema } from './objects/ChatSessionInclude.schema';
import { ChatSessionWhereUniqueInputObjectSchema as ChatSessionWhereUniqueInputObjectSchema } from './objects/ChatSessionWhereUniqueInput.schema';

export const ChatSessionFindUniqueSchema: z.ZodType<Prisma.ChatSessionFindUniqueArgs> = z.object({ select: ChatSessionSelectObjectSchema.optional(), include: ChatSessionIncludeObjectSchema.optional(), where: ChatSessionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ChatSessionFindUniqueArgs>;

export const ChatSessionFindUniqueZodSchema = z.object({ select: ChatSessionSelectObjectSchema.optional(), include: ChatSessionIncludeObjectSchema.optional(), where: ChatSessionWhereUniqueInputObjectSchema }).strict();