import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const StaffingPlacementWhereUniqueInputObjectSchema: z.ZodType<Prisma.StaffingPlacementWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementWhereUniqueInput>;
export const StaffingPlacementWhereUniqueInputObjectZodSchema = makeSchema();
