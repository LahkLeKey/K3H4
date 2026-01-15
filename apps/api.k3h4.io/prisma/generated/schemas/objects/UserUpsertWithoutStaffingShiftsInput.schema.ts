import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutStaffingShiftsInputObjectSchema as UserUpdateWithoutStaffingShiftsInputObjectSchema } from './UserUpdateWithoutStaffingShiftsInput.schema';
import { UserUncheckedUpdateWithoutStaffingShiftsInputObjectSchema as UserUncheckedUpdateWithoutStaffingShiftsInputObjectSchema } from './UserUncheckedUpdateWithoutStaffingShiftsInput.schema';
import { UserCreateWithoutStaffingShiftsInputObjectSchema as UserCreateWithoutStaffingShiftsInputObjectSchema } from './UserCreateWithoutStaffingShiftsInput.schema';
import { UserUncheckedCreateWithoutStaffingShiftsInputObjectSchema as UserUncheckedCreateWithoutStaffingShiftsInputObjectSchema } from './UserUncheckedCreateWithoutStaffingShiftsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutStaffingShiftsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutStaffingShiftsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutStaffingShiftsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutStaffingShiftsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutStaffingShiftsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutStaffingShiftsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutStaffingShiftsInput>;
export const UserUpsertWithoutStaffingShiftsInputObjectZodSchema = makeSchema();
