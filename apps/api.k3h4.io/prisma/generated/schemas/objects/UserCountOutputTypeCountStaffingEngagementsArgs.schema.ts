import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingEngagementWhereInputObjectSchema as StaffingEngagementWhereInputObjectSchema } from './StaffingEngagementWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingEngagementWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountStaffingEngagementsArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountStaffingEngagementsArgsObjectZodSchema = makeSchema();
