import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentTimecardCreateManyAssignmentInputObjectSchema as AssignmentTimecardCreateManyAssignmentInputObjectSchema } from './AssignmentTimecardCreateManyAssignmentInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => AssignmentTimecardCreateManyAssignmentInputObjectSchema), z.lazy(() => AssignmentTimecardCreateManyAssignmentInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const AssignmentTimecardCreateManyAssignmentInputEnvelopeObjectSchema: z.ZodType<Prisma.AssignmentTimecardCreateManyAssignmentInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentTimecardCreateManyAssignmentInputEnvelope>;
export const AssignmentTimecardCreateManyAssignmentInputEnvelopeObjectZodSchema = makeSchema();
