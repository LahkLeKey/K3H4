import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingCandidateSelectObjectSchema as StaffingCandidateSelectObjectSchema } from './objects/StaffingCandidateSelect.schema';
import { StaffingCandidateIncludeObjectSchema as StaffingCandidateIncludeObjectSchema } from './objects/StaffingCandidateInclude.schema';
import { StaffingCandidateUpdateInputObjectSchema as StaffingCandidateUpdateInputObjectSchema } from './objects/StaffingCandidateUpdateInput.schema';
import { StaffingCandidateUncheckedUpdateInputObjectSchema as StaffingCandidateUncheckedUpdateInputObjectSchema } from './objects/StaffingCandidateUncheckedUpdateInput.schema';
import { StaffingCandidateWhereUniqueInputObjectSchema as StaffingCandidateWhereUniqueInputObjectSchema } from './objects/StaffingCandidateWhereUniqueInput.schema';

export const StaffingCandidateUpdateOneSchema: z.ZodType<Prisma.StaffingCandidateUpdateArgs> = z.object({ select: StaffingCandidateSelectObjectSchema.optional(), include: StaffingCandidateIncludeObjectSchema.optional(), data: z.union([StaffingCandidateUpdateInputObjectSchema, StaffingCandidateUncheckedUpdateInputObjectSchema]), where: StaffingCandidateWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.StaffingCandidateUpdateArgs>;

export const StaffingCandidateUpdateOneZodSchema = z.object({ select: StaffingCandidateSelectObjectSchema.optional(), include: StaffingCandidateIncludeObjectSchema.optional(), data: z.union([StaffingCandidateUpdateInputObjectSchema, StaffingCandidateUncheckedUpdateInputObjectSchema]), where: StaffingCandidateWhereUniqueInputObjectSchema }).strict();