import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingEngagementSelectObjectSchema as StaffingEngagementSelectObjectSchema } from './StaffingEngagementSelect.schema';
import { StaffingEngagementIncludeObjectSchema as StaffingEngagementIncludeObjectSchema } from './StaffingEngagementInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => StaffingEngagementSelectObjectSchema).optional(),
  include: z.lazy(() => StaffingEngagementIncludeObjectSchema).optional()
}).strict();
export const StaffingEngagementArgsObjectSchema = makeSchema();
export const StaffingEngagementArgsObjectZodSchema = makeSchema();
