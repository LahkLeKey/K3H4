import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleUpdateWithoutShiftsInputObjectSchema as StaffingRoleUpdateWithoutShiftsInputObjectSchema } from './StaffingRoleUpdateWithoutShiftsInput.schema';
import { StaffingRoleUncheckedUpdateWithoutShiftsInputObjectSchema as StaffingRoleUncheckedUpdateWithoutShiftsInputObjectSchema } from './StaffingRoleUncheckedUpdateWithoutShiftsInput.schema';
import { StaffingRoleCreateWithoutShiftsInputObjectSchema as StaffingRoleCreateWithoutShiftsInputObjectSchema } from './StaffingRoleCreateWithoutShiftsInput.schema';
import { StaffingRoleUncheckedCreateWithoutShiftsInputObjectSchema as StaffingRoleUncheckedCreateWithoutShiftsInputObjectSchema } from './StaffingRoleUncheckedCreateWithoutShiftsInput.schema';
import { StaffingRoleWhereInputObjectSchema as StaffingRoleWhereInputObjectSchema } from './StaffingRoleWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => StaffingRoleUpdateWithoutShiftsInputObjectSchema), z.lazy(() => StaffingRoleUncheckedUpdateWithoutShiftsInputObjectSchema)]),
  create: z.union([z.lazy(() => StaffingRoleCreateWithoutShiftsInputObjectSchema), z.lazy(() => StaffingRoleUncheckedCreateWithoutShiftsInputObjectSchema)]),
  where: z.lazy(() => StaffingRoleWhereInputObjectSchema).optional()
}).strict();
export const StaffingRoleUpsertWithoutShiftsInputObjectSchema: z.ZodType<Prisma.StaffingRoleUpsertWithoutShiftsInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleUpsertWithoutShiftsInput>;
export const StaffingRoleUpsertWithoutShiftsInputObjectZodSchema = makeSchema();
