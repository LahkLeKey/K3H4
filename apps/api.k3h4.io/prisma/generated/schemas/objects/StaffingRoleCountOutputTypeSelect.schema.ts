import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleCountOutputTypeCountCandidatesArgsObjectSchema as StaffingRoleCountOutputTypeCountCandidatesArgsObjectSchema } from './StaffingRoleCountOutputTypeCountCandidatesArgs.schema';
import { StaffingRoleCountOutputTypeCountShiftsArgsObjectSchema as StaffingRoleCountOutputTypeCountShiftsArgsObjectSchema } from './StaffingRoleCountOutputTypeCountShiftsArgs.schema';
import { StaffingRoleCountOutputTypeCountPlacementsArgsObjectSchema as StaffingRoleCountOutputTypeCountPlacementsArgsObjectSchema } from './StaffingRoleCountOutputTypeCountPlacementsArgs.schema'

const makeSchema = () => z.object({
  candidates: z.union([z.boolean(), z.lazy(() => StaffingRoleCountOutputTypeCountCandidatesArgsObjectSchema)]).optional(),
  shifts: z.union([z.boolean(), z.lazy(() => StaffingRoleCountOutputTypeCountShiftsArgsObjectSchema)]).optional(),
  placements: z.union([z.boolean(), z.lazy(() => StaffingRoleCountOutputTypeCountPlacementsArgsObjectSchema)]).optional()
}).strict();
export const StaffingRoleCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.StaffingRoleCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleCountOutputTypeSelect>;
export const StaffingRoleCountOutputTypeSelectObjectZodSchema = makeSchema();
