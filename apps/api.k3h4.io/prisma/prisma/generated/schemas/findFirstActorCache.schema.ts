import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActorCacheIncludeObjectSchema as ActorCacheIncludeObjectSchema } from './objects/ActorCacheInclude.schema';
import { ActorCacheOrderByWithRelationInputObjectSchema as ActorCacheOrderByWithRelationInputObjectSchema } from './objects/ActorCacheOrderByWithRelationInput.schema';
import { ActorCacheWhereInputObjectSchema as ActorCacheWhereInputObjectSchema } from './objects/ActorCacheWhereInput.schema';
import { ActorCacheWhereUniqueInputObjectSchema as ActorCacheWhereUniqueInputObjectSchema } from './objects/ActorCacheWhereUniqueInput.schema';
import { ActorCacheScalarFieldEnumSchema } from './enums/ActorCacheScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ActorCacheFindFirstSelectSchema: z.ZodType<Prisma.ActorCacheSelect> = z.object({
    id: z.boolean().optional(),
    actorId: z.boolean().optional(),
    actor: z.boolean().optional(),
    key: z.boolean().optional(),
    payload: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ActorCacheSelect>;

export const ActorCacheFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    actorId: z.boolean().optional(),
    actor: z.boolean().optional(),
    key: z.boolean().optional(),
    payload: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const ActorCacheFindFirstSchema: z.ZodType<Prisma.ActorCacheFindFirstArgs> = z.object({ select: ActorCacheFindFirstSelectSchema.optional(), include: z.lazy(() => ActorCacheIncludeObjectSchema.optional()), orderBy: z.union([ActorCacheOrderByWithRelationInputObjectSchema, ActorCacheOrderByWithRelationInputObjectSchema.array()]).optional(), where: ActorCacheWhereInputObjectSchema.optional(), cursor: ActorCacheWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ActorCacheScalarFieldEnumSchema, ActorCacheScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ActorCacheFindFirstArgs>;

export const ActorCacheFindFirstZodSchema = z.object({ select: ActorCacheFindFirstSelectSchema.optional(), include: z.lazy(() => ActorCacheIncludeObjectSchema.optional()), orderBy: z.union([ActorCacheOrderByWithRelationInputObjectSchema, ActorCacheOrderByWithRelationInputObjectSchema.array()]).optional(), where: ActorCacheWhereInputObjectSchema.optional(), cursor: ActorCacheWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ActorCacheScalarFieldEnumSchema, ActorCacheScalarFieldEnumSchema.array()]).optional() }).strict();