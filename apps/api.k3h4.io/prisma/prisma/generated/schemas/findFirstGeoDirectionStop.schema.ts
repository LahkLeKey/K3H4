import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionStopIncludeObjectSchema as GeoDirectionStopIncludeObjectSchema } from './objects/GeoDirectionStopInclude.schema';
import { GeoDirectionStopOrderByWithRelationInputObjectSchema as GeoDirectionStopOrderByWithRelationInputObjectSchema } from './objects/GeoDirectionStopOrderByWithRelationInput.schema';
import { GeoDirectionStopWhereInputObjectSchema as GeoDirectionStopWhereInputObjectSchema } from './objects/GeoDirectionStopWhereInput.schema';
import { GeoDirectionStopWhereUniqueInputObjectSchema as GeoDirectionStopWhereUniqueInputObjectSchema } from './objects/GeoDirectionStopWhereUniqueInput.schema';
import { GeoDirectionStopScalarFieldEnumSchema } from './enums/GeoDirectionStopScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const GeoDirectionStopFindFirstSelectSchema: z.ZodType<Prisma.GeoDirectionStopSelect> = z.object({
    id: z.boolean().optional(),
    directionId: z.boolean().optional(),
    direction: z.boolean().optional(),
    sequence: z.boolean().optional(),
    latitude: z.boolean().optional(),
    longitude: z.boolean().optional(),
    label: z.boolean().optional(),
    address: z.boolean().optional(),
    source: z.boolean().optional(),
    osmId: z.boolean().optional(),
    metadata: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.GeoDirectionStopSelect>;

export const GeoDirectionStopFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    directionId: z.boolean().optional(),
    direction: z.boolean().optional(),
    sequence: z.boolean().optional(),
    latitude: z.boolean().optional(),
    longitude: z.boolean().optional(),
    label: z.boolean().optional(),
    address: z.boolean().optional(),
    source: z.boolean().optional(),
    osmId: z.boolean().optional(),
    metadata: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict();

export const GeoDirectionStopFindFirstSchema: z.ZodType<Prisma.GeoDirectionStopFindFirstArgs> = z.object({ select: GeoDirectionStopFindFirstSelectSchema.optional(), include: z.lazy(() => GeoDirectionStopIncludeObjectSchema.optional()), orderBy: z.union([GeoDirectionStopOrderByWithRelationInputObjectSchema, GeoDirectionStopOrderByWithRelationInputObjectSchema.array()]).optional(), where: GeoDirectionStopWhereInputObjectSchema.optional(), cursor: GeoDirectionStopWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([GeoDirectionStopScalarFieldEnumSchema, GeoDirectionStopScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.GeoDirectionStopFindFirstArgs>;

export const GeoDirectionStopFindFirstZodSchema = z.object({ select: GeoDirectionStopFindFirstSelectSchema.optional(), include: z.lazy(() => GeoDirectionStopIncludeObjectSchema.optional()), orderBy: z.union([GeoDirectionStopOrderByWithRelationInputObjectSchema, GeoDirectionStopOrderByWithRelationInputObjectSchema.array()]).optional(), where: GeoDirectionStopWhereInputObjectSchema.optional(), cursor: GeoDirectionStopWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([GeoDirectionStopScalarFieldEnumSchema, GeoDirectionStopScalarFieldEnumSchema.array()]).optional() }).strict();