import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoQueryCacheIncludeObjectSchema as GeoQueryCacheIncludeObjectSchema } from './objects/GeoQueryCacheInclude.schema';
import { GeoQueryCacheOrderByWithRelationInputObjectSchema as GeoQueryCacheOrderByWithRelationInputObjectSchema } from './objects/GeoQueryCacheOrderByWithRelationInput.schema';
import { GeoQueryCacheWhereInputObjectSchema as GeoQueryCacheWhereInputObjectSchema } from './objects/GeoQueryCacheWhereInput.schema';
import { GeoQueryCacheWhereUniqueInputObjectSchema as GeoQueryCacheWhereUniqueInputObjectSchema } from './objects/GeoQueryCacheWhereUniqueInput.schema';
import { GeoQueryCacheScalarFieldEnumSchema } from './enums/GeoQueryCacheScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const GeoQueryCacheFindManySelectSchema: z.ZodType<Prisma.GeoQueryCacheSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    type: z.boolean().optional(),
    signature: z.boolean().optional(),
    params: z.boolean().optional(),
    payload: z.boolean().optional(),
    count: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.GeoQueryCacheSelect>;

export const GeoQueryCacheFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    type: z.boolean().optional(),
    signature: z.boolean().optional(),
    params: z.boolean().optional(),
    payload: z.boolean().optional(),
    count: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict();

export const GeoQueryCacheFindManySchema: z.ZodType<Prisma.GeoQueryCacheFindManyArgs> = z.object({ select: GeoQueryCacheFindManySelectSchema.optional(), include: z.lazy(() => GeoQueryCacheIncludeObjectSchema.optional()), orderBy: z.union([GeoQueryCacheOrderByWithRelationInputObjectSchema, GeoQueryCacheOrderByWithRelationInputObjectSchema.array()]).optional(), where: GeoQueryCacheWhereInputObjectSchema.optional(), cursor: GeoQueryCacheWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([GeoQueryCacheScalarFieldEnumSchema, GeoQueryCacheScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.GeoQueryCacheFindManyArgs>;

export const GeoQueryCacheFindManyZodSchema = z.object({ select: GeoQueryCacheFindManySelectSchema.optional(), include: z.lazy(() => GeoQueryCacheIncludeObjectSchema.optional()), orderBy: z.union([GeoQueryCacheOrderByWithRelationInputObjectSchema, GeoQueryCacheOrderByWithRelationInputObjectSchema.array()]).optional(), where: GeoQueryCacheWhereInputObjectSchema.optional(), cursor: GeoQueryCacheWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([GeoQueryCacheScalarFieldEnumSchema, GeoQueryCacheScalarFieldEnumSchema.array()]).optional() }).strict();