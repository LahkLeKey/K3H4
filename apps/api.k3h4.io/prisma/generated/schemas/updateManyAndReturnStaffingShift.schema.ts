import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingShiftSelectObjectSchema as StaffingShiftSelectObjectSchema } from './objects/StaffingShiftSelect.schema';
import { StaffingShiftUpdateManyMutationInputObjectSchema as StaffingShiftUpdateManyMutationInputObjectSchema } from './objects/StaffingShiftUpdateManyMutationInput.schema';
import { StaffingShiftWhereInputObjectSchema as StaffingShiftWhereInputObjectSchema } from './objects/StaffingShiftWhereInput.schema';

export const StaffingShiftUpdateManyAndReturnSchema: z.ZodType<Prisma.StaffingShiftUpdateManyAndReturnArgs> = z.object({ select: StaffingShiftSelectObjectSchema.optional(), data: StaffingShiftUpdateManyMutationInputObjectSchema, where: StaffingShiftWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.StaffingShiftUpdateManyAndReturnArgs>;

export const StaffingShiftUpdateManyAndReturnZodSchema = z.object({ select: StaffingShiftSelectObjectSchema.optional(), data: StaffingShiftUpdateManyMutationInputObjectSchema, where: StaffingShiftWhereInputObjectSchema.optional() }).strict();