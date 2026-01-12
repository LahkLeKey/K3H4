import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CulinaryMenuItemIncludeObjectSchema as CulinaryMenuItemIncludeObjectSchema } from './objects/CulinaryMenuItemInclude.schema';
import { CulinaryMenuItemOrderByWithRelationInputObjectSchema as CulinaryMenuItemOrderByWithRelationInputObjectSchema } from './objects/CulinaryMenuItemOrderByWithRelationInput.schema';
import { CulinaryMenuItemWhereInputObjectSchema as CulinaryMenuItemWhereInputObjectSchema } from './objects/CulinaryMenuItemWhereInput.schema';
import { CulinaryMenuItemWhereUniqueInputObjectSchema as CulinaryMenuItemWhereUniqueInputObjectSchema } from './objects/CulinaryMenuItemWhereUniqueInput.schema';
import { CulinaryMenuItemScalarFieldEnumSchema } from './enums/CulinaryMenuItemScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CulinaryMenuItemFindFirstSelectSchema: z.ZodType<Prisma.CulinaryMenuItemSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    name: z.boolean().optional(),
    prepMinutes: z.boolean().optional(),
    cost: z.boolean().optional(),
    price: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.CulinaryMenuItemSelect>;

export const CulinaryMenuItemFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    name: z.boolean().optional(),
    prepMinutes: z.boolean().optional(),
    cost: z.boolean().optional(),
    price: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const CulinaryMenuItemFindFirstSchema: z.ZodType<Prisma.CulinaryMenuItemFindFirstArgs> = z.object({ select: CulinaryMenuItemFindFirstSelectSchema.optional(), include: z.lazy(() => CulinaryMenuItemIncludeObjectSchema.optional()), orderBy: z.union([CulinaryMenuItemOrderByWithRelationInputObjectSchema, CulinaryMenuItemOrderByWithRelationInputObjectSchema.array()]).optional(), where: CulinaryMenuItemWhereInputObjectSchema.optional(), cursor: CulinaryMenuItemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CulinaryMenuItemScalarFieldEnumSchema, CulinaryMenuItemScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.CulinaryMenuItemFindFirstArgs>;

export const CulinaryMenuItemFindFirstZodSchema = z.object({ select: CulinaryMenuItemFindFirstSelectSchema.optional(), include: z.lazy(() => CulinaryMenuItemIncludeObjectSchema.optional()), orderBy: z.union([CulinaryMenuItemOrderByWithRelationInputObjectSchema, CulinaryMenuItemOrderByWithRelationInputObjectSchema.array()]).optional(), where: CulinaryMenuItemWhereInputObjectSchema.optional(), cursor: CulinaryMenuItemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CulinaryMenuItemScalarFieldEnumSchema, CulinaryMenuItemScalarFieldEnumSchema.array()]).optional() }).strict();