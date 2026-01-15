import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingShiftIncludeObjectSchema as StaffingShiftIncludeObjectSchema } from './objects/StaffingShiftInclude.schema';
import { StaffingShiftOrderByWithRelationInputObjectSchema as StaffingShiftOrderByWithRelationInputObjectSchema } from './objects/StaffingShiftOrderByWithRelationInput.schema';
import { StaffingShiftWhereInputObjectSchema as StaffingShiftWhereInputObjectSchema } from './objects/StaffingShiftWhereInput.schema';
import { StaffingShiftWhereUniqueInputObjectSchema as StaffingShiftWhereUniqueInputObjectSchema } from './objects/StaffingShiftWhereUniqueInput.schema';
import { StaffingShiftScalarFieldEnumSchema } from './enums/StaffingShiftScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const StaffingShiftFindFirstOrThrowSelectSchema: z.ZodType<Prisma.StaffingShiftSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    roleId: z.boolean().optional(),
    role: z.boolean().optional(),
    title: z.boolean().optional(),
    location: z.boolean().optional(),
    startsAt: z.boolean().optional(),
    endsAt: z.boolean().optional(),
    status: z.boolean().optional(),
    coverageStatus: z.boolean().optional(),
    assignedPersonaId: z.boolean().optional(),
    assignedPersona: z.boolean().optional(),
    assignedCandidateId: z.boolean().optional(),
    assignedCandidate: z.boolean().optional(),
    notes: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.StaffingShiftSelect>;

export const StaffingShiftFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    roleId: z.boolean().optional(),
    role: z.boolean().optional(),
    title: z.boolean().optional(),
    location: z.boolean().optional(),
    startsAt: z.boolean().optional(),
    endsAt: z.boolean().optional(),
    status: z.boolean().optional(),
    coverageStatus: z.boolean().optional(),
    assignedPersonaId: z.boolean().optional(),
    assignedPersona: z.boolean().optional(),
    assignedCandidateId: z.boolean().optional(),
    assignedCandidate: z.boolean().optional(),
    notes: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const StaffingShiftFindFirstOrThrowSchema: z.ZodType<Prisma.StaffingShiftFindFirstOrThrowArgs> = z.object({ select: StaffingShiftFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => StaffingShiftIncludeObjectSchema.optional()), orderBy: z.union([StaffingShiftOrderByWithRelationInputObjectSchema, StaffingShiftOrderByWithRelationInputObjectSchema.array()]).optional(), where: StaffingShiftWhereInputObjectSchema.optional(), cursor: StaffingShiftWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([StaffingShiftScalarFieldEnumSchema, StaffingShiftScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.StaffingShiftFindFirstOrThrowArgs>;

export const StaffingShiftFindFirstOrThrowZodSchema = z.object({ select: StaffingShiftFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => StaffingShiftIncludeObjectSchema.optional()), orderBy: z.union([StaffingShiftOrderByWithRelationInputObjectSchema, StaffingShiftOrderByWithRelationInputObjectSchema.array()]).optional(), where: StaffingShiftWhereInputObjectSchema.optional(), cursor: StaffingShiftWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([StaffingShiftScalarFieldEnumSchema, StaffingShiftScalarFieldEnumSchema.array()]).optional() }).strict();