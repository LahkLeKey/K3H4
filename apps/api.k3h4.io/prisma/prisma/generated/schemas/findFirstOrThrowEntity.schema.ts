import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EntityIncludeObjectSchema as EntityIncludeObjectSchema } from './objects/EntityInclude.schema';
import { EntityOrderByWithRelationInputObjectSchema as EntityOrderByWithRelationInputObjectSchema } from './objects/EntityOrderByWithRelationInput.schema';
import { EntityWhereInputObjectSchema as EntityWhereInputObjectSchema } from './objects/EntityWhereInput.schema';
import { EntityWhereUniqueInputObjectSchema as EntityWhereUniqueInputObjectSchema } from './objects/EntityWhereUniqueInput.schema';
import { EntityScalarFieldEnumSchema } from './enums/EntityScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const EntityFindFirstOrThrowSelectSchema: z.ZodType<Prisma.EntitySelect> = z.object({
    id: z.boolean().optional(),
    actorId: z.boolean().optional(),
    actor: z.boolean().optional(),
    kind: z.boolean().optional(),
    direction: z.boolean().optional(),
    name: z.boolean().optional(),
    targetType: z.boolean().optional(),
    targetId: z.boolean().optional(),
    source: z.boolean().optional(),
    metadata: z.boolean().optional(),
    isGlobal: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    caches: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.EntitySelect>;

export const EntityFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    actorId: z.boolean().optional(),
    actor: z.boolean().optional(),
    kind: z.boolean().optional(),
    direction: z.boolean().optional(),
    name: z.boolean().optional(),
    targetType: z.boolean().optional(),
    targetId: z.boolean().optional(),
    source: z.boolean().optional(),
    metadata: z.boolean().optional(),
    isGlobal: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    caches: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const EntityFindFirstOrThrowSchema: z.ZodType<Prisma.EntityFindFirstOrThrowArgs> = z.object({ select: EntityFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => EntityIncludeObjectSchema.optional()), orderBy: z.union([EntityOrderByWithRelationInputObjectSchema, EntityOrderByWithRelationInputObjectSchema.array()]).optional(), where: EntityWhereInputObjectSchema.optional(), cursor: EntityWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([EntityScalarFieldEnumSchema, EntityScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.EntityFindFirstOrThrowArgs>;

export const EntityFindFirstOrThrowZodSchema = z.object({ select: EntityFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => EntityIncludeObjectSchema.optional()), orderBy: z.union([EntityOrderByWithRelationInputObjectSchema, EntityOrderByWithRelationInputObjectSchema.array()]).optional(), where: EntityWhereInputObjectSchema.optional(), cursor: EntityWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([EntityScalarFieldEnumSchema, EntityScalarFieldEnumSchema.array()]).optional() }).strict();