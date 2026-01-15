import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingShiftCreateManyAssignedCandidateInputObjectSchema as StaffingShiftCreateManyAssignedCandidateInputObjectSchema } from './StaffingShiftCreateManyAssignedCandidateInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => StaffingShiftCreateManyAssignedCandidateInputObjectSchema), z.lazy(() => StaffingShiftCreateManyAssignedCandidateInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const StaffingShiftCreateManyAssignedCandidateInputEnvelopeObjectSchema: z.ZodType<Prisma.StaffingShiftCreateManyAssignedCandidateInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftCreateManyAssignedCandidateInputEnvelope>;
export const StaffingShiftCreateManyAssignedCandidateInputEnvelopeObjectZodSchema = makeSchema();
