import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCountryOrderByWithRelationInputObjectSchema as UsdaCountryOrderByWithRelationInputObjectSchema } from './objects/UsdaCountryOrderByWithRelationInput.schema';
import { UsdaCountryWhereInputObjectSchema as UsdaCountryWhereInputObjectSchema } from './objects/UsdaCountryWhereInput.schema';
import { UsdaCountryWhereUniqueInputObjectSchema as UsdaCountryWhereUniqueInputObjectSchema } from './objects/UsdaCountryWhereUniqueInput.schema';
import { UsdaCountryScalarFieldEnumSchema } from './enums/UsdaCountryScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UsdaCountryFindFirstOrThrowSelectSchema: z.ZodType<Prisma.UsdaCountrySelect> = z.object({
    id: z.boolean().optional(),
    dataset: z.boolean().optional(),
    code: z.boolean().optional(),
    name: z.boolean().optional(),
    regionCode: z.boolean().optional(),
    extra: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.UsdaCountrySelect>;

export const UsdaCountryFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    dataset: z.boolean().optional(),
    code: z.boolean().optional(),
    name: z.boolean().optional(),
    regionCode: z.boolean().optional(),
    extra: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const UsdaCountryFindFirstOrThrowSchema: z.ZodType<Prisma.UsdaCountryFindFirstOrThrowArgs> = z.object({ select: UsdaCountryFindFirstOrThrowSelectSchema.optional(),  orderBy: z.union([UsdaCountryOrderByWithRelationInputObjectSchema, UsdaCountryOrderByWithRelationInputObjectSchema.array()]).optional(), where: UsdaCountryWhereInputObjectSchema.optional(), cursor: UsdaCountryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([UsdaCountryScalarFieldEnumSchema, UsdaCountryScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.UsdaCountryFindFirstOrThrowArgs>;

export const UsdaCountryFindFirstOrThrowZodSchema = z.object({ select: UsdaCountryFindFirstOrThrowSelectSchema.optional(),  orderBy: z.union([UsdaCountryOrderByWithRelationInputObjectSchema, UsdaCountryOrderByWithRelationInputObjectSchema.array()]).optional(), where: UsdaCountryWhereInputObjectSchema.optional(), cursor: UsdaCountryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([UsdaCountryScalarFieldEnumSchema, UsdaCountryScalarFieldEnumSchema.array()]).optional() }).strict();