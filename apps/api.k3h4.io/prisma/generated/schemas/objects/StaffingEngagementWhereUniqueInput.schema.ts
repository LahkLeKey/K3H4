import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const StaffingEngagementWhereUniqueInputObjectSchema: z.ZodType<Prisma.StaffingEngagementWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementWhereUniqueInput>;
export const StaffingEngagementWhereUniqueInputObjectZodSchema = makeSchema();
