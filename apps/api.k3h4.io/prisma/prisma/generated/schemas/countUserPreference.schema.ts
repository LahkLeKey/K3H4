import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserPreferenceOrderByWithRelationInputObjectSchema as UserPreferenceOrderByWithRelationInputObjectSchema } from './objects/UserPreferenceOrderByWithRelationInput.schema';
import { UserPreferenceWhereInputObjectSchema as UserPreferenceWhereInputObjectSchema } from './objects/UserPreferenceWhereInput.schema';
import { UserPreferenceWhereUniqueInputObjectSchema as UserPreferenceWhereUniqueInputObjectSchema } from './objects/UserPreferenceWhereUniqueInput.schema';
import { UserPreferenceCountAggregateInputObjectSchema as UserPreferenceCountAggregateInputObjectSchema } from './objects/UserPreferenceCountAggregateInput.schema';

export const UserPreferenceCountSchema: z.ZodType<Prisma.UserPreferenceCountArgs> = z.object({ orderBy: z.union([UserPreferenceOrderByWithRelationInputObjectSchema, UserPreferenceOrderByWithRelationInputObjectSchema.array()]).optional(), where: UserPreferenceWhereInputObjectSchema.optional(), cursor: UserPreferenceWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), UserPreferenceCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.UserPreferenceCountArgs>;

export const UserPreferenceCountZodSchema = z.object({ orderBy: z.union([UserPreferenceOrderByWithRelationInputObjectSchema, UserPreferenceOrderByWithRelationInputObjectSchema.array()]).optional(), where: UserPreferenceWhereInputObjectSchema.optional(), cursor: UserPreferenceWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), UserPreferenceCountAggregateInputObjectSchema ]).optional() }).strict();