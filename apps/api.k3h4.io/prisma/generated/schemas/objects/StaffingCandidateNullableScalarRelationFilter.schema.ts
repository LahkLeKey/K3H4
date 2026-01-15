import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateWhereInputObjectSchema as StaffingCandidateWhereInputObjectSchema } from './StaffingCandidateWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => StaffingCandidateWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => StaffingCandidateWhereInputObjectSchema).optional().nullable()
}).strict();
export const StaffingCandidateNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.StaffingCandidateNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateNullableScalarRelationFilter>;
export const StaffingCandidateNullableScalarRelationFilterObjectZodSchema = makeSchema();
