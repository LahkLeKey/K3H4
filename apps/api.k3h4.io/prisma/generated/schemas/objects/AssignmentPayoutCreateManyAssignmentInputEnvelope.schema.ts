import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentPayoutCreateManyAssignmentInputObjectSchema as AssignmentPayoutCreateManyAssignmentInputObjectSchema } from './AssignmentPayoutCreateManyAssignmentInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => AssignmentPayoutCreateManyAssignmentInputObjectSchema), z.lazy(() => AssignmentPayoutCreateManyAssignmentInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const AssignmentPayoutCreateManyAssignmentInputEnvelopeObjectSchema: z.ZodType<Prisma.AssignmentPayoutCreateManyAssignmentInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentPayoutCreateManyAssignmentInputEnvelope>;
export const AssignmentPayoutCreateManyAssignmentInputEnvelopeObjectZodSchema = makeSchema();
