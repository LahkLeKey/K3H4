import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingCandidateWhereInputObjectSchema as StaffingCandidateWhereInputObjectSchema } from './objects/StaffingCandidateWhereInput.schema';

export const StaffingCandidateDeleteManySchema: z.ZodType<Prisma.StaffingCandidateDeleteManyArgs> = z.object({ where: StaffingCandidateWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.StaffingCandidateDeleteManyArgs>;

export const StaffingCandidateDeleteManyZodSchema = z.object({ where: StaffingCandidateWhereInputObjectSchema.optional() }).strict();