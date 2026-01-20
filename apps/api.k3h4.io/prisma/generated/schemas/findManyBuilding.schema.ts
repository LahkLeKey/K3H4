import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BuildingIncludeObjectSchema as BuildingIncludeObjectSchema } from './objects/BuildingInclude.schema';
import { BuildingOrderByWithRelationInputObjectSchema as BuildingOrderByWithRelationInputObjectSchema } from './objects/BuildingOrderByWithRelationInput.schema';
import { BuildingWhereInputObjectSchema as BuildingWhereInputObjectSchema } from './objects/BuildingWhereInput.schema';
import { BuildingWhereUniqueInputObjectSchema as BuildingWhereUniqueInputObjectSchema } from './objects/BuildingWhereUniqueInput.schema';
import { BuildingScalarFieldEnumSchema } from './enums/BuildingScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const BuildingFindManySelectSchema: z.ZodType<Prisma.BuildingSelect> = z.object({
    id: z.boolean().optional(),
    osmId: z.boolean().optional(),
    type: z.boolean().optional(),
    addressHouseNumber: z.boolean().optional(),
    addressStreet: z.boolean().optional(),
    addressCity: z.boolean().optional(),
    addressPostcode: z.boolean().optional(),
    addressState: z.boolean().optional(),
    addressCountry: z.boolean().optional(),
    geometry: z.boolean().optional(),
    POIs: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.BuildingSelect>;

export const BuildingFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    osmId: z.boolean().optional(),
    type: z.boolean().optional(),
    addressHouseNumber: z.boolean().optional(),
    addressStreet: z.boolean().optional(),
    addressCity: z.boolean().optional(),
    addressPostcode: z.boolean().optional(),
    addressState: z.boolean().optional(),
    addressCountry: z.boolean().optional(),
    geometry: z.boolean().optional(),
    POIs: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const BuildingFindManySchema: z.ZodType<Prisma.BuildingFindManyArgs> = z.object({ select: BuildingFindManySelectSchema.optional(), include: z.lazy(() => BuildingIncludeObjectSchema.optional()), orderBy: z.union([BuildingOrderByWithRelationInputObjectSchema, BuildingOrderByWithRelationInputObjectSchema.array()]).optional(), where: BuildingWhereInputObjectSchema.optional(), cursor: BuildingWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([BuildingScalarFieldEnumSchema, BuildingScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.BuildingFindManyArgs>;

export const BuildingFindManyZodSchema = z.object({ select: BuildingFindManySelectSchema.optional(), include: z.lazy(() => BuildingIncludeObjectSchema.optional()), orderBy: z.union([BuildingOrderByWithRelationInputObjectSchema, BuildingOrderByWithRelationInputObjectSchema.array()]).optional(), where: BuildingWhereInputObjectSchema.optional(), cursor: BuildingWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([BuildingScalarFieldEnumSchema, BuildingScalarFieldEnumSchema.array()]).optional() }).strict();