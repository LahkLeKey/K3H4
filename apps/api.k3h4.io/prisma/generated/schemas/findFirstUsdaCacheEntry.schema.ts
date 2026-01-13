import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCacheEntryOrderByWithRelationInputObjectSchema as UsdaCacheEntryOrderByWithRelationInputObjectSchema } from './objects/UsdaCacheEntryOrderByWithRelationInput.schema';
import { UsdaCacheEntryWhereInputObjectSchema as UsdaCacheEntryWhereInputObjectSchema } from './objects/UsdaCacheEntryWhereInput.schema';
import { UsdaCacheEntryWhereUniqueInputObjectSchema as UsdaCacheEntryWhereUniqueInputObjectSchema } from './objects/UsdaCacheEntryWhereUniqueInput.schema';
import { UsdaCacheEntryScalarFieldEnumSchema } from './enums/UsdaCacheEntryScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UsdaCacheEntryFindFirstSelectSchema: z.ZodType<Prisma.UsdaCacheEntrySelect> = z.object({
    id: z.boolean().optional(),
    dataset: z.boolean().optional(),
    endpoint: z.boolean().optional(),
    params: z.boolean().optional(),
    paramsHash: z.boolean().optional(),
    payload: z.boolean().optional(),
    fetchedAt: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.UsdaCacheEntrySelect>;

export const UsdaCacheEntryFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    dataset: z.boolean().optional(),
    endpoint: z.boolean().optional(),
    params: z.boolean().optional(),
    paramsHash: z.boolean().optional(),
    payload: z.boolean().optional(),
    fetchedAt: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const UsdaCacheEntryFindFirstSchema: z.ZodType<Prisma.UsdaCacheEntryFindFirstArgs> = z.object({ select: UsdaCacheEntryFindFirstSelectSchema.optional(),  orderBy: z.union([UsdaCacheEntryOrderByWithRelationInputObjectSchema, UsdaCacheEntryOrderByWithRelationInputObjectSchema.array()]).optional(), where: UsdaCacheEntryWhereInputObjectSchema.optional(), cursor: UsdaCacheEntryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([UsdaCacheEntryScalarFieldEnumSchema, UsdaCacheEntryScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.UsdaCacheEntryFindFirstArgs>;

export const UsdaCacheEntryFindFirstZodSchema = z.object({ select: UsdaCacheEntryFindFirstSelectSchema.optional(),  orderBy: z.union([UsdaCacheEntryOrderByWithRelationInputObjectSchema, UsdaCacheEntryOrderByWithRelationInputObjectSchema.array()]).optional(), where: UsdaCacheEntryWhereInputObjectSchema.optional(), cursor: UsdaCacheEntryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([UsdaCacheEntryScalarFieldEnumSchema, UsdaCacheEntryScalarFieldEnumSchema.array()]).optional() }).strict();