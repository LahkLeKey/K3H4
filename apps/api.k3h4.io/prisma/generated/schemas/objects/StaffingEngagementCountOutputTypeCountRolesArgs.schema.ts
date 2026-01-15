import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleWhereInputObjectSchema as StaffingRoleWhereInputObjectSchema } from './StaffingRoleWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingRoleWhereInputObjectSchema).optional()
}).strict();
export const StaffingEngagementCountOutputTypeCountRolesArgsObjectSchema = makeSchema();
export const StaffingEngagementCountOutputTypeCountRolesArgsObjectZodSchema = makeSchema();
