import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentTimecardSelectObjectSchema as AssignmentTimecardSelectObjectSchema } from './AssignmentTimecardSelect.schema';
import { AssignmentTimecardIncludeObjectSchema as AssignmentTimecardIncludeObjectSchema } from './AssignmentTimecardInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => AssignmentTimecardSelectObjectSchema).optional(),
  include: z.lazy(() => AssignmentTimecardIncludeObjectSchema).optional()
}).strict();
export const AssignmentTimecardArgsObjectSchema = makeSchema();
export const AssignmentTimecardArgsObjectZodSchema = makeSchema();
