import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingEngagementIncludeObjectSchema as StaffingEngagementIncludeObjectSchema } from './objects/StaffingEngagementInclude.schema';
import { StaffingEngagementOrderByWithRelationInputObjectSchema as StaffingEngagementOrderByWithRelationInputObjectSchema } from './objects/StaffingEngagementOrderByWithRelationInput.schema';
import { StaffingEngagementWhereInputObjectSchema as StaffingEngagementWhereInputObjectSchema } from './objects/StaffingEngagementWhereInput.schema';
import { StaffingEngagementWhereUniqueInputObjectSchema as StaffingEngagementWhereUniqueInputObjectSchema } from './objects/StaffingEngagementWhereUniqueInput.schema';
import { StaffingEngagementScalarFieldEnumSchema } from './enums/StaffingEngagementScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const StaffingEngagementFindFirstSelectSchema: z.ZodType<Prisma.StaffingEngagementSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    name: z.boolean().optional(),
    client: z.boolean().optional(),
    priority: z.boolean().optional(),
    status: z.boolean().optional(),
    startDate: z.boolean().optional(),
    endDate: z.boolean().optional(),
    budget: z.boolean().optional(),
    forecast: z.boolean().optional(),
    notes: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    roles: z.boolean().optional(),
    candidates: z.boolean().optional(),
    placements: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.StaffingEngagementSelect>;

export const StaffingEngagementFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    name: z.boolean().optional(),
    client: z.boolean().optional(),
    priority: z.boolean().optional(),
    status: z.boolean().optional(),
    startDate: z.boolean().optional(),
    endDate: z.boolean().optional(),
    budget: z.boolean().optional(),
    forecast: z.boolean().optional(),
    notes: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    roles: z.boolean().optional(),
    candidates: z.boolean().optional(),
    placements: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const StaffingEngagementFindFirstSchema: z.ZodType<Prisma.StaffingEngagementFindFirstArgs> = z.object({ select: StaffingEngagementFindFirstSelectSchema.optional(), include: z.lazy(() => StaffingEngagementIncludeObjectSchema.optional()), orderBy: z.union([StaffingEngagementOrderByWithRelationInputObjectSchema, StaffingEngagementOrderByWithRelationInputObjectSchema.array()]).optional(), where: StaffingEngagementWhereInputObjectSchema.optional(), cursor: StaffingEngagementWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([StaffingEngagementScalarFieldEnumSchema, StaffingEngagementScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.StaffingEngagementFindFirstArgs>;

export const StaffingEngagementFindFirstZodSchema = z.object({ select: StaffingEngagementFindFirstSelectSchema.optional(), include: z.lazy(() => StaffingEngagementIncludeObjectSchema.optional()), orderBy: z.union([StaffingEngagementOrderByWithRelationInputObjectSchema, StaffingEngagementOrderByWithRelationInputObjectSchema.array()]).optional(), where: StaffingEngagementWhereInputObjectSchema.optional(), cursor: StaffingEngagementWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([StaffingEngagementScalarFieldEnumSchema, StaffingEngagementScalarFieldEnumSchema.array()]).optional() }).strict();