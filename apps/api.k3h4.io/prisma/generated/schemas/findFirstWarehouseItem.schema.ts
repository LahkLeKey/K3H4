import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WarehouseItemIncludeObjectSchema as WarehouseItemIncludeObjectSchema } from './objects/WarehouseItemInclude.schema';
import { WarehouseItemOrderByWithRelationInputObjectSchema as WarehouseItemOrderByWithRelationInputObjectSchema } from './objects/WarehouseItemOrderByWithRelationInput.schema';
import { WarehouseItemWhereInputObjectSchema as WarehouseItemWhereInputObjectSchema } from './objects/WarehouseItemWhereInput.schema';
import { WarehouseItemWhereUniqueInputObjectSchema as WarehouseItemWhereUniqueInputObjectSchema } from './objects/WarehouseItemWhereUniqueInput.schema';
import { WarehouseItemScalarFieldEnumSchema } from './enums/WarehouseItemScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const WarehouseItemFindFirstSelectSchema: z.ZodType<Prisma.WarehouseItemSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    sku: z.boolean().optional(),
    description: z.boolean().optional(),
    quantity: z.boolean().optional(),
    location: z.boolean().optional(),
    status: z.boolean().optional(),
    freightLoadId: z.boolean().optional(),
    freightLoad: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.WarehouseItemSelect>;

export const WarehouseItemFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    sku: z.boolean().optional(),
    description: z.boolean().optional(),
    quantity: z.boolean().optional(),
    location: z.boolean().optional(),
    status: z.boolean().optional(),
    freightLoadId: z.boolean().optional(),
    freightLoad: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const WarehouseItemFindFirstSchema: z.ZodType<Prisma.WarehouseItemFindFirstArgs> = z.object({ select: WarehouseItemFindFirstSelectSchema.optional(), include: z.lazy(() => WarehouseItemIncludeObjectSchema.optional()), orderBy: z.union([WarehouseItemOrderByWithRelationInputObjectSchema, WarehouseItemOrderByWithRelationInputObjectSchema.array()]).optional(), where: WarehouseItemWhereInputObjectSchema.optional(), cursor: WarehouseItemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([WarehouseItemScalarFieldEnumSchema, WarehouseItemScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.WarehouseItemFindFirstArgs>;

export const WarehouseItemFindFirstZodSchema = z.object({ select: WarehouseItemFindFirstSelectSchema.optional(), include: z.lazy(() => WarehouseItemIncludeObjectSchema.optional()), orderBy: z.union([WarehouseItemOrderByWithRelationInputObjectSchema, WarehouseItemOrderByWithRelationInputObjectSchema.array()]).optional(), where: WarehouseItemWhereInputObjectSchema.optional(), cursor: WarehouseItemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([WarehouseItemScalarFieldEnumSchema, WarehouseItemScalarFieldEnumSchema.array()]).optional() }).strict();