import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingShiftSelectObjectSchema as StaffingShiftSelectObjectSchema } from './objects/StaffingShiftSelect.schema';
import { StaffingShiftIncludeObjectSchema as StaffingShiftIncludeObjectSchema } from './objects/StaffingShiftInclude.schema';
import { StaffingShiftCreateInputObjectSchema as StaffingShiftCreateInputObjectSchema } from './objects/StaffingShiftCreateInput.schema';
import { StaffingShiftUncheckedCreateInputObjectSchema as StaffingShiftUncheckedCreateInputObjectSchema } from './objects/StaffingShiftUncheckedCreateInput.schema';

export const StaffingShiftCreateOneSchema: z.ZodType<Prisma.StaffingShiftCreateArgs> = z.object({ select: StaffingShiftSelectObjectSchema.optional(), include: StaffingShiftIncludeObjectSchema.optional(), data: z.union([StaffingShiftCreateInputObjectSchema, StaffingShiftUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.StaffingShiftCreateArgs>;

export const StaffingShiftCreateOneZodSchema = z.object({ select: StaffingShiftSelectObjectSchema.optional(), include: StaffingShiftIncludeObjectSchema.optional(), data: z.union([StaffingShiftCreateInputObjectSchema, StaffingShiftUncheckedCreateInputObjectSchema]) }).strict();