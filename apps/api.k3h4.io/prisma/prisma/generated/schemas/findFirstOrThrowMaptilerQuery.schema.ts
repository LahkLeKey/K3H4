import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MaptilerQueryIncludeObjectSchema as MaptilerQueryIncludeObjectSchema } from './objects/MaptilerQueryInclude.schema';
import { MaptilerQueryOrderByWithRelationInputObjectSchema as MaptilerQueryOrderByWithRelationInputObjectSchema } from './objects/MaptilerQueryOrderByWithRelationInput.schema';
import { MaptilerQueryWhereInputObjectSchema as MaptilerQueryWhereInputObjectSchema } from './objects/MaptilerQueryWhereInput.schema';
import { MaptilerQueryWhereUniqueInputObjectSchema as MaptilerQueryWhereUniqueInputObjectSchema } from './objects/MaptilerQueryWhereUniqueInput.schema';
import { MaptilerQueryScalarFieldEnumSchema } from './enums/MaptilerQueryScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const MaptilerQueryFindFirstOrThrowSelectSchema: z.ZodType<Prisma.MaptilerQuerySelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    actorId: z.boolean().optional(),
    actor: z.boolean().optional(),
    signature: z.boolean().optional(),
    kind: z.boolean().optional(),
    path: z.boolean().optional(),
    params: z.boolean().optional(),
    lastUsedAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    cacheEntries: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.MaptilerQuerySelect>;

export const MaptilerQueryFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    actorId: z.boolean().optional(),
    actor: z.boolean().optional(),
    signature: z.boolean().optional(),
    kind: z.boolean().optional(),
    path: z.boolean().optional(),
    params: z.boolean().optional(),
    lastUsedAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    cacheEntries: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const MaptilerQueryFindFirstOrThrowSchema: z.ZodType<Prisma.MaptilerQueryFindFirstOrThrowArgs> = z.object({ select: MaptilerQueryFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => MaptilerQueryIncludeObjectSchema.optional()), orderBy: z.union([MaptilerQueryOrderByWithRelationInputObjectSchema, MaptilerQueryOrderByWithRelationInputObjectSchema.array()]).optional(), where: MaptilerQueryWhereInputObjectSchema.optional(), cursor: MaptilerQueryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([MaptilerQueryScalarFieldEnumSchema, MaptilerQueryScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.MaptilerQueryFindFirstOrThrowArgs>;

export const MaptilerQueryFindFirstOrThrowZodSchema = z.object({ select: MaptilerQueryFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => MaptilerQueryIncludeObjectSchema.optional()), orderBy: z.union([MaptilerQueryOrderByWithRelationInputObjectSchema, MaptilerQueryOrderByWithRelationInputObjectSchema.array()]).optional(), where: MaptilerQueryWhereInputObjectSchema.optional(), cursor: MaptilerQueryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([MaptilerQueryScalarFieldEnumSchema, MaptilerQueryScalarFieldEnumSchema.array()]).optional() }).strict();