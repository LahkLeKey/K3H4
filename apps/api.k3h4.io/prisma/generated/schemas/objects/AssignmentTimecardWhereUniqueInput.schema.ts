import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const AssignmentTimecardWhereUniqueInputObjectSchema: z.ZodType<Prisma.AssignmentTimecardWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentTimecardWhereUniqueInput>;
export const AssignmentTimecardWhereUniqueInputObjectZodSchema = makeSchema();
