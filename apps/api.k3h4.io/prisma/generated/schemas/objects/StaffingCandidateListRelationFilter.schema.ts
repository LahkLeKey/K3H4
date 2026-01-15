import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateWhereInputObjectSchema as StaffingCandidateWhereInputObjectSchema } from './StaffingCandidateWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => StaffingCandidateWhereInputObjectSchema).optional(),
  some: z.lazy(() => StaffingCandidateWhereInputObjectSchema).optional(),
  none: z.lazy(() => StaffingCandidateWhereInputObjectSchema).optional()
}).strict();
export const StaffingCandidateListRelationFilterObjectSchema: z.ZodType<Prisma.StaffingCandidateListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateListRelationFilter>;
export const StaffingCandidateListRelationFilterObjectZodSchema = makeSchema();
