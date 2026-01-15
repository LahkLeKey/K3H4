import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateCountOutputTypeCountPlacementsArgsObjectSchema as StaffingCandidateCountOutputTypeCountPlacementsArgsObjectSchema } from './StaffingCandidateCountOutputTypeCountPlacementsArgs.schema';
import { StaffingCandidateCountOutputTypeCountShiftsAssignedArgsObjectSchema as StaffingCandidateCountOutputTypeCountShiftsAssignedArgsObjectSchema } from './StaffingCandidateCountOutputTypeCountShiftsAssignedArgs.schema'

const makeSchema = () => z.object({
  placements: z.union([z.boolean(), z.lazy(() => StaffingCandidateCountOutputTypeCountPlacementsArgsObjectSchema)]).optional(),
  shiftsAssigned: z.union([z.boolean(), z.lazy(() => StaffingCandidateCountOutputTypeCountShiftsAssignedArgsObjectSchema)]).optional()
}).strict();
export const StaffingCandidateCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.StaffingCandidateCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateCountOutputTypeSelect>;
export const StaffingCandidateCountOutputTypeSelectObjectZodSchema = makeSchema();
