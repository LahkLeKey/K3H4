import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosStoreIncludeObjectSchema as PosStoreIncludeObjectSchema } from './objects/PosStoreInclude.schema';
import { PosStoreOrderByWithRelationInputObjectSchema as PosStoreOrderByWithRelationInputObjectSchema } from './objects/PosStoreOrderByWithRelationInput.schema';
import { PosStoreWhereInputObjectSchema as PosStoreWhereInputObjectSchema } from './objects/PosStoreWhereInput.schema';
import { PosStoreWhereUniqueInputObjectSchema as PosStoreWhereUniqueInputObjectSchema } from './objects/PosStoreWhereUniqueInput.schema';
import { PosStoreScalarFieldEnumSchema } from './enums/PosStoreScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PosStoreFindManySelectSchema: z.ZodType<Prisma.PosStoreSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    name: z.boolean().optional(),
    channel: z.boolean().optional(),
    tickets: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.PosStoreSelect>;

export const PosStoreFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    name: z.boolean().optional(),
    channel: z.boolean().optional(),
    tickets: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const PosStoreFindManySchema: z.ZodType<Prisma.PosStoreFindManyArgs> = z.object({ select: PosStoreFindManySelectSchema.optional(), include: z.lazy(() => PosStoreIncludeObjectSchema.optional()), orderBy: z.union([PosStoreOrderByWithRelationInputObjectSchema, PosStoreOrderByWithRelationInputObjectSchema.array()]).optional(), where: PosStoreWhereInputObjectSchema.optional(), cursor: PosStoreWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PosStoreScalarFieldEnumSchema, PosStoreScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.PosStoreFindManyArgs>;

export const PosStoreFindManyZodSchema = z.object({ select: PosStoreFindManySelectSchema.optional(), include: z.lazy(() => PosStoreIncludeObjectSchema.optional()), orderBy: z.union([PosStoreOrderByWithRelationInputObjectSchema, PosStoreOrderByWithRelationInputObjectSchema.array()]).optional(), where: PosStoreWhereInputObjectSchema.optional(), cursor: PosStoreWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PosStoreScalarFieldEnumSchema, PosStoreScalarFieldEnumSchema.array()]).optional() }).strict();