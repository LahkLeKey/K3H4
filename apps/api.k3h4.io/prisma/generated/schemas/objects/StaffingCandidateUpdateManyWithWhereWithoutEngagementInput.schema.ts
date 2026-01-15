import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateScalarWhereInputObjectSchema as StaffingCandidateScalarWhereInputObjectSchema } from './StaffingCandidateScalarWhereInput.schema';
import { StaffingCandidateUpdateManyMutationInputObjectSchema as StaffingCandidateUpdateManyMutationInputObjectSchema } from './StaffingCandidateUpdateManyMutationInput.schema';
import { StaffingCandidateUncheckedUpdateManyWithoutEngagementInputObjectSchema as StaffingCandidateUncheckedUpdateManyWithoutEngagementInputObjectSchema } from './StaffingCandidateUncheckedUpdateManyWithoutEngagementInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingCandidateScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => StaffingCandidateUpdateManyMutationInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedUpdateManyWithoutEngagementInputObjectSchema)])
}).strict();
export const StaffingCandidateUpdateManyWithWhereWithoutEngagementInputObjectSchema: z.ZodType<Prisma.StaffingCandidateUpdateManyWithWhereWithoutEngagementInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateUpdateManyWithWhereWithoutEngagementInput>;
export const StaffingCandidateUpdateManyWithWhereWithoutEngagementInputObjectZodSchema = makeSchema();
