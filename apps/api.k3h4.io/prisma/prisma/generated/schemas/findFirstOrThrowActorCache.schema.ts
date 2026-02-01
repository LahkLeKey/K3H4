import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActorCacheIncludeObjectSchema as ActorCacheIncludeObjectSchema } from './objects/ActorCacheInclude.schema';
import { ActorCacheOrderByWithRelationInputObjectSchema as ActorCacheOrderByWithRelationInputObjectSchema } from './objects/ActorCacheOrderByWithRelationInput.schema';
import { ActorCacheWhereInputObjectSchema as ActorCacheWhereInputObjectSchema } from './objects/ActorCacheWhereInput.schema';
import { ActorCacheWhereUniqueInputObjectSchema as ActorCacheWhereUniqueInputObjectSchema } from './objects/ActorCacheWhereUniqueInput.schema';
import { ActorCacheScalarFieldEnumSchema } from './enums/ActorCacheScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ActorCacheFindFirstOrThrowSelectSchema: z.ZodType<Prisma.ActorCacheSelect> = z.object({
    id: z.boolean().optional(),
    actorId: z.boolean().optional(),
    actor: z.boolean().optional(),
    key: z.boolean().optional(),
    payload: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ActorCacheSelect>;

export const ActorCacheFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    actorId: z.boolean().optional(),
    actor: z.boolean().optional(),
    key: z.boolean().optional(),
    payload: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const ActorCacheFindFirstOrThrowSchema: z.ZodType<Prisma.ActorCacheFindFirstOrThrowArgs> = z.object({ select: ActorCacheFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => ActorCacheIncludeObjectSchema.optional()), orderBy: z.union([ActorCacheOrderByWithRelationInputObjectSchema, ActorCacheOrderByWithRelationInputObjectSchema.array()]).optional(), where: ActorCacheWhereInputObjectSchema.optional(), cursor: ActorCacheWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ActorCacheScalarFieldEnumSchema, ActorCacheScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ActorCacheFindFirstOrThrowArgs>;

export const ActorCacheFindFirstOrThrowZodSchema = z.object({ select: ActorCacheFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => ActorCacheIncludeObjectSchema.optional()), orderBy: z.union([ActorCacheOrderByWithRelationInputObjectSchema, ActorCacheOrderByWithRelationInputObjectSchema.array()]).optional(), where: ActorCacheWhereInputObjectSchema.optional(), cursor: ActorCacheWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ActorCacheScalarFieldEnumSchema, ActorCacheScalarFieldEnumSchema.array()]).optional() }).strict();