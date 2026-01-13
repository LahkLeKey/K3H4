import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CulinaryPrepTaskIncludeObjectSchema as CulinaryPrepTaskIncludeObjectSchema } from './objects/CulinaryPrepTaskInclude.schema';
import { CulinaryPrepTaskOrderByWithRelationInputObjectSchema as CulinaryPrepTaskOrderByWithRelationInputObjectSchema } from './objects/CulinaryPrepTaskOrderByWithRelationInput.schema';
import { CulinaryPrepTaskWhereInputObjectSchema as CulinaryPrepTaskWhereInputObjectSchema } from './objects/CulinaryPrepTaskWhereInput.schema';
import { CulinaryPrepTaskWhereUniqueInputObjectSchema as CulinaryPrepTaskWhereUniqueInputObjectSchema } from './objects/CulinaryPrepTaskWhereUniqueInput.schema';
import { CulinaryPrepTaskScalarFieldEnumSchema } from './enums/CulinaryPrepTaskScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CulinaryPrepTaskFindFirstSelectSchema: z.ZodType<Prisma.CulinaryPrepTaskSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    task: z.boolean().optional(),
    station: z.boolean().optional(),
    dueAt: z.boolean().optional(),
    status: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.CulinaryPrepTaskSelect>;

export const CulinaryPrepTaskFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    task: z.boolean().optional(),
    station: z.boolean().optional(),
    dueAt: z.boolean().optional(),
    status: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const CulinaryPrepTaskFindFirstSchema: z.ZodType<Prisma.CulinaryPrepTaskFindFirstArgs> = z.object({ select: CulinaryPrepTaskFindFirstSelectSchema.optional(), include: z.lazy(() => CulinaryPrepTaskIncludeObjectSchema.optional()), orderBy: z.union([CulinaryPrepTaskOrderByWithRelationInputObjectSchema, CulinaryPrepTaskOrderByWithRelationInputObjectSchema.array()]).optional(), where: CulinaryPrepTaskWhereInputObjectSchema.optional(), cursor: CulinaryPrepTaskWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CulinaryPrepTaskScalarFieldEnumSchema, CulinaryPrepTaskScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.CulinaryPrepTaskFindFirstArgs>;

export const CulinaryPrepTaskFindFirstZodSchema = z.object({ select: CulinaryPrepTaskFindFirstSelectSchema.optional(), include: z.lazy(() => CulinaryPrepTaskIncludeObjectSchema.optional()), orderBy: z.union([CulinaryPrepTaskOrderByWithRelationInputObjectSchema, CulinaryPrepTaskOrderByWithRelationInputObjectSchema.array()]).optional(), where: CulinaryPrepTaskWhereInputObjectSchema.optional(), cursor: CulinaryPrepTaskWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CulinaryPrepTaskScalarFieldEnumSchema, CulinaryPrepTaskScalarFieldEnumSchema.array()]).optional() }).strict();