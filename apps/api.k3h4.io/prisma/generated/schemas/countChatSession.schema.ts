import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ChatSessionOrderByWithRelationInputObjectSchema as ChatSessionOrderByWithRelationInputObjectSchema } from './objects/ChatSessionOrderByWithRelationInput.schema';
import { ChatSessionWhereInputObjectSchema as ChatSessionWhereInputObjectSchema } from './objects/ChatSessionWhereInput.schema';
import { ChatSessionWhereUniqueInputObjectSchema as ChatSessionWhereUniqueInputObjectSchema } from './objects/ChatSessionWhereUniqueInput.schema';
import { ChatSessionCountAggregateInputObjectSchema as ChatSessionCountAggregateInputObjectSchema } from './objects/ChatSessionCountAggregateInput.schema';

export const ChatSessionCountSchema: z.ZodType<Prisma.ChatSessionCountArgs> = z.object({ orderBy: z.union([ChatSessionOrderByWithRelationInputObjectSchema, ChatSessionOrderByWithRelationInputObjectSchema.array()]).optional(), where: ChatSessionWhereInputObjectSchema.optional(), cursor: ChatSessionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ChatSessionCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.ChatSessionCountArgs>;

export const ChatSessionCountZodSchema = z.object({ orderBy: z.union([ChatSessionOrderByWithRelationInputObjectSchema, ChatSessionOrderByWithRelationInputObjectSchema.array()]).optional(), where: ChatSessionWhereInputObjectSchema.optional(), cursor: ChatSessionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ChatSessionCountAggregateInputObjectSchema ]).optional() }).strict();