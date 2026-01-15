import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleCountOutputTypeSelectObjectSchema as StaffingRoleCountOutputTypeSelectObjectSchema } from './StaffingRoleCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => StaffingRoleCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const StaffingRoleCountOutputTypeArgsObjectSchema = makeSchema();
export const StaffingRoleCountOutputTypeArgsObjectZodSchema = makeSchema();
