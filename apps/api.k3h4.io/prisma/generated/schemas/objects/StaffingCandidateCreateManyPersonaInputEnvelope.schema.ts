import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateCreateManyPersonaInputObjectSchema as StaffingCandidateCreateManyPersonaInputObjectSchema } from './StaffingCandidateCreateManyPersonaInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => StaffingCandidateCreateManyPersonaInputObjectSchema), z.lazy(() => StaffingCandidateCreateManyPersonaInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const StaffingCandidateCreateManyPersonaInputEnvelopeObjectSchema: z.ZodType<Prisma.StaffingCandidateCreateManyPersonaInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateCreateManyPersonaInputEnvelope>;
export const StaffingCandidateCreateManyPersonaInputEnvelopeObjectZodSchema = makeSchema();
