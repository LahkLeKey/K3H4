import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ChatSessionCreateManyInputObjectSchema as ChatSessionCreateManyInputObjectSchema } from './objects/ChatSessionCreateManyInput.schema';

export const ChatSessionCreateManySchema: z.ZodType<Prisma.ChatSessionCreateManyArgs> = z.object({ data: z.union([ ChatSessionCreateManyInputObjectSchema, z.array(ChatSessionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ChatSessionCreateManyArgs>;

export const ChatSessionCreateManyZodSchema = z.object({ data: z.union([ ChatSessionCreateManyInputObjectSchema, z.array(ChatSessionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();