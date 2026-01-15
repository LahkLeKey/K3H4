import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingCandidateSelectObjectSchema as StaffingCandidateSelectObjectSchema } from './objects/StaffingCandidateSelect.schema';
import { StaffingCandidateIncludeObjectSchema as StaffingCandidateIncludeObjectSchema } from './objects/StaffingCandidateInclude.schema';
import { StaffingCandidateWhereUniqueInputObjectSchema as StaffingCandidateWhereUniqueInputObjectSchema } from './objects/StaffingCandidateWhereUniqueInput.schema';
import { StaffingCandidateCreateInputObjectSchema as StaffingCandidateCreateInputObjectSchema } from './objects/StaffingCandidateCreateInput.schema';
import { StaffingCandidateUncheckedCreateInputObjectSchema as StaffingCandidateUncheckedCreateInputObjectSchema } from './objects/StaffingCandidateUncheckedCreateInput.schema';
import { StaffingCandidateUpdateInputObjectSchema as StaffingCandidateUpdateInputObjectSchema } from './objects/StaffingCandidateUpdateInput.schema';
import { StaffingCandidateUncheckedUpdateInputObjectSchema as StaffingCandidateUncheckedUpdateInputObjectSchema } from './objects/StaffingCandidateUncheckedUpdateInput.schema';

export const StaffingCandidateUpsertOneSchema: z.ZodType<Prisma.StaffingCandidateUpsertArgs> = z.object({ select: StaffingCandidateSelectObjectSchema.optional(), include: StaffingCandidateIncludeObjectSchema.optional(), where: StaffingCandidateWhereUniqueInputObjectSchema, create: z.union([ StaffingCandidateCreateInputObjectSchema, StaffingCandidateUncheckedCreateInputObjectSchema ]), update: z.union([ StaffingCandidateUpdateInputObjectSchema, StaffingCandidateUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.StaffingCandidateUpsertArgs>;

export const StaffingCandidateUpsertOneZodSchema = z.object({ select: StaffingCandidateSelectObjectSchema.optional(), include: StaffingCandidateIncludeObjectSchema.optional(), where: StaffingCandidateWhereUniqueInputObjectSchema, create: z.union([ StaffingCandidateCreateInputObjectSchema, StaffingCandidateUncheckedCreateInputObjectSchema ]), update: z.union([ StaffingCandidateUpdateInputObjectSchema, StaffingCandidateUncheckedUpdateInputObjectSchema ]) }).strict();