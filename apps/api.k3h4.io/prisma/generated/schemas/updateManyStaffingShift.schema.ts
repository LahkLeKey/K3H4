import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingShiftUpdateManyMutationInputObjectSchema as StaffingShiftUpdateManyMutationInputObjectSchema } from './objects/StaffingShiftUpdateManyMutationInput.schema';
import { StaffingShiftWhereInputObjectSchema as StaffingShiftWhereInputObjectSchema } from './objects/StaffingShiftWhereInput.schema';

export const StaffingShiftUpdateManySchema: z.ZodType<Prisma.StaffingShiftUpdateManyArgs> = z.object({ data: StaffingShiftUpdateManyMutationInputObjectSchema, where: StaffingShiftWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.StaffingShiftUpdateManyArgs>;

export const StaffingShiftUpdateManyZodSchema = z.object({ data: StaffingShiftUpdateManyMutationInputObjectSchema, where: StaffingShiftWhereInputObjectSchema.optional() }).strict();