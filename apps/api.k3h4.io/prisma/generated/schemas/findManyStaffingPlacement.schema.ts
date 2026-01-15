import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingPlacementIncludeObjectSchema as StaffingPlacementIncludeObjectSchema } from './objects/StaffingPlacementInclude.schema';
import { StaffingPlacementOrderByWithRelationInputObjectSchema as StaffingPlacementOrderByWithRelationInputObjectSchema } from './objects/StaffingPlacementOrderByWithRelationInput.schema';
import { StaffingPlacementWhereInputObjectSchema as StaffingPlacementWhereInputObjectSchema } from './objects/StaffingPlacementWhereInput.schema';
import { StaffingPlacementWhereUniqueInputObjectSchema as StaffingPlacementWhereUniqueInputObjectSchema } from './objects/StaffingPlacementWhereUniqueInput.schema';
import { StaffingPlacementScalarFieldEnumSchema } from './enums/StaffingPlacementScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const StaffingPlacementFindManySelectSchema: z.ZodType<Prisma.StaffingPlacementSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    engagementId: z.boolean().optional(),
    engagement: z.boolean().optional(),
    roleId: z.boolean().optional(),
    role: z.boolean().optional(),
    candidateId: z.boolean().optional(),
    candidate: z.boolean().optional(),
    personaId: z.boolean().optional(),
    persona: z.boolean().optional(),
    startDate: z.boolean().optional(),
    endDate: z.boolean().optional(),
    status: z.boolean().optional(),
    billRate: z.boolean().optional(),
    payRate: z.boolean().optional(),
    margin: z.boolean().optional(),
    note: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.StaffingPlacementSelect>;

export const StaffingPlacementFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    engagementId: z.boolean().optional(),
    engagement: z.boolean().optional(),
    roleId: z.boolean().optional(),
    role: z.boolean().optional(),
    candidateId: z.boolean().optional(),
    candidate: z.boolean().optional(),
    personaId: z.boolean().optional(),
    persona: z.boolean().optional(),
    startDate: z.boolean().optional(),
    endDate: z.boolean().optional(),
    status: z.boolean().optional(),
    billRate: z.boolean().optional(),
    payRate: z.boolean().optional(),
    margin: z.boolean().optional(),
    note: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const StaffingPlacementFindManySchema: z.ZodType<Prisma.StaffingPlacementFindManyArgs> = z.object({ select: StaffingPlacementFindManySelectSchema.optional(), include: z.lazy(() => StaffingPlacementIncludeObjectSchema.optional()), orderBy: z.union([StaffingPlacementOrderByWithRelationInputObjectSchema, StaffingPlacementOrderByWithRelationInputObjectSchema.array()]).optional(), where: StaffingPlacementWhereInputObjectSchema.optional(), cursor: StaffingPlacementWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([StaffingPlacementScalarFieldEnumSchema, StaffingPlacementScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.StaffingPlacementFindManyArgs>;

export const StaffingPlacementFindManyZodSchema = z.object({ select: StaffingPlacementFindManySelectSchema.optional(), include: z.lazy(() => StaffingPlacementIncludeObjectSchema.optional()), orderBy: z.union([StaffingPlacementOrderByWithRelationInputObjectSchema, StaffingPlacementOrderByWithRelationInputObjectSchema.array()]).optional(), where: StaffingPlacementWhereInputObjectSchema.optional(), cursor: StaffingPlacementWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([StaffingPlacementScalarFieldEnumSchema, StaffingPlacementScalarFieldEnumSchema.array()]).optional() }).strict();