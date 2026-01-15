import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateCreateManyEngagementInputObjectSchema as StaffingCandidateCreateManyEngagementInputObjectSchema } from './StaffingCandidateCreateManyEngagementInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => StaffingCandidateCreateManyEngagementInputObjectSchema), z.lazy(() => StaffingCandidateCreateManyEngagementInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const StaffingCandidateCreateManyEngagementInputEnvelopeObjectSchema: z.ZodType<Prisma.StaffingCandidateCreateManyEngagementInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateCreateManyEngagementInputEnvelope>;
export const StaffingCandidateCreateManyEngagementInputEnvelopeObjectZodSchema = makeSchema();
