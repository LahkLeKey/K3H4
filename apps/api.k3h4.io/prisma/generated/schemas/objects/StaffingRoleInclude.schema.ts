import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { StaffingEngagementArgsObjectSchema as StaffingEngagementArgsObjectSchema } from './StaffingEngagementArgs.schema';
import { StaffingCandidateFindManySchema as StaffingCandidateFindManySchema } from '../findManyStaffingCandidate.schema';
import { StaffingShiftFindManySchema as StaffingShiftFindManySchema } from '../findManyStaffingShift.schema';
import { StaffingPlacementFindManySchema as StaffingPlacementFindManySchema } from '../findManyStaffingPlacement.schema';
import { StaffingRoleCountOutputTypeArgsObjectSchema as StaffingRoleCountOutputTypeArgsObjectSchema } from './StaffingRoleCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  engagement: z.union([z.boolean(), z.lazy(() => StaffingEngagementArgsObjectSchema)]).optional(),
  candidates: z.union([z.boolean(), z.lazy(() => StaffingCandidateFindManySchema)]).optional(),
  shifts: z.union([z.boolean(), z.lazy(() => StaffingShiftFindManySchema)]).optional(),
  placements: z.union([z.boolean(), z.lazy(() => StaffingPlacementFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => StaffingRoleCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const StaffingRoleIncludeObjectSchema: z.ZodType<Prisma.StaffingRoleInclude> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleInclude>;
export const StaffingRoleIncludeObjectZodSchema = makeSchema();
