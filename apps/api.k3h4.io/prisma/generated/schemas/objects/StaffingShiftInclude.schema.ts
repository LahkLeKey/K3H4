import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { StaffingRoleArgsObjectSchema as StaffingRoleArgsObjectSchema } from './StaffingRoleArgs.schema';
import { PersonaArgsObjectSchema as PersonaArgsObjectSchema } from './PersonaArgs.schema';
import { StaffingCandidateArgsObjectSchema as StaffingCandidateArgsObjectSchema } from './StaffingCandidateArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  role: z.union([z.boolean(), z.lazy(() => StaffingRoleArgsObjectSchema)]).optional(),
  assignedPersona: z.union([z.boolean(), z.lazy(() => PersonaArgsObjectSchema)]).optional(),
  assignedCandidate: z.union([z.boolean(), z.lazy(() => StaffingCandidateArgsObjectSchema)]).optional()
}).strict();
export const StaffingShiftIncludeObjectSchema: z.ZodType<Prisma.StaffingShiftInclude> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftInclude>;
export const StaffingShiftIncludeObjectZodSchema = makeSchema();
