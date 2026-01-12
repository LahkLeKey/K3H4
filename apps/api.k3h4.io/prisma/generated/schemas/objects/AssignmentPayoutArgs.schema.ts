import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentPayoutSelectObjectSchema as AssignmentPayoutSelectObjectSchema } from './AssignmentPayoutSelect.schema';
import { AssignmentPayoutIncludeObjectSchema as AssignmentPayoutIncludeObjectSchema } from './AssignmentPayoutInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => AssignmentPayoutSelectObjectSchema).optional(),
  include: z.lazy(() => AssignmentPayoutIncludeObjectSchema).optional()
}).strict();
export const AssignmentPayoutArgsObjectSchema = makeSchema();
export const AssignmentPayoutArgsObjectZodSchema = makeSchema();
