import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingShiftSelectObjectSchema as StaffingShiftSelectObjectSchema } from './objects/StaffingShiftSelect.schema';
import { StaffingShiftIncludeObjectSchema as StaffingShiftIncludeObjectSchema } from './objects/StaffingShiftInclude.schema';
import { StaffingShiftWhereUniqueInputObjectSchema as StaffingShiftWhereUniqueInputObjectSchema } from './objects/StaffingShiftWhereUniqueInput.schema';

export const StaffingShiftFindUniqueOrThrowSchema: z.ZodType<Prisma.StaffingShiftFindUniqueOrThrowArgs> = z.object({ select: StaffingShiftSelectObjectSchema.optional(), include: StaffingShiftIncludeObjectSchema.optional(), where: StaffingShiftWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.StaffingShiftFindUniqueOrThrowArgs>;

export const StaffingShiftFindUniqueOrThrowZodSchema = z.object({ select: StaffingShiftSelectObjectSchema.optional(), include: StaffingShiftIncludeObjectSchema.optional(), where: StaffingShiftWhereUniqueInputObjectSchema }).strict();