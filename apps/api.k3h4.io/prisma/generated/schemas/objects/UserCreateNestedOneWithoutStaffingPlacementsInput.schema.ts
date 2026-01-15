import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutStaffingPlacementsInputObjectSchema as UserCreateWithoutStaffingPlacementsInputObjectSchema } from './UserCreateWithoutStaffingPlacementsInput.schema';
import { UserUncheckedCreateWithoutStaffingPlacementsInputObjectSchema as UserUncheckedCreateWithoutStaffingPlacementsInputObjectSchema } from './UserUncheckedCreateWithoutStaffingPlacementsInput.schema';
import { UserCreateOrConnectWithoutStaffingPlacementsInputObjectSchema as UserCreateOrConnectWithoutStaffingPlacementsInputObjectSchema } from './UserCreateOrConnectWithoutStaffingPlacementsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutStaffingPlacementsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutStaffingPlacementsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutStaffingPlacementsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutStaffingPlacementsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutStaffingPlacementsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutStaffingPlacementsInput>;
export const UserCreateNestedOneWithoutStaffingPlacementsInputObjectZodSchema = makeSchema();
