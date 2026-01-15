import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingShiftWhereInputObjectSchema as StaffingShiftWhereInputObjectSchema } from './StaffingShiftWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingShiftWhereInputObjectSchema).optional()
}).strict();
export const PersonaCountOutputTypeCountStaffingShiftsAssignedArgsObjectSchema = makeSchema();
export const PersonaCountOutputTypeCountStaffingShiftsAssignedArgsObjectZodSchema = makeSchema();
