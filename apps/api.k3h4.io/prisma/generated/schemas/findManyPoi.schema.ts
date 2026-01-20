import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PoiIncludeObjectSchema as PoiIncludeObjectSchema } from './objects/PoiInclude.schema';
import { PoiOrderByWithRelationInputObjectSchema as PoiOrderByWithRelationInputObjectSchema } from './objects/PoiOrderByWithRelationInput.schema';
import { PoiWhereInputObjectSchema as PoiWhereInputObjectSchema } from './objects/PoiWhereInput.schema';
import { PoiWhereUniqueInputObjectSchema as PoiWhereUniqueInputObjectSchema } from './objects/PoiWhereUniqueInput.schema';
import { PoiScalarFieldEnumSchema } from './enums/PoiScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PoiFindManySelectSchema: z.ZodType<Prisma.PoiSelect> = z.object({
    id: z.boolean().optional(),
    osmType: z.boolean().optional(),
    osmId: z.boolean().optional(),
    name: z.boolean().optional(),
    category: z.boolean().optional(),
    latitude: z.boolean().optional(),
    longitude: z.boolean().optional(),
    tags: z.boolean().optional(),
    source: z.boolean().optional(),
    lastSeenAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    buildingId: z.boolean().optional(),
    building: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.PoiSelect>;

export const PoiFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    osmType: z.boolean().optional(),
    osmId: z.boolean().optional(),
    name: z.boolean().optional(),
    category: z.boolean().optional(),
    latitude: z.boolean().optional(),
    longitude: z.boolean().optional(),
    tags: z.boolean().optional(),
    source: z.boolean().optional(),
    lastSeenAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    buildingId: z.boolean().optional(),
    building: z.boolean().optional()
  }).strict();

export const PoiFindManySchema: z.ZodType<Prisma.PoiFindManyArgs> = z.object({ select: PoiFindManySelectSchema.optional(), include: z.lazy(() => PoiIncludeObjectSchema.optional()), orderBy: z.union([PoiOrderByWithRelationInputObjectSchema, PoiOrderByWithRelationInputObjectSchema.array()]).optional(), where: PoiWhereInputObjectSchema.optional(), cursor: PoiWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PoiScalarFieldEnumSchema, PoiScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.PoiFindManyArgs>;

export const PoiFindManyZodSchema = z.object({ select: PoiFindManySelectSchema.optional(), include: z.lazy(() => PoiIncludeObjectSchema.optional()), orderBy: z.union([PoiOrderByWithRelationInputObjectSchema, PoiOrderByWithRelationInputObjectSchema.array()]).optional(), where: PoiWhereInputObjectSchema.optional(), cursor: PoiWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PoiScalarFieldEnumSchema, PoiScalarFieldEnumSchema.array()]).optional() }).strict();