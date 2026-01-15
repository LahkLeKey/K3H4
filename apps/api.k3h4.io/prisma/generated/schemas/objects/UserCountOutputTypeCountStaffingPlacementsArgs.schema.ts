import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementWhereInputObjectSchema as StaffingPlacementWhereInputObjectSchema } from './StaffingPlacementWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingPlacementWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountStaffingPlacementsArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountStaffingPlacementsArgsObjectZodSchema = makeSchema();
