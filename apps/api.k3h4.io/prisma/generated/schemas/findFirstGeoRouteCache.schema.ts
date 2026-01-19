import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoRouteCacheIncludeObjectSchema as GeoRouteCacheIncludeObjectSchema } from './objects/GeoRouteCacheInclude.schema';
import { GeoRouteCacheOrderByWithRelationInputObjectSchema as GeoRouteCacheOrderByWithRelationInputObjectSchema } from './objects/GeoRouteCacheOrderByWithRelationInput.schema';
import { GeoRouteCacheWhereInputObjectSchema as GeoRouteCacheWhereInputObjectSchema } from './objects/GeoRouteCacheWhereInput.schema';
import { GeoRouteCacheWhereUniqueInputObjectSchema as GeoRouteCacheWhereUniqueInputObjectSchema } from './objects/GeoRouteCacheWhereUniqueInput.schema';
import { GeoRouteCacheScalarFieldEnumSchema } from './enums/GeoRouteCacheScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const GeoRouteCacheFindFirstSelectSchema: z.ZodType<Prisma.GeoRouteCacheSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    provider: z.boolean().optional(),
    signature: z.boolean().optional(),
    originLat: z.boolean().optional(),
    originLng: z.boolean().optional(),
    destinationLat: z.boolean().optional(),
    destinationLng: z.boolean().optional(),
    distanceKm: z.boolean().optional(),
    durationMinutes: z.boolean().optional(),
    geojson: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.GeoRouteCacheSelect>;

export const GeoRouteCacheFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    provider: z.boolean().optional(),
    signature: z.boolean().optional(),
    originLat: z.boolean().optional(),
    originLng: z.boolean().optional(),
    destinationLat: z.boolean().optional(),
    destinationLng: z.boolean().optional(),
    distanceKm: z.boolean().optional(),
    durationMinutes: z.boolean().optional(),
    geojson: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict();

export const GeoRouteCacheFindFirstSchema: z.ZodType<Prisma.GeoRouteCacheFindFirstArgs> = z.object({ select: GeoRouteCacheFindFirstSelectSchema.optional(), include: z.lazy(() => GeoRouteCacheIncludeObjectSchema.optional()), orderBy: z.union([GeoRouteCacheOrderByWithRelationInputObjectSchema, GeoRouteCacheOrderByWithRelationInputObjectSchema.array()]).optional(), where: GeoRouteCacheWhereInputObjectSchema.optional(), cursor: GeoRouteCacheWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([GeoRouteCacheScalarFieldEnumSchema, GeoRouteCacheScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.GeoRouteCacheFindFirstArgs>;

export const GeoRouteCacheFindFirstZodSchema = z.object({ select: GeoRouteCacheFindFirstSelectSchema.optional(), include: z.lazy(() => GeoRouteCacheIncludeObjectSchema.optional()), orderBy: z.union([GeoRouteCacheOrderByWithRelationInputObjectSchema, GeoRouteCacheOrderByWithRelationInputObjectSchema.array()]).optional(), where: GeoRouteCacheWhereInputObjectSchema.optional(), cursor: GeoRouteCacheWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([GeoRouteCacheScalarFieldEnumSchema, GeoRouteCacheScalarFieldEnumSchema.array()]).optional() }).strict();