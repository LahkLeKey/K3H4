import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentArgsObjectSchema as AssignmentArgsObjectSchema } from './AssignmentArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  assignmentId: z.boolean().optional(),
  assignment: z.union([z.boolean(), z.lazy(() => AssignmentArgsObjectSchema)]).optional(),
  hours: z.boolean().optional(),
  amount: z.boolean().optional(),
  note: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional()
}).strict();
export const AssignmentTimecardSelectObjectSchema: z.ZodType<Prisma.AssignmentTimecardSelect> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentTimecardSelect>;
export const AssignmentTimecardSelectObjectZodSchema = makeSchema();
