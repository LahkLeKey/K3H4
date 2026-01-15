import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { StaffingRoleFindManySchema as StaffingRoleFindManySchema } from '../findManyStaffingRole.schema';
import { StaffingCandidateFindManySchema as StaffingCandidateFindManySchema } from '../findManyStaffingCandidate.schema';
import { StaffingPlacementFindManySchema as StaffingPlacementFindManySchema } from '../findManyStaffingPlacement.schema';
import { StaffingEngagementCountOutputTypeArgsObjectSchema as StaffingEngagementCountOutputTypeArgsObjectSchema } from './StaffingEngagementCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  roles: z.union([z.boolean(), z.lazy(() => StaffingRoleFindManySchema)]).optional(),
  candidates: z.union([z.boolean(), z.lazy(() => StaffingCandidateFindManySchema)]).optional(),
  placements: z.union([z.boolean(), z.lazy(() => StaffingPlacementFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => StaffingEngagementCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const StaffingEngagementIncludeObjectSchema: z.ZodType<Prisma.StaffingEngagementInclude> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementInclude>;
export const StaffingEngagementIncludeObjectZodSchema = makeSchema();
