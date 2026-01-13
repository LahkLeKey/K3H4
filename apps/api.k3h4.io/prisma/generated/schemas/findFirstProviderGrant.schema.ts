import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProviderGrantIncludeObjectSchema as ProviderGrantIncludeObjectSchema } from './objects/ProviderGrantInclude.schema';
import { ProviderGrantOrderByWithRelationInputObjectSchema as ProviderGrantOrderByWithRelationInputObjectSchema } from './objects/ProviderGrantOrderByWithRelationInput.schema';
import { ProviderGrantWhereInputObjectSchema as ProviderGrantWhereInputObjectSchema } from './objects/ProviderGrantWhereInput.schema';
import { ProviderGrantWhereUniqueInputObjectSchema as ProviderGrantWhereUniqueInputObjectSchema } from './objects/ProviderGrantWhereUniqueInput.schema';
import { ProviderGrantScalarFieldEnumSchema } from './enums/ProviderGrantScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ProviderGrantFindFirstSelectSchema: z.ZodType<Prisma.ProviderGrantSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    provider: z.boolean().optional(),
    providerId: z.boolean().optional(),
    accessToken: z.boolean().optional(),
    scope: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ProviderGrantSelect>;

export const ProviderGrantFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    provider: z.boolean().optional(),
    providerId: z.boolean().optional(),
    accessToken: z.boolean().optional(),
    scope: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict();

export const ProviderGrantFindFirstSchema: z.ZodType<Prisma.ProviderGrantFindFirstArgs> = z.object({ select: ProviderGrantFindFirstSelectSchema.optional(), include: z.lazy(() => ProviderGrantIncludeObjectSchema.optional()), orderBy: z.union([ProviderGrantOrderByWithRelationInputObjectSchema, ProviderGrantOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProviderGrantWhereInputObjectSchema.optional(), cursor: ProviderGrantWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ProviderGrantScalarFieldEnumSchema, ProviderGrantScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ProviderGrantFindFirstArgs>;

export const ProviderGrantFindFirstZodSchema = z.object({ select: ProviderGrantFindFirstSelectSchema.optional(), include: z.lazy(() => ProviderGrantIncludeObjectSchema.optional()), orderBy: z.union([ProviderGrantOrderByWithRelationInputObjectSchema, ProviderGrantOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProviderGrantWhereInputObjectSchema.optional(), cursor: ProviderGrantWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ProviderGrantScalarFieldEnumSchema, ProviderGrantScalarFieldEnumSchema.array()]).optional() }).strict();