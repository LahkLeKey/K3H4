import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EntityCacheIncludeObjectSchema as EntityCacheIncludeObjectSchema } from './objects/EntityCacheInclude.schema';
import { EntityCacheOrderByWithRelationInputObjectSchema as EntityCacheOrderByWithRelationInputObjectSchema } from './objects/EntityCacheOrderByWithRelationInput.schema';
import { EntityCacheWhereInputObjectSchema as EntityCacheWhereInputObjectSchema } from './objects/EntityCacheWhereInput.schema';
import { EntityCacheWhereUniqueInputObjectSchema as EntityCacheWhereUniqueInputObjectSchema } from './objects/EntityCacheWhereUniqueInput.schema';
import { EntityCacheScalarFieldEnumSchema } from './enums/EntityCacheScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const EntityCacheFindManySelectSchema: z.ZodType<Prisma.EntityCacheSelect> = z.object({
    id: z.boolean().optional(),
    entityId: z.boolean().optional(),
    entity: z.boolean().optional(),
    key: z.boolean().optional(),
    payload: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.EntityCacheSelect>;

export const EntityCacheFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    entityId: z.boolean().optional(),
    entity: z.boolean().optional(),
    key: z.boolean().optional(),
    payload: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const EntityCacheFindManySchema: z.ZodType<Prisma.EntityCacheFindManyArgs> = z.object({ select: EntityCacheFindManySelectSchema.optional(), include: z.lazy(() => EntityCacheIncludeObjectSchema.optional()), orderBy: z.union([EntityCacheOrderByWithRelationInputObjectSchema, EntityCacheOrderByWithRelationInputObjectSchema.array()]).optional(), where: EntityCacheWhereInputObjectSchema.optional(), cursor: EntityCacheWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([EntityCacheScalarFieldEnumSchema, EntityCacheScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.EntityCacheFindManyArgs>;

export const EntityCacheFindManyZodSchema = z.object({ select: EntityCacheFindManySelectSchema.optional(), include: z.lazy(() => EntityCacheIncludeObjectSchema.optional()), orderBy: z.union([EntityCacheOrderByWithRelationInputObjectSchema, EntityCacheOrderByWithRelationInputObjectSchema.array()]).optional(), where: EntityCacheWhereInputObjectSchema.optional(), cursor: EntityCacheWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([EntityCacheScalarFieldEnumSchema, EntityCacheScalarFieldEnumSchema.array()]).optional() }).strict();