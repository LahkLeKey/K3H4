import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutStaffingShiftsInputObjectSchema as UserCreateWithoutStaffingShiftsInputObjectSchema } from './UserCreateWithoutStaffingShiftsInput.schema';
import { UserUncheckedCreateWithoutStaffingShiftsInputObjectSchema as UserUncheckedCreateWithoutStaffingShiftsInputObjectSchema } from './UserUncheckedCreateWithoutStaffingShiftsInput.schema';
import { UserCreateOrConnectWithoutStaffingShiftsInputObjectSchema as UserCreateOrConnectWithoutStaffingShiftsInputObjectSchema } from './UserCreateOrConnectWithoutStaffingShiftsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutStaffingShiftsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutStaffingShiftsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutStaffingShiftsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutStaffingShiftsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutStaffingShiftsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutStaffingShiftsInput>;
export const UserCreateNestedOneWithoutStaffingShiftsInputObjectZodSchema = makeSchema();
