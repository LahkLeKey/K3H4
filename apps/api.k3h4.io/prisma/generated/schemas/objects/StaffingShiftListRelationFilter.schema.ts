import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingShiftWhereInputObjectSchema as StaffingShiftWhereInputObjectSchema } from './StaffingShiftWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => StaffingShiftWhereInputObjectSchema).optional(),
  some: z.lazy(() => StaffingShiftWhereInputObjectSchema).optional(),
  none: z.lazy(() => StaffingShiftWhereInputObjectSchema).optional()
}).strict();
export const StaffingShiftListRelationFilterObjectSchema: z.ZodType<Prisma.StaffingShiftListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftListRelationFilter>;
export const StaffingShiftListRelationFilterObjectZodSchema = makeSchema();
