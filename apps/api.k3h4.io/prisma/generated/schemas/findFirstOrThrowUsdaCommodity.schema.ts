import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCommodityOrderByWithRelationInputObjectSchema as UsdaCommodityOrderByWithRelationInputObjectSchema } from './objects/UsdaCommodityOrderByWithRelationInput.schema';
import { UsdaCommodityWhereInputObjectSchema as UsdaCommodityWhereInputObjectSchema } from './objects/UsdaCommodityWhereInput.schema';
import { UsdaCommodityWhereUniqueInputObjectSchema as UsdaCommodityWhereUniqueInputObjectSchema } from './objects/UsdaCommodityWhereUniqueInput.schema';
import { UsdaCommodityScalarFieldEnumSchema } from './enums/UsdaCommodityScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UsdaCommodityFindFirstOrThrowSelectSchema: z.ZodType<Prisma.UsdaCommoditySelect> = z.object({
    id: z.boolean().optional(),
    dataset: z.boolean().optional(),
    code: z.boolean().optional(),
    name: z.boolean().optional(),
    extra: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.UsdaCommoditySelect>;

export const UsdaCommodityFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    dataset: z.boolean().optional(),
    code: z.boolean().optional(),
    name: z.boolean().optional(),
    extra: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const UsdaCommodityFindFirstOrThrowSchema: z.ZodType<Prisma.UsdaCommodityFindFirstOrThrowArgs> = z.object({ select: UsdaCommodityFindFirstOrThrowSelectSchema.optional(),  orderBy: z.union([UsdaCommodityOrderByWithRelationInputObjectSchema, UsdaCommodityOrderByWithRelationInputObjectSchema.array()]).optional(), where: UsdaCommodityWhereInputObjectSchema.optional(), cursor: UsdaCommodityWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([UsdaCommodityScalarFieldEnumSchema, UsdaCommodityScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.UsdaCommodityFindFirstOrThrowArgs>;

export const UsdaCommodityFindFirstOrThrowZodSchema = z.object({ select: UsdaCommodityFindFirstOrThrowSelectSchema.optional(),  orderBy: z.union([UsdaCommodityOrderByWithRelationInputObjectSchema, UsdaCommodityOrderByWithRelationInputObjectSchema.array()]).optional(), where: UsdaCommodityWhereInputObjectSchema.optional(), cursor: UsdaCommodityWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([UsdaCommodityScalarFieldEnumSchema, UsdaCommodityScalarFieldEnumSchema.array()]).optional() }).strict();