import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingCandidateUpdateManyMutationInputObjectSchema as StaffingCandidateUpdateManyMutationInputObjectSchema } from './objects/StaffingCandidateUpdateManyMutationInput.schema';
import { StaffingCandidateWhereInputObjectSchema as StaffingCandidateWhereInputObjectSchema } from './objects/StaffingCandidateWhereInput.schema';

export const StaffingCandidateUpdateManySchema: z.ZodType<Prisma.StaffingCandidateUpdateManyArgs> = z.object({ data: StaffingCandidateUpdateManyMutationInputObjectSchema, where: StaffingCandidateWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.StaffingCandidateUpdateManyArgs>;

export const StaffingCandidateUpdateManyZodSchema = z.object({ data: StaffingCandidateUpdateManyMutationInputObjectSchema, where: StaffingCandidateWhereInputObjectSchema.optional() }).strict();