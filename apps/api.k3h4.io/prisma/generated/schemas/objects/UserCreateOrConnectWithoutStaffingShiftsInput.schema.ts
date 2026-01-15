import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutStaffingShiftsInputObjectSchema as UserCreateWithoutStaffingShiftsInputObjectSchema } from './UserCreateWithoutStaffingShiftsInput.schema';
import { UserUncheckedCreateWithoutStaffingShiftsInputObjectSchema as UserUncheckedCreateWithoutStaffingShiftsInputObjectSchema } from './UserUncheckedCreateWithoutStaffingShiftsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutStaffingShiftsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutStaffingShiftsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutStaffingShiftsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutStaffingShiftsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutStaffingShiftsInput>;
export const UserCreateOrConnectWithoutStaffingShiftsInputObjectZodSchema = makeSchema();
