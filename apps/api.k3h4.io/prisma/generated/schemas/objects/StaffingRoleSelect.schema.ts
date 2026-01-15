import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { StaffingEngagementArgsObjectSchema as StaffingEngagementArgsObjectSchema } from './StaffingEngagementArgs.schema';
import { StaffingCandidateFindManySchema as StaffingCandidateFindManySchema } from '../findManyStaffingCandidate.schema';
import { StaffingShiftFindManySchema as StaffingShiftFindManySchema } from '../findManyStaffingShift.schema';
import { StaffingPlacementFindManySchema as StaffingPlacementFindManySchema } from '../findManyStaffingPlacement.schema';
import { StaffingRoleCountOutputTypeArgsObjectSchema as StaffingRoleCountOutputTypeArgsObjectSchema } from './StaffingRoleCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  engagementId: z.boolean().optional(),
  engagement: z.union([z.boolean(), z.lazy(() => StaffingEngagementArgsObjectSchema)]).optional(),
  title: z.boolean().optional(),
  location: z.boolean().optional(),
  modality: z.boolean().optional(),
  openings: z.boolean().optional(),
  filled: z.boolean().optional(),
  priority: z.boolean().optional(),
  status: z.boolean().optional(),
  rateMin: z.boolean().optional(),
  rateMax: z.boolean().optional(),
  billRate: z.boolean().optional(),
  payRate: z.boolean().optional(),
  tags: z.boolean().optional(),
  skills: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  candidates: z.union([z.boolean(), z.lazy(() => StaffingCandidateFindManySchema)]).optional(),
  shifts: z.union([z.boolean(), z.lazy(() => StaffingShiftFindManySchema)]).optional(),
  placements: z.union([z.boolean(), z.lazy(() => StaffingPlacementFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => StaffingRoleCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const StaffingRoleSelectObjectSchema: z.ZodType<Prisma.StaffingRoleSelect> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleSelect>;
export const StaffingRoleSelectObjectZodSchema = makeSchema();
