import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { StaffingEngagementArgsObjectSchema as StaffingEngagementArgsObjectSchema } from './StaffingEngagementArgs.schema';
import { StaffingRoleArgsObjectSchema as StaffingRoleArgsObjectSchema } from './StaffingRoleArgs.schema';
import { PersonaArgsObjectSchema as PersonaArgsObjectSchema } from './PersonaArgs.schema';
import { StaffingPlacementFindManySchema as StaffingPlacementFindManySchema } from '../findManyStaffingPlacement.schema';
import { StaffingShiftFindManySchema as StaffingShiftFindManySchema } from '../findManyStaffingShift.schema';
import { StaffingCandidateCountOutputTypeArgsObjectSchema as StaffingCandidateCountOutputTypeArgsObjectSchema } from './StaffingCandidateCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  engagement: z.union([z.boolean(), z.lazy(() => StaffingEngagementArgsObjectSchema)]).optional(),
  role: z.union([z.boolean(), z.lazy(() => StaffingRoleArgsObjectSchema)]).optional(),
  persona: z.union([z.boolean(), z.lazy(() => PersonaArgsObjectSchema)]).optional(),
  placements: z.union([z.boolean(), z.lazy(() => StaffingPlacementFindManySchema)]).optional(),
  shiftsAssigned: z.union([z.boolean(), z.lazy(() => StaffingShiftFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => StaffingCandidateCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const StaffingCandidateIncludeObjectSchema: z.ZodType<Prisma.StaffingCandidateInclude> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateInclude>;
export const StaffingCandidateIncludeObjectZodSchema = makeSchema();
