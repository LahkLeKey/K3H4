import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionSegmentIncludeObjectSchema as GeoDirectionSegmentIncludeObjectSchema } from './objects/GeoDirectionSegmentInclude.schema';
import { GeoDirectionSegmentOrderByWithRelationInputObjectSchema as GeoDirectionSegmentOrderByWithRelationInputObjectSchema } from './objects/GeoDirectionSegmentOrderByWithRelationInput.schema';
import { GeoDirectionSegmentWhereInputObjectSchema as GeoDirectionSegmentWhereInputObjectSchema } from './objects/GeoDirectionSegmentWhereInput.schema';
import { GeoDirectionSegmentWhereUniqueInputObjectSchema as GeoDirectionSegmentWhereUniqueInputObjectSchema } from './objects/GeoDirectionSegmentWhereUniqueInput.schema';
import { GeoDirectionSegmentScalarFieldEnumSchema } from './enums/GeoDirectionSegmentScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const GeoDirectionSegmentFindManySelectSchema: z.ZodType<Prisma.GeoDirectionSegmentSelect> = z.object({
    id: z.boolean().optional(),
    directionId: z.boolean().optional(),
    direction: z.boolean().optional(),
    sequence: z.boolean().optional(),
    instruction: z.boolean().optional(),
    maneuverType: z.boolean().optional(),
    maneuverModifier: z.boolean().optional(),
    distanceMeters: z.boolean().optional(),
    durationSeconds: z.boolean().optional(),
    startLat: z.boolean().optional(),
    startLng: z.boolean().optional(),
    endLat: z.boolean().optional(),
    endLng: z.boolean().optional(),
    geometry: z.boolean().optional(),
    metadata: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.GeoDirectionSegmentSelect>;

export const GeoDirectionSegmentFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    directionId: z.boolean().optional(),
    direction: z.boolean().optional(),
    sequence: z.boolean().optional(),
    instruction: z.boolean().optional(),
    maneuverType: z.boolean().optional(),
    maneuverModifier: z.boolean().optional(),
    distanceMeters: z.boolean().optional(),
    durationSeconds: z.boolean().optional(),
    startLat: z.boolean().optional(),
    startLng: z.boolean().optional(),
    endLat: z.boolean().optional(),
    endLng: z.boolean().optional(),
    geometry: z.boolean().optional(),
    metadata: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict();

export const GeoDirectionSegmentFindManySchema: z.ZodType<Prisma.GeoDirectionSegmentFindManyArgs> = z.object({ select: GeoDirectionSegmentFindManySelectSchema.optional(), include: z.lazy(() => GeoDirectionSegmentIncludeObjectSchema.optional()), orderBy: z.union([GeoDirectionSegmentOrderByWithRelationInputObjectSchema, GeoDirectionSegmentOrderByWithRelationInputObjectSchema.array()]).optional(), where: GeoDirectionSegmentWhereInputObjectSchema.optional(), cursor: GeoDirectionSegmentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([GeoDirectionSegmentScalarFieldEnumSchema, GeoDirectionSegmentScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.GeoDirectionSegmentFindManyArgs>;

export const GeoDirectionSegmentFindManyZodSchema = z.object({ select: GeoDirectionSegmentFindManySelectSchema.optional(), include: z.lazy(() => GeoDirectionSegmentIncludeObjectSchema.optional()), orderBy: z.union([GeoDirectionSegmentOrderByWithRelationInputObjectSchema, GeoDirectionSegmentOrderByWithRelationInputObjectSchema.array()]).optional(), where: GeoDirectionSegmentWhereInputObjectSchema.optional(), cursor: GeoDirectionSegmentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([GeoDirectionSegmentScalarFieldEnumSchema, GeoDirectionSegmentScalarFieldEnumSchema.array()]).optional() }).strict();