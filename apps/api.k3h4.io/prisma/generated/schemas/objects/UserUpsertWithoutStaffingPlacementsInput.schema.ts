import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutStaffingPlacementsInputObjectSchema as UserUpdateWithoutStaffingPlacementsInputObjectSchema } from './UserUpdateWithoutStaffingPlacementsInput.schema';
import { UserUncheckedUpdateWithoutStaffingPlacementsInputObjectSchema as UserUncheckedUpdateWithoutStaffingPlacementsInputObjectSchema } from './UserUncheckedUpdateWithoutStaffingPlacementsInput.schema';
import { UserCreateWithoutStaffingPlacementsInputObjectSchema as UserCreateWithoutStaffingPlacementsInputObjectSchema } from './UserCreateWithoutStaffingPlacementsInput.schema';
import { UserUncheckedCreateWithoutStaffingPlacementsInputObjectSchema as UserUncheckedCreateWithoutStaffingPlacementsInputObjectSchema } from './UserUncheckedCreateWithoutStaffingPlacementsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutStaffingPlacementsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutStaffingPlacementsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutStaffingPlacementsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutStaffingPlacementsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutStaffingPlacementsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutStaffingPlacementsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutStaffingPlacementsInput>;
export const UserUpsertWithoutStaffingPlacementsInputObjectZodSchema = makeSchema();
