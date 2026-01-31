import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PointOfInterestOrderByWithRelationInputObjectSchema as PointOfInterestOrderByWithRelationInputObjectSchema } from './objects/PointOfInterestOrderByWithRelationInput.schema';
import { PointOfInterestWhereInputObjectSchema as PointOfInterestWhereInputObjectSchema } from './objects/PointOfInterestWhereInput.schema';
import { PointOfInterestWhereUniqueInputObjectSchema as PointOfInterestWhereUniqueInputObjectSchema } from './objects/PointOfInterestWhereUniqueInput.schema';
import { PointOfInterestScalarFieldEnumSchema } from './enums/PointOfInterestScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PointOfInterestFindFirstOrThrowSelectSchema: z.ZodType<Prisma.PointOfInterestSelect> = z.object({
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
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.PointOfInterestSelect>;

export const PointOfInterestFindFirstOrThrowSelectZodSchema = z.object({
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
    updatedAt: z.boolean().optional()
  }).strict();

export const PointOfInterestFindFirstOrThrowSchema: z.ZodType<Prisma.PointOfInterestFindFirstOrThrowArgs> = z.object({ select: PointOfInterestFindFirstOrThrowSelectSchema.optional(),  orderBy: z.union([PointOfInterestOrderByWithRelationInputObjectSchema, PointOfInterestOrderByWithRelationInputObjectSchema.array()]).optional(), where: PointOfInterestWhereInputObjectSchema.optional(), cursor: PointOfInterestWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PointOfInterestScalarFieldEnumSchema, PointOfInterestScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.PointOfInterestFindFirstOrThrowArgs>;

export const PointOfInterestFindFirstOrThrowZodSchema = z.object({ select: PointOfInterestFindFirstOrThrowSelectSchema.optional(),  orderBy: z.union([PointOfInterestOrderByWithRelationInputObjectSchema, PointOfInterestOrderByWithRelationInputObjectSchema.array()]).optional(), where: PointOfInterestWhereInputObjectSchema.optional(), cursor: PointOfInterestWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PointOfInterestScalarFieldEnumSchema, PointOfInterestScalarFieldEnumSchema.array()]).optional() }).strict();