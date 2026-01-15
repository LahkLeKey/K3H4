import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  roleId: z.literal(true).optional(),
  title: z.literal(true).optional(),
  location: z.literal(true).optional(),
  startsAt: z.literal(true).optional(),
  endsAt: z.literal(true).optional(),
  status: z.literal(true).optional(),
  coverageStatus: z.literal(true).optional(),
  assignedPersonaId: z.literal(true).optional(),
  assignedCandidateId: z.literal(true).optional(),
  notes: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const StaffingShiftMinAggregateInputObjectSchema: z.ZodType<Prisma.StaffingShiftMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftMinAggregateInputType>;
export const StaffingShiftMinAggregateInputObjectZodSchema = makeSchema();
