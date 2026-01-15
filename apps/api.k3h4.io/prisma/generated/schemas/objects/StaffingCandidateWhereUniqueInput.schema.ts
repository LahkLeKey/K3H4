import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const StaffingCandidateWhereUniqueInputObjectSchema: z.ZodType<Prisma.StaffingCandidateWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateWhereUniqueInput>;
export const StaffingCandidateWhereUniqueInputObjectZodSchema = makeSchema();
