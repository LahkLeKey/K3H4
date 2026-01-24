import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaUnitOrderByWithRelationInputObjectSchema as UsdaUnitOrderByWithRelationInputObjectSchema } from './objects/UsdaUnitOrderByWithRelationInput.schema';
import { UsdaUnitWhereInputObjectSchema as UsdaUnitWhereInputObjectSchema } from './objects/UsdaUnitWhereInput.schema';
import { UsdaUnitWhereUniqueInputObjectSchema as UsdaUnitWhereUniqueInputObjectSchema } from './objects/UsdaUnitWhereUniqueInput.schema';
import { UsdaUnitScalarFieldEnumSchema } from './enums/UsdaUnitScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UsdaUnitFindManySelectSchema: z.ZodType<Prisma.UsdaUnitSelect> = z.object({
    id: z.boolean().optional(),
    dataset: z.boolean().optional(),
    code: z.boolean().optional(),
    name: z.boolean().optional(),
    wikidataId: z.boolean().optional(),
    enrichment: z.boolean().optional(),
    extra: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.UsdaUnitSelect>;

export const UsdaUnitFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    dataset: z.boolean().optional(),
    code: z.boolean().optional(),
    name: z.boolean().optional(),
    wikidataId: z.boolean().optional(),
    enrichment: z.boolean().optional(),
    extra: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const UsdaUnitFindManySchema: z.ZodType<Prisma.UsdaUnitFindManyArgs> = z.object({ select: UsdaUnitFindManySelectSchema.optional(),  orderBy: z.union([UsdaUnitOrderByWithRelationInputObjectSchema, UsdaUnitOrderByWithRelationInputObjectSchema.array()]).optional(), where: UsdaUnitWhereInputObjectSchema.optional(), cursor: UsdaUnitWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([UsdaUnitScalarFieldEnumSchema, UsdaUnitScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.UsdaUnitFindManyArgs>;

export const UsdaUnitFindManyZodSchema = z.object({ select: UsdaUnitFindManySelectSchema.optional(),  orderBy: z.union([UsdaUnitOrderByWithRelationInputObjectSchema, UsdaUnitOrderByWithRelationInputObjectSchema.array()]).optional(), where: UsdaUnitWhereInputObjectSchema.optional(), cursor: UsdaUnitWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([UsdaUnitScalarFieldEnumSchema, UsdaUnitScalarFieldEnumSchema.array()]).optional() }).strict();