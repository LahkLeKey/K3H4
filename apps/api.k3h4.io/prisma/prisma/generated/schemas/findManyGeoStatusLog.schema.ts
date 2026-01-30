import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoStatusLogIncludeObjectSchema as GeoStatusLogIncludeObjectSchema } from './objects/GeoStatusLogInclude.schema';
import { GeoStatusLogOrderByWithRelationInputObjectSchema as GeoStatusLogOrderByWithRelationInputObjectSchema } from './objects/GeoStatusLogOrderByWithRelationInput.schema';
import { GeoStatusLogWhereInputObjectSchema as GeoStatusLogWhereInputObjectSchema } from './objects/GeoStatusLogWhereInput.schema';
import { GeoStatusLogWhereUniqueInputObjectSchema as GeoStatusLogWhereUniqueInputObjectSchema } from './objects/GeoStatusLogWhereUniqueInput.schema';
import { GeoStatusLogScalarFieldEnumSchema } from './enums/GeoStatusLogScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const GeoStatusLogFindManySelectSchema: z.ZodType<Prisma.GeoStatusLogSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    status: z.boolean().optional(),
    poiStatus: z.boolean().optional(),
    centerLat: z.boolean().optional(),
    centerLng: z.boolean().optional(),
    error: z.boolean().optional(),
    userAgent: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.GeoStatusLogSelect>;

export const GeoStatusLogFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    status: z.boolean().optional(),
    poiStatus: z.boolean().optional(),
    centerLat: z.boolean().optional(),
    centerLng: z.boolean().optional(),
    error: z.boolean().optional(),
    userAgent: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict();

export const GeoStatusLogFindManySchema: z.ZodType<Prisma.GeoStatusLogFindManyArgs> = z.object({ select: GeoStatusLogFindManySelectSchema.optional(), include: z.lazy(() => GeoStatusLogIncludeObjectSchema.optional()), orderBy: z.union([GeoStatusLogOrderByWithRelationInputObjectSchema, GeoStatusLogOrderByWithRelationInputObjectSchema.array()]).optional(), where: GeoStatusLogWhereInputObjectSchema.optional(), cursor: GeoStatusLogWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([GeoStatusLogScalarFieldEnumSchema, GeoStatusLogScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.GeoStatusLogFindManyArgs>;

export const GeoStatusLogFindManyZodSchema = z.object({ select: GeoStatusLogFindManySelectSchema.optional(), include: z.lazy(() => GeoStatusLogIncludeObjectSchema.optional()), orderBy: z.union([GeoStatusLogOrderByWithRelationInputObjectSchema, GeoStatusLogOrderByWithRelationInputObjectSchema.array()]).optional(), where: GeoStatusLogWhereInputObjectSchema.optional(), cursor: GeoStatusLogWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([GeoStatusLogScalarFieldEnumSchema, GeoStatusLogScalarFieldEnumSchema.array()]).optional() }).strict();