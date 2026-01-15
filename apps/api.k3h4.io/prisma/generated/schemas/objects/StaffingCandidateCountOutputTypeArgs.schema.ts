import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateCountOutputTypeSelectObjectSchema as StaffingCandidateCountOutputTypeSelectObjectSchema } from './StaffingCandidateCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => StaffingCandidateCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const StaffingCandidateCountOutputTypeArgsObjectSchema = makeSchema();
export const StaffingCandidateCountOutputTypeArgsObjectZodSchema = makeSchema();
