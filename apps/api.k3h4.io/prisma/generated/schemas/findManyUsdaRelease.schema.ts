import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaReleaseOrderByWithRelationInputObjectSchema as UsdaReleaseOrderByWithRelationInputObjectSchema } from './objects/UsdaReleaseOrderByWithRelationInput.schema';
import { UsdaReleaseWhereInputObjectSchema as UsdaReleaseWhereInputObjectSchema } from './objects/UsdaReleaseWhereInput.schema';
import { UsdaReleaseWhereUniqueInputObjectSchema as UsdaReleaseWhereUniqueInputObjectSchema } from './objects/UsdaReleaseWhereUniqueInput.schema';
import { UsdaReleaseScalarFieldEnumSchema } from './enums/UsdaReleaseScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UsdaReleaseFindManySelectSchema: z.ZodType<Prisma.UsdaReleaseSelect> = z.object({
    id: z.boolean().optional(),
    dataset: z.boolean().optional(),
    scope: z.boolean().optional(),
    releasedOn: z.boolean().optional(),
    note: z.boolean().optional(),
    fetchedAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.UsdaReleaseSelect>;

export const UsdaReleaseFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    dataset: z.boolean().optional(),
    scope: z.boolean().optional(),
    releasedOn: z.boolean().optional(),
    note: z.boolean().optional(),
    fetchedAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const UsdaReleaseFindManySchema: z.ZodType<Prisma.UsdaReleaseFindManyArgs> = z.object({ select: UsdaReleaseFindManySelectSchema.optional(),  orderBy: z.union([UsdaReleaseOrderByWithRelationInputObjectSchema, UsdaReleaseOrderByWithRelationInputObjectSchema.array()]).optional(), where: UsdaReleaseWhereInputObjectSchema.optional(), cursor: UsdaReleaseWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([UsdaReleaseScalarFieldEnumSchema, UsdaReleaseScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.UsdaReleaseFindManyArgs>;

export const UsdaReleaseFindManyZodSchema = z.object({ select: UsdaReleaseFindManySelectSchema.optional(),  orderBy: z.union([UsdaReleaseOrderByWithRelationInputObjectSchema, UsdaReleaseOrderByWithRelationInputObjectSchema.array()]).optional(), where: UsdaReleaseWhereInputObjectSchema.optional(), cursor: UsdaReleaseWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([UsdaReleaseScalarFieldEnumSchema, UsdaReleaseScalarFieldEnumSchema.array()]).optional() }).strict();