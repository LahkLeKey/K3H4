import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { AssignmentFindManySchema as AssignmentFindManySchema } from '../findManyAssignment.schema';
import { AssignmentPayoutFindManySchema as AssignmentPayoutFindManySchema } from '../findManyAssignmentPayout.schema';
import { StaffingCandidateFindManySchema as StaffingCandidateFindManySchema } from '../findManyStaffingCandidate.schema';
import { StaffingShiftFindManySchema as StaffingShiftFindManySchema } from '../findManyStaffingShift.schema';
import { StaffingPlacementFindManySchema as StaffingPlacementFindManySchema } from '../findManyStaffingPlacement.schema';
import { PersonaAttributeFindManySchema as PersonaAttributeFindManySchema } from '../findManyPersonaAttribute.schema';
import { PersonaCompatibilityFindManySchema as PersonaCompatibilityFindManySchema } from '../findManyPersonaCompatibility.schema';
import { PersonaCountOutputTypeArgsObjectSchema as PersonaCountOutputTypeArgsObjectSchema } from './PersonaCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  alias: z.boolean().optional(),
  account: z.boolean().optional(),
  handle: z.boolean().optional(),
  note: z.boolean().optional(),
  tags: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  assignments: z.union([z.boolean(), z.lazy(() => AssignmentFindManySchema)]).optional(),
  assignmentPayouts: z.union([z.boolean(), z.lazy(() => AssignmentPayoutFindManySchema)]).optional(),
  staffingCandidates: z.union([z.boolean(), z.lazy(() => StaffingCandidateFindManySchema)]).optional(),
  staffingShiftsAssigned: z.union([z.boolean(), z.lazy(() => StaffingShiftFindManySchema)]).optional(),
  staffingPlacements: z.union([z.boolean(), z.lazy(() => StaffingPlacementFindManySchema)]).optional(),
  attributes: z.union([z.boolean(), z.lazy(() => PersonaAttributeFindManySchema)]).optional(),
  compatibilitySources: z.union([z.boolean(), z.lazy(() => PersonaCompatibilityFindManySchema)]).optional(),
  compatibilityTargets: z.union([z.boolean(), z.lazy(() => PersonaCompatibilityFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => PersonaCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const PersonaSelectObjectSchema: z.ZodType<Prisma.PersonaSelect> = makeSchema() as unknown as z.ZodType<Prisma.PersonaSelect>;
export const PersonaSelectObjectZodSchema = makeSchema();
