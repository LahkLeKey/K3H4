import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutStaffingShiftsInputObjectSchema as UserUpdateWithoutStaffingShiftsInputObjectSchema } from './UserUpdateWithoutStaffingShiftsInput.schema';
import { UserUncheckedUpdateWithoutStaffingShiftsInputObjectSchema as UserUncheckedUpdateWithoutStaffingShiftsInputObjectSchema } from './UserUncheckedUpdateWithoutStaffingShiftsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutStaffingShiftsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutStaffingShiftsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutStaffingShiftsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutStaffingShiftsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutStaffingShiftsInput>;
export const UserUpdateToOneWithWhereWithoutStaffingShiftsInputObjectZodSchema = makeSchema();
