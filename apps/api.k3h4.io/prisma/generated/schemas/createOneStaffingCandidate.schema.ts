import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingCandidateSelectObjectSchema as StaffingCandidateSelectObjectSchema } from './objects/StaffingCandidateSelect.schema';
import { StaffingCandidateIncludeObjectSchema as StaffingCandidateIncludeObjectSchema } from './objects/StaffingCandidateInclude.schema';
import { StaffingCandidateCreateInputObjectSchema as StaffingCandidateCreateInputObjectSchema } from './objects/StaffingCandidateCreateInput.schema';
import { StaffingCandidateUncheckedCreateInputObjectSchema as StaffingCandidateUncheckedCreateInputObjectSchema } from './objects/StaffingCandidateUncheckedCreateInput.schema';

export const StaffingCandidateCreateOneSchema: z.ZodType<Prisma.StaffingCandidateCreateArgs> = z.object({ select: StaffingCandidateSelectObjectSchema.optional(), include: StaffingCandidateIncludeObjectSchema.optional(), data: z.union([StaffingCandidateCreateInputObjectSchema, StaffingCandidateUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.StaffingCandidateCreateArgs>;

export const StaffingCandidateCreateOneZodSchema = z.object({ select: StaffingCandidateSelectObjectSchema.optional(), include: StaffingCandidateIncludeObjectSchema.optional(), data: z.union([StaffingCandidateCreateInputObjectSchema, StaffingCandidateUncheckedCreateInputObjectSchema]) }).strict();