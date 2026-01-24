import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ChatSessionSelectObjectSchema as ChatSessionSelectObjectSchema } from './objects/ChatSessionSelect.schema';
import { ChatSessionCreateManyInputObjectSchema as ChatSessionCreateManyInputObjectSchema } from './objects/ChatSessionCreateManyInput.schema';

export const ChatSessionCreateManyAndReturnSchema: z.ZodType<Prisma.ChatSessionCreateManyAndReturnArgs> = z.object({ select: ChatSessionSelectObjectSchema.optional(), data: z.union([ ChatSessionCreateManyInputObjectSchema, z.array(ChatSessionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ChatSessionCreateManyAndReturnArgs>;

export const ChatSessionCreateManyAndReturnZodSchema = z.object({ select: ChatSessionSelectObjectSchema.optional(), data: z.union([ ChatSessionCreateManyInputObjectSchema, z.array(ChatSessionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();