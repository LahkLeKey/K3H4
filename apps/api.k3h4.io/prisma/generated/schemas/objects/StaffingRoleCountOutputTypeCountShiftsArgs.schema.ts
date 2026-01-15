import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingShiftWhereInputObjectSchema as StaffingShiftWhereInputObjectSchema } from './StaffingShiftWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingShiftWhereInputObjectSchema).optional()
}).strict();
export const StaffingRoleCountOutputTypeCountShiftsArgsObjectSchema = makeSchema();
export const StaffingRoleCountOutputTypeCountShiftsArgsObjectZodSchema = makeSchema();
