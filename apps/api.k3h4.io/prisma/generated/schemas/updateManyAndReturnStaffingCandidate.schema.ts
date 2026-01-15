import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingCandidateSelectObjectSchema as StaffingCandidateSelectObjectSchema } from './objects/StaffingCandidateSelect.schema';
import { StaffingCandidateUpdateManyMutationInputObjectSchema as StaffingCandidateUpdateManyMutationInputObjectSchema } from './objects/StaffingCandidateUpdateManyMutationInput.schema';
import { StaffingCandidateWhereInputObjectSchema as StaffingCandidateWhereInputObjectSchema } from './objects/StaffingCandidateWhereInput.schema';

export const StaffingCandidateUpdateManyAndReturnSchema: z.ZodType<Prisma.StaffingCandidateUpdateManyAndReturnArgs> = z.object({ select: StaffingCandidateSelectObjectSchema.optional(), data: StaffingCandidateUpdateManyMutationInputObjectSchema, where: StaffingCandidateWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.StaffingCandidateUpdateManyAndReturnArgs>;

export const StaffingCandidateUpdateManyAndReturnZodSchema = z.object({ select: StaffingCandidateSelectObjectSchema.optional(), data: StaffingCandidateUpdateManyMutationInputObjectSchema, where: StaffingCandidateWhereInputObjectSchema.optional() }).strict();