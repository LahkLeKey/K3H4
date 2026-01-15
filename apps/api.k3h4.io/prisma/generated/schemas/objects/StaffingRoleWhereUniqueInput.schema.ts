import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const StaffingRoleWhereUniqueInputObjectSchema: z.ZodType<Prisma.StaffingRoleWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleWhereUniqueInput>;
export const StaffingRoleWhereUniqueInputObjectZodSchema = makeSchema();
