import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionIncludeObjectSchema as GeoDirectionIncludeObjectSchema } from './objects/GeoDirectionInclude.schema';
import { GeoDirectionOrderByWithRelationInputObjectSchema as GeoDirectionOrderByWithRelationInputObjectSchema } from './objects/GeoDirectionOrderByWithRelationInput.schema';
import { GeoDirectionWhereInputObjectSchema as GeoDirectionWhereInputObjectSchema } from './objects/GeoDirectionWhereInput.schema';
import { GeoDirectionWhereUniqueInputObjectSchema as GeoDirectionWhereUniqueInputObjectSchema } from './objects/GeoDirectionWhereUniqueInput.schema';
import { GeoDirectionScalarFieldEnumSchema } from './enums/GeoDirectionScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const GeoDirectionFindFirstOrThrowSelectSchema: z.ZodType<Prisma.GeoDirectionSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    provider: z.boolean().optional(),
    profile: z.boolean().optional(),
    signature: z.boolean().optional(),
    inputPoints: z.boolean().optional(),
    originLat: z.boolean().optional(),
    originLng: z.boolean().optional(),
    destinationLat: z.boolean().optional(),
    destinationLng: z.boolean().optional(),
    distanceMeters: z.boolean().optional(),
    durationSeconds: z.boolean().optional(),
    geometry: z.boolean().optional(),
    instructions: z.boolean().optional(),
    payload: z.boolean().optional(),
    statusCode: z.boolean().optional(),
    statusMessage: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    routeCacheId: z.boolean().optional(),
    routeCache: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    stops: z.boolean().optional(),
    segments: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.GeoDirectionSelect>;

export const GeoDirectionFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    provider: z.boolean().optional(),
    profile: z.boolean().optional(),
    signature: z.boolean().optional(),
    inputPoints: z.boolean().optional(),
    originLat: z.boolean().optional(),
    originLng: z.boolean().optional(),
    destinationLat: z.boolean().optional(),
    destinationLng: z.boolean().optional(),
    distanceMeters: z.boolean().optional(),
    durationSeconds: z.boolean().optional(),
    geometry: z.boolean().optional(),
    instructions: z.boolean().optional(),
    payload: z.boolean().optional(),
    statusCode: z.boolean().optional(),
    statusMessage: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    routeCacheId: z.boolean().optional(),
    routeCache: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    stops: z.boolean().optional(),
    segments: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const GeoDirectionFindFirstOrThrowSchema: z.ZodType<Prisma.GeoDirectionFindFirstOrThrowArgs> = z.object({ select: GeoDirectionFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => GeoDirectionIncludeObjectSchema.optional()), orderBy: z.union([GeoDirectionOrderByWithRelationInputObjectSchema, GeoDirectionOrderByWithRelationInputObjectSchema.array()]).optional(), where: GeoDirectionWhereInputObjectSchema.optional(), cursor: GeoDirectionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([GeoDirectionScalarFieldEnumSchema, GeoDirectionScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.GeoDirectionFindFirstOrThrowArgs>;

export const GeoDirectionFindFirstOrThrowZodSchema = z.object({ select: GeoDirectionFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => GeoDirectionIncludeObjectSchema.optional()), orderBy: z.union([GeoDirectionOrderByWithRelationInputObjectSchema, GeoDirectionOrderByWithRelationInputObjectSchema.array()]).optional(), where: GeoDirectionWhereInputObjectSchema.optional(), cursor: GeoDirectionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([GeoDirectionScalarFieldEnumSchema, GeoDirectionScalarFieldEnumSchema.array()]).optional() }).strict();