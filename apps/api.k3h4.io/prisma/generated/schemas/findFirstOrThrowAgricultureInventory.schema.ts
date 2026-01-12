import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureInventoryIncludeObjectSchema as AgricultureInventoryIncludeObjectSchema } from './objects/AgricultureInventoryInclude.schema';
import { AgricultureInventoryOrderByWithRelationInputObjectSchema as AgricultureInventoryOrderByWithRelationInputObjectSchema } from './objects/AgricultureInventoryOrderByWithRelationInput.schema';
import { AgricultureInventoryWhereInputObjectSchema as AgricultureInventoryWhereInputObjectSchema } from './objects/AgricultureInventoryWhereInput.schema';
import { AgricultureInventoryWhereUniqueInputObjectSchema as AgricultureInventoryWhereUniqueInputObjectSchema } from './objects/AgricultureInventoryWhereUniqueInput.schema';
import { AgricultureInventoryScalarFieldEnumSchema } from './enums/AgricultureInventoryScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const AgricultureInventoryFindFirstOrThrowSelectSchema: z.ZodType<Prisma.AgricultureInventorySelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    sku: z.boolean().optional(),
    description: z.boolean().optional(),
    totalQuantity: z.boolean().optional(),
    unit: z.boolean().optional(),
    location: z.boolean().optional(),
    status: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    movements: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.AgricultureInventorySelect>;

export const AgricultureInventoryFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    sku: z.boolean().optional(),
    description: z.boolean().optional(),
    totalQuantity: z.boolean().optional(),
    unit: z.boolean().optional(),
    location: z.boolean().optional(),
    status: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    movements: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const AgricultureInventoryFindFirstOrThrowSchema: z.ZodType<Prisma.AgricultureInventoryFindFirstOrThrowArgs> = z.object({ select: AgricultureInventoryFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => AgricultureInventoryIncludeObjectSchema.optional()), orderBy: z.union([AgricultureInventoryOrderByWithRelationInputObjectSchema, AgricultureInventoryOrderByWithRelationInputObjectSchema.array()]).optional(), where: AgricultureInventoryWhereInputObjectSchema.optional(), cursor: AgricultureInventoryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AgricultureInventoryScalarFieldEnumSchema, AgricultureInventoryScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureInventoryFindFirstOrThrowArgs>;

export const AgricultureInventoryFindFirstOrThrowZodSchema = z.object({ select: AgricultureInventoryFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => AgricultureInventoryIncludeObjectSchema.optional()), orderBy: z.union([AgricultureInventoryOrderByWithRelationInputObjectSchema, AgricultureInventoryOrderByWithRelationInputObjectSchema.array()]).optional(), where: AgricultureInventoryWhereInputObjectSchema.optional(), cursor: AgricultureInventoryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AgricultureInventoryScalarFieldEnumSchema, AgricultureInventoryScalarFieldEnumSchema.array()]).optional() }).strict();