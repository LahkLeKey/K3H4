import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  roleId: z.string().optional().nullable(),
  title: z.string(),
  location: z.string().optional().nullable(),
  startsAt: z.coerce.date(),
  endsAt: z.coerce.date(),
  status: z.string().optional(),
  coverageStatus: z.string().optional(),
  assignedPersonaId: z.string().optional().nullable(),
  assignedCandidateId: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const StaffingShiftUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.StaffingShiftUncheckedCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftUncheckedCreateWithoutUserInput>;
export const StaffingShiftUncheckedCreateWithoutUserInputObjectZodSchema = makeSchema();
