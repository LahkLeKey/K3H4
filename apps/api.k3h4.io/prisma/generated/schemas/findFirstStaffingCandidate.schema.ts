import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingCandidateIncludeObjectSchema as StaffingCandidateIncludeObjectSchema } from './objects/StaffingCandidateInclude.schema';
import { StaffingCandidateOrderByWithRelationInputObjectSchema as StaffingCandidateOrderByWithRelationInputObjectSchema } from './objects/StaffingCandidateOrderByWithRelationInput.schema';
import { StaffingCandidateWhereInputObjectSchema as StaffingCandidateWhereInputObjectSchema } from './objects/StaffingCandidateWhereInput.schema';
import { StaffingCandidateWhereUniqueInputObjectSchema as StaffingCandidateWhereUniqueInputObjectSchema } from './objects/StaffingCandidateWhereUniqueInput.schema';
import { StaffingCandidateScalarFieldEnumSchema } from './enums/StaffingCandidateScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const StaffingCandidateFindFirstSelectSchema: z.ZodType<Prisma.StaffingCandidateSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    engagementId: z.boolean().optional(),
    engagement: z.boolean().optional(),
    roleId: z.boolean().optional(),
    role: z.boolean().optional(),
    personaId: z.boolean().optional(),
    persona: z.boolean().optional(),
    fullName: z.boolean().optional(),
    email: z.boolean().optional(),
    phone: z.boolean().optional(),
    source: z.boolean().optional(),
    stage: z.boolean().optional(),
    score: z.boolean().optional(),
    desiredRate: z.boolean().optional(),
    availability: z.boolean().optional(),
    location: z.boolean().optional(),
    note: z.boolean().optional(),
    tags: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    placements: z.boolean().optional(),
    shiftsAssigned: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.StaffingCandidateSelect>;

export const StaffingCandidateFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    engagementId: z.boolean().optional(),
    engagement: z.boolean().optional(),
    roleId: z.boolean().optional(),
    role: z.boolean().optional(),
    personaId: z.boolean().optional(),
    persona: z.boolean().optional(),
    fullName: z.boolean().optional(),
    email: z.boolean().optional(),
    phone: z.boolean().optional(),
    source: z.boolean().optional(),
    stage: z.boolean().optional(),
    score: z.boolean().optional(),
    desiredRate: z.boolean().optional(),
    availability: z.boolean().optional(),
    location: z.boolean().optional(),
    note: z.boolean().optional(),
    tags: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    placements: z.boolean().optional(),
    shiftsAssigned: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const StaffingCandidateFindFirstSchema: z.ZodType<Prisma.StaffingCandidateFindFirstArgs> = z.object({ select: StaffingCandidateFindFirstSelectSchema.optional(), include: z.lazy(() => StaffingCandidateIncludeObjectSchema.optional()), orderBy: z.union([StaffingCandidateOrderByWithRelationInputObjectSchema, StaffingCandidateOrderByWithRelationInputObjectSchema.array()]).optional(), where: StaffingCandidateWhereInputObjectSchema.optional(), cursor: StaffingCandidateWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([StaffingCandidateScalarFieldEnumSchema, StaffingCandidateScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.StaffingCandidateFindFirstArgs>;

export const StaffingCandidateFindFirstZodSchema = z.object({ select: StaffingCandidateFindFirstSelectSchema.optional(), include: z.lazy(() => StaffingCandidateIncludeObjectSchema.optional()), orderBy: z.union([StaffingCandidateOrderByWithRelationInputObjectSchema, StaffingCandidateOrderByWithRelationInputObjectSchema.array()]).optional(), where: StaffingCandidateWhereInputObjectSchema.optional(), cursor: StaffingCandidateWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([StaffingCandidateScalarFieldEnumSchema, StaffingCandidateScalarFieldEnumSchema.array()]).optional() }).strict();