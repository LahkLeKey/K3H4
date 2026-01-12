import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaRegionOrderByWithRelationInputObjectSchema as UsdaRegionOrderByWithRelationInputObjectSchema } from './objects/UsdaRegionOrderByWithRelationInput.schema';
import { UsdaRegionWhereInputObjectSchema as UsdaRegionWhereInputObjectSchema } from './objects/UsdaRegionWhereInput.schema';
import { UsdaRegionWhereUniqueInputObjectSchema as UsdaRegionWhereUniqueInputObjectSchema } from './objects/UsdaRegionWhereUniqueInput.schema';
import { UsdaRegionScalarFieldEnumSchema } from './enums/UsdaRegionScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UsdaRegionFindFirstOrThrowSelectSchema: z.ZodType<Prisma.UsdaRegionSelect> = z.object({
    id: z.boolean().optional(),
    dataset: z.boolean().optional(),
    code: z.boolean().optional(),
    name: z.boolean().optional(),
    extra: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.UsdaRegionSelect>;

export const UsdaRegionFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    dataset: z.boolean().optional(),
    code: z.boolean().optional(),
    name: z.boolean().optional(),
    extra: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const UsdaRegionFindFirstOrThrowSchema: z.ZodType<Prisma.UsdaRegionFindFirstOrThrowArgs> = z.object({ select: UsdaRegionFindFirstOrThrowSelectSchema.optional(),  orderBy: z.union([UsdaRegionOrderByWithRelationInputObjectSchema, UsdaRegionOrderByWithRelationInputObjectSchema.array()]).optional(), where: UsdaRegionWhereInputObjectSchema.optional(), cursor: UsdaRegionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([UsdaRegionScalarFieldEnumSchema, UsdaRegionScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.UsdaRegionFindFirstOrThrowArgs>;

export const UsdaRegionFindFirstOrThrowZodSchema = z.object({ select: UsdaRegionFindFirstOrThrowSelectSchema.optional(),  orderBy: z.union([UsdaRegionOrderByWithRelationInputObjectSchema, UsdaRegionOrderByWithRelationInputObjectSchema.array()]).optional(), where: UsdaRegionWhereInputObjectSchema.optional(), cursor: UsdaRegionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([UsdaRegionScalarFieldEnumSchema, UsdaRegionScalarFieldEnumSchema.array()]).optional() }).strict();