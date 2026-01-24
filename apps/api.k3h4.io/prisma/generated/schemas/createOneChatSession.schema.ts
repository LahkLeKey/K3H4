import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ChatSessionSelectObjectSchema as ChatSessionSelectObjectSchema } from './objects/ChatSessionSelect.schema';
import { ChatSessionIncludeObjectSchema as ChatSessionIncludeObjectSchema } from './objects/ChatSessionInclude.schema';
import { ChatSessionCreateInputObjectSchema as ChatSessionCreateInputObjectSchema } from './objects/ChatSessionCreateInput.schema';
import { ChatSessionUncheckedCreateInputObjectSchema as ChatSessionUncheckedCreateInputObjectSchema } from './objects/ChatSessionUncheckedCreateInput.schema';

export const ChatSessionCreateOneSchema: z.ZodType<Prisma.ChatSessionCreateArgs> = z.object({ select: ChatSessionSelectObjectSchema.optional(), include: ChatSessionIncludeObjectSchema.optional(), data: z.union([ChatSessionCreateInputObjectSchema, ChatSessionUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.ChatSessionCreateArgs>;

export const ChatSessionCreateOneZodSchema = z.object({ select: ChatSessionSelectObjectSchema.optional(), include: ChatSessionIncludeObjectSchema.optional(), data: z.union([ChatSessionCreateInputObjectSchema, ChatSessionUncheckedCreateInputObjectSchema]) }).strict();