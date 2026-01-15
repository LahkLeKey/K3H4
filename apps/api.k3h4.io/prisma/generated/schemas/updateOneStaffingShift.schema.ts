import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingShiftSelectObjectSchema as StaffingShiftSelectObjectSchema } from './objects/StaffingShiftSelect.schema';
import { StaffingShiftIncludeObjectSchema as StaffingShiftIncludeObjectSchema } from './objects/StaffingShiftInclude.schema';
import { StaffingShiftUpdateInputObjectSchema as StaffingShiftUpdateInputObjectSchema } from './objects/StaffingShiftUpdateInput.schema';
import { StaffingShiftUncheckedUpdateInputObjectSchema as StaffingShiftUncheckedUpdateInputObjectSchema } from './objects/StaffingShiftUncheckedUpdateInput.schema';
import { StaffingShiftWhereUniqueInputObjectSchema as StaffingShiftWhereUniqueInputObjectSchema } from './objects/StaffingShiftWhereUniqueInput.schema';

export const StaffingShiftUpdateOneSchema: z.ZodType<Prisma.StaffingShiftUpdateArgs> = z.object({ select: StaffingShiftSelectObjectSchema.optional(), include: StaffingShiftIncludeObjectSchema.optional(), data: z.union([StaffingShiftUpdateInputObjectSchema, StaffingShiftUncheckedUpdateInputObjectSchema]), where: StaffingShiftWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.StaffingShiftUpdateArgs>;

export const StaffingShiftUpdateOneZodSchema = z.object({ select: StaffingShiftSelectObjectSchema.optional(), include: StaffingShiftIncludeObjectSchema.optional(), data: z.union([StaffingShiftUpdateInputObjectSchema, StaffingShiftUncheckedUpdateInputObjectSchema]), where: StaffingShiftWhereUniqueInputObjectSchema }).strict();