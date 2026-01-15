import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  score: z.literal(true).optional(),
  desiredRate: z.literal(true).optional()
}).strict();
export const StaffingCandidateSumAggregateInputObjectSchema: z.ZodType<Prisma.StaffingCandidateSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateSumAggregateInputType>;
export const StaffingCandidateSumAggregateInputObjectZodSchema = makeSchema();
