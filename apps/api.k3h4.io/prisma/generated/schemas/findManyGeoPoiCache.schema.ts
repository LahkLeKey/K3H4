import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoPoiCacheIncludeObjectSchema as GeoPoiCacheIncludeObjectSchema } from './objects/GeoPoiCacheInclude.schema';
import { GeoPoiCacheOrderByWithRelationInputObjectSchema as GeoPoiCacheOrderByWithRelationInputObjectSchema } from './objects/GeoPoiCacheOrderByWithRelationInput.schema';
import { GeoPoiCacheWhereInputObjectSchema as GeoPoiCacheWhereInputObjectSchema } from './objects/GeoPoiCacheWhereInput.schema';
import { GeoPoiCacheWhereUniqueInputObjectSchema as GeoPoiCacheWhereUniqueInputObjectSchema } from './objects/GeoPoiCacheWhereUniqueInput.schema';
import { GeoPoiCacheScalarFieldEnumSchema } from './enums/GeoPoiCacheScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const GeoPoiCacheFindManySelectSchema: z.ZodType<Prisma.GeoPoiCacheSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    signature: z.boolean().optional(),
    centerLat: z.boolean().optional(),
    centerLng: z.boolean().optional(),
    radiusM: z.boolean().optional(),
    kinds: z.boolean().optional(),
    pois: z.boolean().optional(),
    count: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.GeoPoiCacheSelect>;

export const GeoPoiCacheFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    signature: z.boolean().optional(),
    centerLat: z.boolean().optional(),
    centerLng: z.boolean().optional(),
    radiusM: z.boolean().optional(),
    kinds: z.boolean().optional(),
    pois: z.boolean().optional(),
    count: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict();

export const GeoPoiCacheFindManySchema: z.ZodType<Prisma.GeoPoiCacheFindManyArgs> = z.object({ select: GeoPoiCacheFindManySelectSchema.optional(), include: z.lazy(() => GeoPoiCacheIncludeObjectSchema.optional()), orderBy: z.union([GeoPoiCacheOrderByWithRelationInputObjectSchema, GeoPoiCacheOrderByWithRelationInputObjectSchema.array()]).optional(), where: GeoPoiCacheWhereInputObjectSchema.optional(), cursor: GeoPoiCacheWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([GeoPoiCacheScalarFieldEnumSchema, GeoPoiCacheScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.GeoPoiCacheFindManyArgs>;

export const GeoPoiCacheFindManyZodSchema = z.object({ select: GeoPoiCacheFindManySelectSchema.optional(), include: z.lazy(() => GeoPoiCacheIncludeObjectSchema.optional()), orderBy: z.union([GeoPoiCacheOrderByWithRelationInputObjectSchema, GeoPoiCacheOrderByWithRelationInputObjectSchema.array()]).optional(), where: GeoPoiCacheWhereInputObjectSchema.optional(), cursor: GeoPoiCacheWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([GeoPoiCacheScalarFieldEnumSchema, GeoPoiCacheScalarFieldEnumSchema.array()]).optional() }).strict();