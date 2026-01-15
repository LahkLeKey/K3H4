import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingShiftWhereInputObjectSchema as StaffingShiftWhereInputObjectSchema } from './objects/StaffingShiftWhereInput.schema';

export const StaffingShiftDeleteManySchema: z.ZodType<Prisma.StaffingShiftDeleteManyArgs> = z.object({ where: StaffingShiftWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.StaffingShiftDeleteManyArgs>;

export const StaffingShiftDeleteManyZodSchema = z.object({ where: StaffingShiftWhereInputObjectSchema.optional() }).strict();