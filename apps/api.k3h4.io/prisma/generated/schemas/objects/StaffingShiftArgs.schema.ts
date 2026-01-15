import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingShiftSelectObjectSchema as StaffingShiftSelectObjectSchema } from './StaffingShiftSelect.schema';
import { StaffingShiftIncludeObjectSchema as StaffingShiftIncludeObjectSchema } from './StaffingShiftInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => StaffingShiftSelectObjectSchema).optional(),
  include: z.lazy(() => StaffingShiftIncludeObjectSchema).optional()
}).strict();
export const StaffingShiftArgsObjectSchema = makeSchema();
export const StaffingShiftArgsObjectZodSchema = makeSchema();
