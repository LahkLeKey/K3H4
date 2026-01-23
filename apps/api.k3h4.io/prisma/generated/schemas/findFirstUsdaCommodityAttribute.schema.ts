import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCommodityAttributeOrderByWithRelationInputObjectSchema as UsdaCommodityAttributeOrderByWithRelationInputObjectSchema } from './objects/UsdaCommodityAttributeOrderByWithRelationInput.schema';
import { UsdaCommodityAttributeWhereInputObjectSchema as UsdaCommodityAttributeWhereInputObjectSchema } from './objects/UsdaCommodityAttributeWhereInput.schema';
import { UsdaCommodityAttributeWhereUniqueInputObjectSchema as UsdaCommodityAttributeWhereUniqueInputObjectSchema } from './objects/UsdaCommodityAttributeWhereUniqueInput.schema';
import { UsdaCommodityAttributeScalarFieldEnumSchema } from './enums/UsdaCommodityAttributeScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UsdaCommodityAttributeFindFirstSelectSchema: z.ZodType<Prisma.UsdaCommodityAttributeSelect> = z.object({
    id: z.boolean().optional(),
    dataset: z.boolean().optional(),
    code: z.boolean().optional(),
    name: z.boolean().optional(),
    wikidataId: z.boolean().optional(),
    enrichment: z.boolean().optional(),
    extra: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.UsdaCommodityAttributeSelect>;

export const UsdaCommodityAttributeFindFirstSelectZodSchema = z.object({
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

export const UsdaCommodityAttributeFindFirstSchema: z.ZodType<Prisma.UsdaCommodityAttributeFindFirstArgs> = z.object({ select: UsdaCommodityAttributeFindFirstSelectSchema.optional(),  orderBy: z.union([UsdaCommodityAttributeOrderByWithRelationInputObjectSchema, UsdaCommodityAttributeOrderByWithRelationInputObjectSchema.array()]).optional(), where: UsdaCommodityAttributeWhereInputObjectSchema.optional(), cursor: UsdaCommodityAttributeWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([UsdaCommodityAttributeScalarFieldEnumSchema, UsdaCommodityAttributeScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.UsdaCommodityAttributeFindFirstArgs>;

export const UsdaCommodityAttributeFindFirstZodSchema = z.object({ select: UsdaCommodityAttributeFindFirstSelectSchema.optional(),  orderBy: z.union([UsdaCommodityAttributeOrderByWithRelationInputObjectSchema, UsdaCommodityAttributeOrderByWithRelationInputObjectSchema.array()]).optional(), where: UsdaCommodityAttributeWhereInputObjectSchema.optional(), cursor: UsdaCommodityAttributeWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([UsdaCommodityAttributeScalarFieldEnumSchema, UsdaCommodityAttributeScalarFieldEnumSchema.array()]).optional() }).strict();