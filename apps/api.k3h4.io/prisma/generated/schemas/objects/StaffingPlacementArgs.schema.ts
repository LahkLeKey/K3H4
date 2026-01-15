import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementSelectObjectSchema as StaffingPlacementSelectObjectSchema } from './StaffingPlacementSelect.schema';
import { StaffingPlacementIncludeObjectSchema as StaffingPlacementIncludeObjectSchema } from './StaffingPlacementInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => StaffingPlacementSelectObjectSchema).optional(),
  include: z.lazy(() => StaffingPlacementIncludeObjectSchema).optional()
}).strict();
export const StaffingPlacementArgsObjectSchema = makeSchema();
export const StaffingPlacementArgsObjectZodSchema = makeSchema();
