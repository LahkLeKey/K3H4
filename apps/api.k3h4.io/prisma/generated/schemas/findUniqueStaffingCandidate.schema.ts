import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingCandidateSelectObjectSchema as StaffingCandidateSelectObjectSchema } from './objects/StaffingCandidateSelect.schema';
import { StaffingCandidateIncludeObjectSchema as StaffingCandidateIncludeObjectSchema } from './objects/StaffingCandidateInclude.schema';
import { StaffingCandidateWhereUniqueInputObjectSchema as StaffingCandidateWhereUniqueInputObjectSchema } from './objects/StaffingCandidateWhereUniqueInput.schema';

export const StaffingCandidateFindUniqueSchema: z.ZodType<Prisma.StaffingCandidateFindUniqueArgs> = z.object({ select: StaffingCandidateSelectObjectSchema.optional(), include: StaffingCandidateIncludeObjectSchema.optional(), where: StaffingCandidateWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.StaffingCandidateFindUniqueArgs>;

export const StaffingCandidateFindUniqueZodSchema = z.object({ select: StaffingCandidateSelectObjectSchema.optional(), include: StaffingCandidateIncludeObjectSchema.optional(), where: StaffingCandidateWhereUniqueInputObjectSchema }).strict();