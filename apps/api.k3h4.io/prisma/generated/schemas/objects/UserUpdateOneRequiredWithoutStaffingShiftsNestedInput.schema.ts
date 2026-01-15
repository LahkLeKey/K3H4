import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutStaffingShiftsInputObjectSchema as UserCreateWithoutStaffingShiftsInputObjectSchema } from './UserCreateWithoutStaffingShiftsInput.schema';
import { UserUncheckedCreateWithoutStaffingShiftsInputObjectSchema as UserUncheckedCreateWithoutStaffingShiftsInputObjectSchema } from './UserUncheckedCreateWithoutStaffingShiftsInput.schema';
import { UserCreateOrConnectWithoutStaffingShiftsInputObjectSchema as UserCreateOrConnectWithoutStaffingShiftsInputObjectSchema } from './UserCreateOrConnectWithoutStaffingShiftsInput.schema';
import { UserUpsertWithoutStaffingShiftsInputObjectSchema as UserUpsertWithoutStaffingShiftsInputObjectSchema } from './UserUpsertWithoutStaffingShiftsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutStaffingShiftsInputObjectSchema as UserUpdateToOneWithWhereWithoutStaffingShiftsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutStaffingShiftsInput.schema';
import { UserUpdateWithoutStaffingShiftsInputObjectSchema as UserUpdateWithoutStaffingShiftsInputObjectSchema } from './UserUpdateWithoutStaffingShiftsInput.schema';
import { UserUncheckedUpdateWithoutStaffingShiftsInputObjectSchema as UserUncheckedUpdateWithoutStaffingShiftsInputObjectSchema } from './UserUncheckedUpdateWithoutStaffingShiftsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutStaffingShiftsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutStaffingShiftsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutStaffingShiftsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutStaffingShiftsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutStaffingShiftsInputObjectSchema), z.lazy(() => UserUpdateWithoutStaffingShiftsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutStaffingShiftsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutStaffingShiftsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutStaffingShiftsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutStaffingShiftsNestedInput>;
export const UserUpdateOneRequiredWithoutStaffingShiftsNestedInputObjectZodSchema = makeSchema();
