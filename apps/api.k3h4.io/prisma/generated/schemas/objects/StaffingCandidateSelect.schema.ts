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
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  engagementId: z.boolean().optional(),
  engagement: z.union([z.boolean(), z.lazy(() => StaffingEngagementArgsObjectSchema)]).optional(),
  roleId: z.boolean().optional(),
  role: z.union([z.boolean(), z.lazy(() => StaffingRoleArgsObjectSchema)]).optional(),
  personaId: z.boolean().optional(),
  persona: z.union([z.boolean(), z.lazy(() => PersonaArgsObjectSchema)]).optional(),
  fullName: z.boolean().optional(),
  email: z.boolean().optional(),
  phone: z.boolean().optional(),
  source: z.boolean().optional(),
  stage: z.boolean().optional(),
  score: z.boolean().optional(),
  desiredRate: z.boolean().optional(),
  availability: z.boolean().optional(),
  location: z.boolean().optional(),
  note: z.boolean().optional(),
  tags: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  placements: z.union([z.boolean(), z.lazy(() => StaffingPlacementFindManySchema)]).optional(),
  shiftsAssigned: z.union([z.boolean(), z.lazy(() => StaffingShiftFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => StaffingCandidateCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const StaffingCandidateSelectObjectSchema: z.ZodType<Prisma.StaffingCandidateSelect> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateSelect>;
export const StaffingCandidateSelectObjectZodSchema = makeSchema();
