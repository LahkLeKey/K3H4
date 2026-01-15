import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingShiftSelectObjectSchema as StaffingShiftSelectObjectSchema } from './objects/StaffingShiftSelect.schema';
import { StaffingShiftIncludeObjectSchema as StaffingShiftIncludeObjectSchema } from './objects/StaffingShiftInclude.schema';
import { StaffingShiftWhereUniqueInputObjectSchema as StaffingShiftWhereUniqueInputObjectSchema } from './objects/StaffingShiftWhereUniqueInput.schema';
import { StaffingShiftCreateInputObjectSchema as StaffingShiftCreateInputObjectSchema } from './objects/StaffingShiftCreateInput.schema';
import { StaffingShiftUncheckedCreateInputObjectSchema as StaffingShiftUncheckedCreateInputObjectSchema } from './objects/StaffingShiftUncheckedCreateInput.schema';
import { StaffingShiftUpdateInputObjectSchema as StaffingShiftUpdateInputObjectSchema } from './objects/StaffingShiftUpdateInput.schema';
import { StaffingShiftUncheckedUpdateInputObjectSchema as StaffingShiftUncheckedUpdateInputObjectSchema } from './objects/StaffingShiftUncheckedUpdateInput.schema';

export const StaffingShiftUpsertOneSchema: z.ZodType<Prisma.StaffingShiftUpsertArgs> = z.object({ select: StaffingShiftSelectObjectSchema.optional(), include: StaffingShiftIncludeObjectSchema.optional(), where: StaffingShiftWhereUniqueInputObjectSchema, create: z.union([ StaffingShiftCreateInputObjectSchema, StaffingShiftUncheckedCreateInputObjectSchema ]), update: z.union([ StaffingShiftUpdateInputObjectSchema, StaffingShiftUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.StaffingShiftUpsertArgs>;

export const StaffingShiftUpsertOneZodSchema = z.object({ select: StaffingShiftSelectObjectSchema.optional(), include: StaffingShiftIncludeObjectSchema.optional(), where: StaffingShiftWhereUniqueInputObjectSchema, create: z.union([ StaffingShiftCreateInputObjectSchema, StaffingShiftUncheckedCreateInputObjectSchema ]), update: z.union([ StaffingShiftUpdateInputObjectSchema, StaffingShiftUncheckedUpdateInputObjectSchema ]) }).strict();