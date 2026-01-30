import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoViewHistoryIncludeObjectSchema as GeoViewHistoryIncludeObjectSchema } from './objects/GeoViewHistoryInclude.schema';
import { GeoViewHistoryOrderByWithRelationInputObjectSchema as GeoViewHistoryOrderByWithRelationInputObjectSchema } from './objects/GeoViewHistoryOrderByWithRelationInput.schema';
import { GeoViewHistoryWhereInputObjectSchema as GeoViewHistoryWhereInputObjectSchema } from './objects/GeoViewHistoryWhereInput.schema';
import { GeoViewHistoryWhereUniqueInputObjectSchema as GeoViewHistoryWhereUniqueInputObjectSchema } from './objects/GeoViewHistoryWhereUniqueInput.schema';
import { GeoViewHistoryScalarFieldEnumSchema } from './enums/GeoViewHistoryScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const GeoViewHistoryFindFirstOrThrowSelectSchema: z.ZodType<Prisma.GeoViewHistorySelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    signature: z.boolean().optional(),
    zoomBand: z.boolean().optional(),
    bboxMinLat: z.boolean().optional(),
    bboxMinLng: z.boolean().optional(),
    bboxMaxLat: z.boolean().optional(),
    bboxMaxLng: z.boolean().optional(),
    lastPoiIds: z.boolean().optional(),
    lastPoiCount: z.boolean().optional(),
    firstViewedAt: z.boolean().optional(),
    lastViewedAt: z.boolean().optional(),
    viewCount: z.boolean().optional(),
    staleAfter: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.GeoViewHistorySelect>;

export const GeoViewHistoryFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    signature: z.boolean().optional(),
    zoomBand: z.boolean().optional(),
    bboxMinLat: z.boolean().optional(),
    bboxMinLng: z.boolean().optional(),
    bboxMaxLat: z.boolean().optional(),
    bboxMaxLng: z.boolean().optional(),
    lastPoiIds: z.boolean().optional(),
    lastPoiCount: z.boolean().optional(),
    firstViewedAt: z.boolean().optional(),
    lastViewedAt: z.boolean().optional(),
    viewCount: z.boolean().optional(),
    staleAfter: z.boolean().optional()
  }).strict();

export const GeoViewHistoryFindFirstOrThrowSchema: z.ZodType<Prisma.GeoViewHistoryFindFirstOrThrowArgs> = z.object({ select: GeoViewHistoryFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => GeoViewHistoryIncludeObjectSchema.optional()), orderBy: z.union([GeoViewHistoryOrderByWithRelationInputObjectSchema, GeoViewHistoryOrderByWithRelationInputObjectSchema.array()]).optional(), where: GeoViewHistoryWhereInputObjectSchema.optional(), cursor: GeoViewHistoryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([GeoViewHistoryScalarFieldEnumSchema, GeoViewHistoryScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.GeoViewHistoryFindFirstOrThrowArgs>;

export const GeoViewHistoryFindFirstOrThrowZodSchema = z.object({ select: GeoViewHistoryFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => GeoViewHistoryIncludeObjectSchema.optional()), orderBy: z.union([GeoViewHistoryOrderByWithRelationInputObjectSchema, GeoViewHistoryOrderByWithRelationInputObjectSchema.array()]).optional(), where: GeoViewHistoryWhereInputObjectSchema.optional(), cursor: GeoViewHistoryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([GeoViewHistoryScalarFieldEnumSchema, GeoViewHistoryScalarFieldEnumSchema.array()]).optional() }).strict();