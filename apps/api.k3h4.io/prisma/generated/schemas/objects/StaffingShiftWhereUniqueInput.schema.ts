import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const StaffingShiftWhereUniqueInputObjectSchema: z.ZodType<Prisma.StaffingShiftWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftWhereUniqueInput>;
export const StaffingShiftWhereUniqueInputObjectZodSchema = makeSchema();
