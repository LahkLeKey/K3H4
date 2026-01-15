import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingRoleIncludeObjectSchema as StaffingRoleIncludeObjectSchema } from './objects/StaffingRoleInclude.schema';
import { StaffingRoleOrderByWithRelationInputObjectSchema as StaffingRoleOrderByWithRelationInputObjectSchema } from './objects/StaffingRoleOrderByWithRelationInput.schema';
import { StaffingRoleWhereInputObjectSchema as StaffingRoleWhereInputObjectSchema } from './objects/StaffingRoleWhereInput.schema';
import { StaffingRoleWhereUniqueInputObjectSchema as StaffingRoleWhereUniqueInputObjectSchema } from './objects/StaffingRoleWhereUniqueInput.schema';
import { StaffingRoleScalarFieldEnumSchema } from './enums/StaffingRoleScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const StaffingRoleFindManySelectSchema: z.ZodType<Prisma.StaffingRoleSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    engagementId: z.boolean().optional(),
    engagement: z.boolean().optional(),
    title: z.boolean().optional(),
    location: z.boolean().optional(),
    modality: z.boolean().optional(),
    openings: z.boolean().optional(),
    filled: z.boolean().optional(),
    priority: z.boolean().optional(),
    status: z.boolean().optional(),
    rateMin: z.boolean().optional(),
    rateMax: z.boolean().optional(),
    billRate: z.boolean().optional(),
    payRate: z.boolean().optional(),
    tags: z.boolean().optional(),
    skills: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    candidates: z.boolean().optional(),
    shifts: z.boolean().optional(),
    placements: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.StaffingRoleSelect>;

export const StaffingRoleFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    engagementId: z.boolean().optional(),
    engagement: z.boolean().optional(),
    title: z.boolean().optional(),
    location: z.boolean().optional(),
    modality: z.boolean().optional(),
    openings: z.boolean().optional(),
    filled: z.boolean().optional(),
    priority: z.boolean().optional(),
    status: z.boolean().optional(),
    rateMin: z.boolean().optional(),
    rateMax: z.boolean().optional(),
    billRate: z.boolean().optional(),
    payRate: z.boolean().optional(),
    tags: z.boolean().optional(),
    skills: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    candidates: z.boolean().optional(),
    shifts: z.boolean().optional(),
    placements: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const StaffingRoleFindManySchema: z.ZodType<Prisma.StaffingRoleFindManyArgs> = z.object({ select: StaffingRoleFindManySelectSchema.optional(), include: z.lazy(() => StaffingRoleIncludeObjectSchema.optional()), orderBy: z.union([StaffingRoleOrderByWithRelationInputObjectSchema, StaffingRoleOrderByWithRelationInputObjectSchema.array()]).optional(), where: StaffingRoleWhereInputObjectSchema.optional(), cursor: StaffingRoleWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([StaffingRoleScalarFieldEnumSchema, StaffingRoleScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.StaffingRoleFindManyArgs>;

export const StaffingRoleFindManyZodSchema = z.object({ select: StaffingRoleFindManySelectSchema.optional(), include: z.lazy(() => StaffingRoleIncludeObjectSchema.optional()), orderBy: z.union([StaffingRoleOrderByWithRelationInputObjectSchema, StaffingRoleOrderByWithRelationInputObjectSchema.array()]).optional(), where: StaffingRoleWhereInputObjectSchema.optional(), cursor: StaffingRoleWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([StaffingRoleScalarFieldEnumSchema, StaffingRoleScalarFieldEnumSchema.array()]).optional() }).strict();