import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { StaffingRoleArgsObjectSchema as StaffingRoleArgsObjectSchema } from './StaffingRoleArgs.schema';
import { PersonaArgsObjectSchema as PersonaArgsObjectSchema } from './PersonaArgs.schema';
import { StaffingCandidateArgsObjectSchema as StaffingCandidateArgsObjectSchema } from './StaffingCandidateArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  roleId: z.boolean().optional(),
  role: z.union([z.boolean(), z.lazy(() => StaffingRoleArgsObjectSchema)]).optional(),
  title: z.boolean().optional(),
  location: z.boolean().optional(),
  startsAt: z.boolean().optional(),
  endsAt: z.boolean().optional(),
  status: z.boolean().optional(),
  coverageStatus: z.boolean().optional(),
  assignedPersonaId: z.boolean().optional(),
  assignedPersona: z.union([z.boolean(), z.lazy(() => PersonaArgsObjectSchema)]).optional(),
  assignedCandidateId: z.boolean().optional(),
  assignedCandidate: z.union([z.boolean(), z.lazy(() => StaffingCandidateArgsObjectSchema)]).optional(),
  notes: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const StaffingShiftSelectObjectSchema: z.ZodType<Prisma.StaffingShiftSelect> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftSelect>;
export const StaffingShiftSelectObjectZodSchema = makeSchema();
