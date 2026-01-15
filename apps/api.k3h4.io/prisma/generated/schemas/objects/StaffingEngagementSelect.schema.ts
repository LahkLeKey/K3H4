import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { StaffingRoleFindManySchema as StaffingRoleFindManySchema } from '../findManyStaffingRole.schema';
import { StaffingCandidateFindManySchema as StaffingCandidateFindManySchema } from '../findManyStaffingCandidate.schema';
import { StaffingPlacementFindManySchema as StaffingPlacementFindManySchema } from '../findManyStaffingPlacement.schema';
import { StaffingEngagementCountOutputTypeArgsObjectSchema as StaffingEngagementCountOutputTypeArgsObjectSchema } from './StaffingEngagementCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  name: z.boolean().optional(),
  client: z.boolean().optional(),
  priority: z.boolean().optional(),
  status: z.boolean().optional(),
  startDate: z.boolean().optional(),
  endDate: z.boolean().optional(),
  budget: z.boolean().optional(),
  forecast: z.boolean().optional(),
  notes: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  roles: z.union([z.boolean(), z.lazy(() => StaffingRoleFindManySchema)]).optional(),
  candidates: z.union([z.boolean(), z.lazy(() => StaffingCandidateFindManySchema)]).optional(),
  placements: z.union([z.boolean(), z.lazy(() => StaffingPlacementFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => StaffingEngagementCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const StaffingEngagementSelectObjectSchema: z.ZodType<Prisma.StaffingEngagementSelect> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementSelect>;
export const StaffingEngagementSelectObjectZodSchema = makeSchema();
