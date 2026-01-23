import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ChatMessageIncludeObjectSchema as ChatMessageIncludeObjectSchema } from './objects/ChatMessageInclude.schema';
import { ChatMessageOrderByWithRelationInputObjectSchema as ChatMessageOrderByWithRelationInputObjectSchema } from './objects/ChatMessageOrderByWithRelationInput.schema';
import { ChatMessageWhereInputObjectSchema as ChatMessageWhereInputObjectSchema } from './objects/ChatMessageWhereInput.schema';
import { ChatMessageWhereUniqueInputObjectSchema as ChatMessageWhereUniqueInputObjectSchema } from './objects/ChatMessageWhereUniqueInput.schema';
import { ChatMessageScalarFieldEnumSchema } from './enums/ChatMessageScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ChatMessageFindFirstSelectSchema: z.ZodType<Prisma.ChatMessageSelect> = z.object({
    id: z.boolean().optional(),
    sessionId: z.boolean().optional(),
    session: z.boolean().optional(),
    role: z.boolean().optional(),
    content: z.boolean().optional(),
    metadata: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ChatMessageSelect>;

export const ChatMessageFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    sessionId: z.boolean().optional(),
    session: z.boolean().optional(),
    role: z.boolean().optional(),
    content: z.boolean().optional(),
    metadata: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict();

export const ChatMessageFindFirstSchema: z.ZodType<Prisma.ChatMessageFindFirstArgs> = z.object({ select: ChatMessageFindFirstSelectSchema.optional(), include: z.lazy(() => ChatMessageIncludeObjectSchema.optional()), orderBy: z.union([ChatMessageOrderByWithRelationInputObjectSchema, ChatMessageOrderByWithRelationInputObjectSchema.array()]).optional(), where: ChatMessageWhereInputObjectSchema.optional(), cursor: ChatMessageWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ChatMessageScalarFieldEnumSchema, ChatMessageScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ChatMessageFindFirstArgs>;

export const ChatMessageFindFirstZodSchema = z.object({ select: ChatMessageFindFirstSelectSchema.optional(), include: z.lazy(() => ChatMessageIncludeObjectSchema.optional()), orderBy: z.union([ChatMessageOrderByWithRelationInputObjectSchema, ChatMessageOrderByWithRelationInputObjectSchema.array()]).optional(), where: ChatMessageWhereInputObjectSchema.optional(), cursor: ChatMessageWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ChatMessageScalarFieldEnumSchema, ChatMessageScalarFieldEnumSchema.array()]).optional() }).strict();