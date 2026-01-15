import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleWhereInputObjectSchema as StaffingRoleWhereInputObjectSchema } from './StaffingRoleWhereInput.schema';
import { StaffingRoleUpdateWithoutShiftsInputObjectSchema as StaffingRoleUpdateWithoutShiftsInputObjectSchema } from './StaffingRoleUpdateWithoutShiftsInput.schema';
import { StaffingRoleUncheckedUpdateWithoutShiftsInputObjectSchema as StaffingRoleUncheckedUpdateWithoutShiftsInputObjectSchema } from './StaffingRoleUncheckedUpdateWithoutShiftsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingRoleWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => StaffingRoleUpdateWithoutShiftsInputObjectSchema), z.lazy(() => StaffingRoleUncheckedUpdateWithoutShiftsInputObjectSchema)])
}).strict();
export const StaffingRoleUpdateToOneWithWhereWithoutShiftsInputObjectSchema: z.ZodType<Prisma.StaffingRoleUpdateToOneWithWhereWithoutShiftsInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleUpdateToOneWithWhereWithoutShiftsInput>;
export const StaffingRoleUpdateToOneWithWhereWithoutShiftsInputObjectZodSchema = makeSchema();
