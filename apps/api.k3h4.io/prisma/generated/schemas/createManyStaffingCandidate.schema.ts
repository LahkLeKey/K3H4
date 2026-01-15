import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingCandidateCreateManyInputObjectSchema as StaffingCandidateCreateManyInputObjectSchema } from './objects/StaffingCandidateCreateManyInput.schema';

export const StaffingCandidateCreateManySchema: z.ZodType<Prisma.StaffingCandidateCreateManyArgs> = z.object({ data: z.union([ StaffingCandidateCreateManyInputObjectSchema, z.array(StaffingCandidateCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.StaffingCandidateCreateManyArgs>;

export const StaffingCandidateCreateManyZodSchema = z.object({ data: z.union([ StaffingCandidateCreateManyInputObjectSchema, z.array(StaffingCandidateCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();