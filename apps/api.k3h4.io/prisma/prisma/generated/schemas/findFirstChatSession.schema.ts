import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ChatSessionIncludeObjectSchema as ChatSessionIncludeObjectSchema } from './objects/ChatSessionInclude.schema';
import { ChatSessionOrderByWithRelationInputObjectSchema as ChatSessionOrderByWithRelationInputObjectSchema } from './objects/ChatSessionOrderByWithRelationInput.schema';
import { ChatSessionWhereInputObjectSchema as ChatSessionWhereInputObjectSchema } from './objects/ChatSessionWhereInput.schema';
import { ChatSessionWhereUniqueInputObjectSchema as ChatSessionWhereUniqueInputObjectSchema } from './objects/ChatSessionWhereUniqueInput.schema';
import { ChatSessionScalarFieldEnumSchema } from './enums/ChatSessionScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ChatSessionFindFirstSelectSchema: z.ZodType<Prisma.ChatSessionSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    title: z.boolean().optional(),
    systemPrompt: z.boolean().optional(),
    model: z.boolean().optional(),
    temperature: z.boolean().optional(),
    metadata: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    messages: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ChatSessionSelect>;

export const ChatSessionFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    title: z.boolean().optional(),
    systemPrompt: z.boolean().optional(),
    model: z.boolean().optional(),
    temperature: z.boolean().optional(),
    metadata: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    messages: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const ChatSessionFindFirstSchema: z.ZodType<Prisma.ChatSessionFindFirstArgs> = z.object({ select: ChatSessionFindFirstSelectSchema.optional(), include: z.lazy(() => ChatSessionIncludeObjectSchema.optional()), orderBy: z.union([ChatSessionOrderByWithRelationInputObjectSchema, ChatSessionOrderByWithRelationInputObjectSchema.array()]).optional(), where: ChatSessionWhereInputObjectSchema.optional(), cursor: ChatSessionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ChatSessionScalarFieldEnumSchema, ChatSessionScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ChatSessionFindFirstArgs>;

export const ChatSessionFindFirstZodSchema = z.object({ select: ChatSessionFindFirstSelectSchema.optional(), include: z.lazy(() => ChatSessionIncludeObjectSchema.optional()), orderBy: z.union([ChatSessionOrderByWithRelationInputObjectSchema, ChatSessionOrderByWithRelationInputObjectSchema.array()]).optional(), where: ChatSessionWhereInputObjectSchema.optional(), cursor: ChatSessionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ChatSessionScalarFieldEnumSchema, ChatSessionScalarFieldEnumSchema.array()]).optional() }).strict();