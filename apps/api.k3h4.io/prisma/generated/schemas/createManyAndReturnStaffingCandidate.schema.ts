import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingCandidateSelectObjectSchema as StaffingCandidateSelectObjectSchema } from './objects/StaffingCandidateSelect.schema';
import { StaffingCandidateCreateManyInputObjectSchema as StaffingCandidateCreateManyInputObjectSchema } from './objects/StaffingCandidateCreateManyInput.schema';

export const StaffingCandidateCreateManyAndReturnSchema: z.ZodType<Prisma.StaffingCandidateCreateManyAndReturnArgs> = z.object({ select: StaffingCandidateSelectObjectSchema.optional(), data: z.union([ StaffingCandidateCreateManyInputObjectSchema, z.array(StaffingCandidateCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.StaffingCandidateCreateManyAndReturnArgs>;

export const StaffingCandidateCreateManyAndReturnZodSchema = z.object({ select: StaffingCandidateSelectObjectSchema.optional(), data: z.union([ StaffingCandidateCreateManyInputObjectSchema, z.array(StaffingCandidateCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();