import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CulinarySupplierNeedIncludeObjectSchema as CulinarySupplierNeedIncludeObjectSchema } from './objects/CulinarySupplierNeedInclude.schema';
import { CulinarySupplierNeedOrderByWithRelationInputObjectSchema as CulinarySupplierNeedOrderByWithRelationInputObjectSchema } from './objects/CulinarySupplierNeedOrderByWithRelationInput.schema';
import { CulinarySupplierNeedWhereInputObjectSchema as CulinarySupplierNeedWhereInputObjectSchema } from './objects/CulinarySupplierNeedWhereInput.schema';
import { CulinarySupplierNeedWhereUniqueInputObjectSchema as CulinarySupplierNeedWhereUniqueInputObjectSchema } from './objects/CulinarySupplierNeedWhereUniqueInput.schema';
import { CulinarySupplierNeedScalarFieldEnumSchema } from './enums/CulinarySupplierNeedScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CulinarySupplierNeedFindFirstSelectSchema: z.ZodType<Prisma.CulinarySupplierNeedSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    item: z.boolean().optional(),
    quantity: z.boolean().optional(),
    status: z.boolean().optional(),
    dueDate: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.CulinarySupplierNeedSelect>;

export const CulinarySupplierNeedFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    item: z.boolean().optional(),
    quantity: z.boolean().optional(),
    status: z.boolean().optional(),
    dueDate: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const CulinarySupplierNeedFindFirstSchema: z.ZodType<Prisma.CulinarySupplierNeedFindFirstArgs> = z.object({ select: CulinarySupplierNeedFindFirstSelectSchema.optional(), include: z.lazy(() => CulinarySupplierNeedIncludeObjectSchema.optional()), orderBy: z.union([CulinarySupplierNeedOrderByWithRelationInputObjectSchema, CulinarySupplierNeedOrderByWithRelationInputObjectSchema.array()]).optional(), where: CulinarySupplierNeedWhereInputObjectSchema.optional(), cursor: CulinarySupplierNeedWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CulinarySupplierNeedScalarFieldEnumSchema, CulinarySupplierNeedScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.CulinarySupplierNeedFindFirstArgs>;

export const CulinarySupplierNeedFindFirstZodSchema = z.object({ select: CulinarySupplierNeedFindFirstSelectSchema.optional(), include: z.lazy(() => CulinarySupplierNeedIncludeObjectSchema.optional()), orderBy: z.union([CulinarySupplierNeedOrderByWithRelationInputObjectSchema, CulinarySupplierNeedOrderByWithRelationInputObjectSchema.array()]).optional(), where: CulinarySupplierNeedWhereInputObjectSchema.optional(), cursor: CulinarySupplierNeedWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CulinarySupplierNeedScalarFieldEnumSchema, CulinarySupplierNeedScalarFieldEnumSchema.array()]).optional() }).strict();