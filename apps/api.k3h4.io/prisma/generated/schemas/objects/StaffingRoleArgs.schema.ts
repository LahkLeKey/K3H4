import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleSelectObjectSchema as StaffingRoleSelectObjectSchema } from './StaffingRoleSelect.schema';
import { StaffingRoleIncludeObjectSchema as StaffingRoleIncludeObjectSchema } from './StaffingRoleInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => StaffingRoleSelectObjectSchema).optional(),
  include: z.lazy(() => StaffingRoleIncludeObjectSchema).optional()
}).strict();
export const StaffingRoleArgsObjectSchema = makeSchema();
export const StaffingRoleArgsObjectZodSchema = makeSchema();
