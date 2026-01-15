import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingEngagementCountOutputTypeSelectObjectSchema as StaffingEngagementCountOutputTypeSelectObjectSchema } from './StaffingEngagementCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => StaffingEngagementCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const StaffingEngagementCountOutputTypeArgsObjectSchema = makeSchema();
export const StaffingEngagementCountOutputTypeArgsObjectZodSchema = makeSchema();
