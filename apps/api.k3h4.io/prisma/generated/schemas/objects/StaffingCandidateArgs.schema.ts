import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateSelectObjectSchema as StaffingCandidateSelectObjectSchema } from './StaffingCandidateSelect.schema';
import { StaffingCandidateIncludeObjectSchema as StaffingCandidateIncludeObjectSchema } from './StaffingCandidateInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => StaffingCandidateSelectObjectSchema).optional(),
  include: z.lazy(() => StaffingCandidateIncludeObjectSchema).optional()
}).strict();
export const StaffingCandidateArgsObjectSchema = makeSchema();
export const StaffingCandidateArgsObjectZodSchema = makeSchema();
