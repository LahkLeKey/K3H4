import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingCandidateSelectObjectSchema as StaffingCandidateSelectObjectSchema } from './objects/StaffingCandidateSelect.schema';
import { StaffingCandidateIncludeObjectSchema as StaffingCandidateIncludeObjectSchema } from './objects/StaffingCandidateInclude.schema';
import { StaffingCandidateWhereUniqueInputObjectSchema as StaffingCandidateWhereUniqueInputObjectSchema } from './objects/StaffingCandidateWhereUniqueInput.schema';

export const StaffingCandidateFindUniqueOrThrowSchema: z.ZodType<Prisma.StaffingCandidateFindUniqueOrThrowArgs> = z.object({ select: StaffingCandidateSelectObjectSchema.optional(), include: StaffingCandidateIncludeObjectSchema.optional(), where: StaffingCandidateWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.StaffingCandidateFindUniqueOrThrowArgs>;

export const StaffingCandidateFindUniqueOrThrowZodSchema = z.object({ select: StaffingCandidateSelectObjectSchema.optional(), include: StaffingCandidateIncludeObjectSchema.optional(), where: StaffingCandidateWhereUniqueInputObjectSchema }).strict();