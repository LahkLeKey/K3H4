import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FreightLoadIncludeObjectSchema as FreightLoadIncludeObjectSchema } from './objects/FreightLoadInclude.schema';
import { FreightLoadOrderByWithRelationInputObjectSchema as FreightLoadOrderByWithRelationInputObjectSchema } from './objects/FreightLoadOrderByWithRelationInput.schema';
import { FreightLoadWhereInputObjectSchema as FreightLoadWhereInputObjectSchema } from './objects/FreightLoadWhereInput.schema';
import { FreightLoadWhereUniqueInputObjectSchema as FreightLoadWhereUniqueInputObjectSchema } from './objects/FreightLoadWhereUniqueInput.schema';
import { FreightLoadScalarFieldEnumSchema } from './enums/FreightLoadScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const FreightLoadFindManySelectSchema: z.ZodType<Prisma.FreightLoadSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    title: z.boolean().optional(),
    originName: z.boolean().optional(),
    originLat: z.boolean().optional(),
    originLng: z.boolean().optional(),
    destinationName: z.boolean().optional(),
    destinationLat: z.boolean().optional(),
    destinationLng: z.boolean().optional(),
    distanceKm: z.boolean().optional(),
    durationMinutes: z.boolean().optional(),
    cost: z.boolean().optional(),
    status: z.boolean().optional(),
    routeGeoJson: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.FreightLoadSelect>;

export const FreightLoadFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    title: z.boolean().optional(),
    originName: z.boolean().optional(),
    originLat: z.boolean().optional(),
    originLng: z.boolean().optional(),
    destinationName: z.boolean().optional(),
    destinationLat: z.boolean().optional(),
    destinationLng: z.boolean().optional(),
    distanceKm: z.boolean().optional(),
    durationMinutes: z.boolean().optional(),
    cost: z.boolean().optional(),
    status: z.boolean().optional(),
    routeGeoJson: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const FreightLoadFindManySchema: z.ZodType<Prisma.FreightLoadFindManyArgs> = z.object({ select: FreightLoadFindManySelectSchema.optional(), include: z.lazy(() => FreightLoadIncludeObjectSchema.optional()), orderBy: z.union([FreightLoadOrderByWithRelationInputObjectSchema, FreightLoadOrderByWithRelationInputObjectSchema.array()]).optional(), where: FreightLoadWhereInputObjectSchema.optional(), cursor: FreightLoadWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([FreightLoadScalarFieldEnumSchema, FreightLoadScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.FreightLoadFindManyArgs>;

export const FreightLoadFindManyZodSchema = z.object({ select: FreightLoadFindManySelectSchema.optional(), include: z.lazy(() => FreightLoadIncludeObjectSchema.optional()), orderBy: z.union([FreightLoadOrderByWithRelationInputObjectSchema, FreightLoadOrderByWithRelationInputObjectSchema.array()]).optional(), where: FreightLoadWhereInputObjectSchema.optional(), cursor: FreightLoadWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([FreightLoadScalarFieldEnumSchema, FreightLoadScalarFieldEnumSchema.array()]).optional() }).strict();