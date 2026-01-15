import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingEngagementCountOutputTypeCountRolesArgsObjectSchema as StaffingEngagementCountOutputTypeCountRolesArgsObjectSchema } from './StaffingEngagementCountOutputTypeCountRolesArgs.schema';
import { StaffingEngagementCountOutputTypeCountCandidatesArgsObjectSchema as StaffingEngagementCountOutputTypeCountCandidatesArgsObjectSchema } from './StaffingEngagementCountOutputTypeCountCandidatesArgs.schema';
import { StaffingEngagementCountOutputTypeCountPlacementsArgsObjectSchema as StaffingEngagementCountOutputTypeCountPlacementsArgsObjectSchema } from './StaffingEngagementCountOutputTypeCountPlacementsArgs.schema'

const makeSchema = () => z.object({
  roles: z.union([z.boolean(), z.lazy(() => StaffingEngagementCountOutputTypeCountRolesArgsObjectSchema)]).optional(),
  candidates: z.union([z.boolean(), z.lazy(() => StaffingEngagementCountOutputTypeCountCandidatesArgsObjectSchema)]).optional(),
  placements: z.union([z.boolean(), z.lazy(() => StaffingEngagementCountOutputTypeCountPlacementsArgsObjectSchema)]).optional()
}).strict();
export const StaffingEngagementCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.StaffingEngagementCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementCountOutputTypeSelect>;
export const StaffingEngagementCountOutputTypeSelectObjectZodSchema = makeSchema();
