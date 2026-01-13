import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaSyncStateOrderByWithRelationInputObjectSchema as UsdaSyncStateOrderByWithRelationInputObjectSchema } from './objects/UsdaSyncStateOrderByWithRelationInput.schema';
import { UsdaSyncStateWhereInputObjectSchema as UsdaSyncStateWhereInputObjectSchema } from './objects/UsdaSyncStateWhereInput.schema';
import { UsdaSyncStateWhereUniqueInputObjectSchema as UsdaSyncStateWhereUniqueInputObjectSchema } from './objects/UsdaSyncStateWhereUniqueInput.schema';
import { UsdaSyncStateScalarFieldEnumSchema } from './enums/UsdaSyncStateScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UsdaSyncStateFindFirstSelectSchema: z.ZodType<Prisma.UsdaSyncStateSelect> = z.object({
    id: z.boolean().optional(),
    dataset: z.boolean().optional(),
    scope: z.boolean().optional(),
    lastReleaseOn: z.boolean().optional(),
    lastSyncedAt: z.boolean().optional(),
    note: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.UsdaSyncStateSelect>;

export const UsdaSyncStateFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    dataset: z.boolean().optional(),
    scope: z.boolean().optional(),
    lastReleaseOn: z.boolean().optional(),
    lastSyncedAt: z.boolean().optional(),
    note: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const UsdaSyncStateFindFirstSchema: z.ZodType<Prisma.UsdaSyncStateFindFirstArgs> = z.object({ select: UsdaSyncStateFindFirstSelectSchema.optional(),  orderBy: z.union([UsdaSyncStateOrderByWithRelationInputObjectSchema, UsdaSyncStateOrderByWithRelationInputObjectSchema.array()]).optional(), where: UsdaSyncStateWhereInputObjectSchema.optional(), cursor: UsdaSyncStateWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([UsdaSyncStateScalarFieldEnumSchema, UsdaSyncStateScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.UsdaSyncStateFindFirstArgs>;

export const UsdaSyncStateFindFirstZodSchema = z.object({ select: UsdaSyncStateFindFirstSelectSchema.optional(),  orderBy: z.union([UsdaSyncStateOrderByWithRelationInputObjectSchema, UsdaSyncStateOrderByWithRelationInputObjectSchema.array()]).optional(), where: UsdaSyncStateWhereInputObjectSchema.optional(), cursor: UsdaSyncStateWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([UsdaSyncStateScalarFieldEnumSchema, UsdaSyncStateScalarFieldEnumSchema.array()]).optional() }).strict();