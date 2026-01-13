import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentArgsObjectSchema as AssignmentArgsObjectSchema } from './AssignmentArgs.schema'

const makeSchema = () => z.object({
  assignment: z.union([z.boolean(), z.lazy(() => AssignmentArgsObjectSchema)]).optional()
}).strict();
export const AssignmentTimecardIncludeObjectSchema: z.ZodType<Prisma.AssignmentTimecardInclude> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentTimecardInclude>;
export const AssignmentTimecardIncludeObjectZodSchema = makeSchema();
