import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateCreateManyUserInputObjectSchema as StaffingCandidateCreateManyUserInputObjectSchema } from './StaffingCandidateCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => StaffingCandidateCreateManyUserInputObjectSchema), z.lazy(() => StaffingCandidateCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const StaffingCandidateCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.StaffingCandidateCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateCreateManyUserInputEnvelope>;
export const StaffingCandidateCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
