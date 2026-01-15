import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateWhereInputObjectSchema as StaffingCandidateWhereInputObjectSchema } from './StaffingCandidateWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingCandidateWhereInputObjectSchema).optional()
}).strict();
export const StaffingEngagementCountOutputTypeCountCandidatesArgsObjectSchema = makeSchema();
export const StaffingEngagementCountOutputTypeCountCandidatesArgsObjectZodSchema = makeSchema();
