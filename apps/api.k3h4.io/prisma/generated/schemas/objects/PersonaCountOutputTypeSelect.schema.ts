import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCountOutputTypeCountAssignmentsArgsObjectSchema as PersonaCountOutputTypeCountAssignmentsArgsObjectSchema } from './PersonaCountOutputTypeCountAssignmentsArgs.schema';
import { PersonaCountOutputTypeCountAssignmentPayoutsArgsObjectSchema as PersonaCountOutputTypeCountAssignmentPayoutsArgsObjectSchema } from './PersonaCountOutputTypeCountAssignmentPayoutsArgs.schema';
import { PersonaCountOutputTypeCountStaffingCandidatesArgsObjectSchema as PersonaCountOutputTypeCountStaffingCandidatesArgsObjectSchema } from './PersonaCountOutputTypeCountStaffingCandidatesArgs.schema';
import { PersonaCountOutputTypeCountStaffingShiftsAssignedArgsObjectSchema as PersonaCountOutputTypeCountStaffingShiftsAssignedArgsObjectSchema } from './PersonaCountOutputTypeCountStaffingShiftsAssignedArgs.schema';
import { PersonaCountOutputTypeCountStaffingPlacementsArgsObjectSchema as PersonaCountOutputTypeCountStaffingPlacementsArgsObjectSchema } from './PersonaCountOutputTypeCountStaffingPlacementsArgs.schema';
import { PersonaCountOutputTypeCountAttributesArgsObjectSchema as PersonaCountOutputTypeCountAttributesArgsObjectSchema } from './PersonaCountOutputTypeCountAttributesArgs.schema';
import { PersonaCountOutputTypeCountCompatibilitySourcesArgsObjectSchema as PersonaCountOutputTypeCountCompatibilitySourcesArgsObjectSchema } from './PersonaCountOutputTypeCountCompatibilitySourcesArgs.schema';
import { PersonaCountOutputTypeCountCompatibilityTargetsArgsObjectSchema as PersonaCountOutputTypeCountCompatibilityTargetsArgsObjectSchema } from './PersonaCountOutputTypeCountCompatibilityTargetsArgs.schema'

const makeSchema = () => z.object({
  assignments: z.union([z.boolean(), z.lazy(() => PersonaCountOutputTypeCountAssignmentsArgsObjectSchema)]).optional(),
  assignmentPayouts: z.union([z.boolean(), z.lazy(() => PersonaCountOutputTypeCountAssignmentPayoutsArgsObjectSchema)]).optional(),
  staffingCandidates: z.union([z.boolean(), z.lazy(() => PersonaCountOutputTypeCountStaffingCandidatesArgsObjectSchema)]).optional(),
  staffingShiftsAssigned: z.union([z.boolean(), z.lazy(() => PersonaCountOutputTypeCountStaffingShiftsAssignedArgsObjectSchema)]).optional(),
  staffingPlacements: z.union([z.boolean(), z.lazy(() => PersonaCountOutputTypeCountStaffingPlacementsArgsObjectSchema)]).optional(),
  attributes: z.union([z.boolean(), z.lazy(() => PersonaCountOutputTypeCountAttributesArgsObjectSchema)]).optional(),
  compatibilitySources: z.union([z.boolean(), z.lazy(() => PersonaCountOutputTypeCountCompatibilitySourcesArgsObjectSchema)]).optional(),
  compatibilityTargets: z.union([z.boolean(), z.lazy(() => PersonaCountOutputTypeCountCompatibilityTargetsArgsObjectSchema)]).optional()
}).strict();
export const PersonaCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.PersonaCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCountOutputTypeSelect>;
export const PersonaCountOutputTypeSelectObjectZodSchema = makeSchema();
