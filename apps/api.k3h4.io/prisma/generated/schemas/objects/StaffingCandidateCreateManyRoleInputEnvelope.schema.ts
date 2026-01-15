import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateCreateManyRoleInputObjectSchema as StaffingCandidateCreateManyRoleInputObjectSchema } from './StaffingCandidateCreateManyRoleInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => StaffingCandidateCreateManyRoleInputObjectSchema), z.lazy(() => StaffingCandidateCreateManyRoleInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const StaffingCandidateCreateManyRoleInputEnvelopeObjectSchema: z.ZodType<Prisma.StaffingCandidateCreateManyRoleInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateCreateManyRoleInputEnvelope>;
export const StaffingCandidateCreateManyRoleInputEnvelopeObjectZodSchema = makeSchema();
