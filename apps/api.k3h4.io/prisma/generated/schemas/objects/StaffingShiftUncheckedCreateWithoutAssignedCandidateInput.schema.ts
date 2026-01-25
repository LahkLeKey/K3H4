import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { CoverageStatusSchema } from '../enums/CoverageStatus.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  roleId: z.string().optional().nullable(),
  title: z.string(),
  location: z.string().optional().nullable(),
  startsAt: z.coerce.date(),
  endsAt: z.coerce.date(),
  status: LifecycleStatusSchema.optional(),
  coverageStatus: CoverageStatusSchema.optional(),
  assignedPersonaId: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const StaffingShiftUncheckedCreateWithoutAssignedCandidateInputObjectSchema: z.ZodType<Prisma.StaffingShiftUncheckedCreateWithoutAssignedCandidateInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftUncheckedCreateWithoutAssignedCandidateInput>;
export const StaffingShiftUncheckedCreateWithoutAssignedCandidateInputObjectZodSchema = makeSchema();
