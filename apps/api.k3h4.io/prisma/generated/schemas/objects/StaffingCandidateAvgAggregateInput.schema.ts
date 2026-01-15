import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  score: z.literal(true).optional(),
  desiredRate: z.literal(true).optional()
}).strict();
export const StaffingCandidateAvgAggregateInputObjectSchema: z.ZodType<Prisma.StaffingCandidateAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateAvgAggregateInputType>;
export const StaffingCandidateAvgAggregateInputObjectZodSchema = makeSchema();
