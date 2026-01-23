import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaRegionOrderByWithRelationInputObjectSchema as UsdaRegionOrderByWithRelationInputObjectSchema } from './objects/UsdaRegionOrderByWithRelationInput.schema';
import { UsdaRegionWhereInputObjectSchema as UsdaRegionWhereInputObjectSchema } from './objects/UsdaRegionWhereInput.schema';
import { UsdaRegionWhereUniqueInputObjectSchema as UsdaRegionWhereUniqueInputObjectSchema } from './objects/UsdaRegionWhereUniqueInput.schema';
import { UsdaRegionScalarFieldEnumSchema } from './enums/UsdaRegionScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UsdaRegionFindFirstSelectSchema: z.ZodType<Prisma.UsdaRegionSelect> = z.object({
    id: z.boolean().optional(),
    dataset: z.boolean().optional(),
    code: z.boolean().optional(),
    name: z.boolean().optional(),
    wikidataId: z.boolean().optional(),
    enrichment: z.boolean().optional(),
    extra: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.UsdaRegionSelect>;

export const UsdaRegionFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    dataset: z.boolean().optional(),
    code: z.boolean().optional(),
    name: z.boolean().optional(),
    wikidataId: z.boolean().optional(),
    enrichment: z.boolean().optional(),
    extra: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const UsdaRegionFindFirstSchema: z.ZodType<Prisma.UsdaRegionFindFirstArgs> = z.object({ select: UsdaRegionFindFirstSelectSchema.optional(),  orderBy: z.union([UsdaRegionOrderByWithRelationInputObjectSchema, UsdaRegionOrderByWithRelationInputObjectSchema.array()]).optional(), where: UsdaRegionWhereInputObjectSchema.optional(), cursor: UsdaRegionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([UsdaRegionScalarFieldEnumSchema, UsdaRegionScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.UsdaRegionFindFirstArgs>;

export const UsdaRegionFindFirstZodSchema = z.object({ select: UsdaRegionFindFirstSelectSchema.optional(),  orderBy: z.union([UsdaRegionOrderByWithRelationInputObjectSchema, UsdaRegionOrderByWithRelationInputObjectSchema.array()]).optional(), where: UsdaRegionWhereInputObjectSchema.optional(), cursor: UsdaRegionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([UsdaRegionScalarFieldEnumSchema, UsdaRegionScalarFieldEnumSchema.array()]).optional() }).strict();