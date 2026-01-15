import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutStaffingPlacementsInputObjectSchema as UserCreateWithoutStaffingPlacementsInputObjectSchema } from './UserCreateWithoutStaffingPlacementsInput.schema';
import { UserUncheckedCreateWithoutStaffingPlacementsInputObjectSchema as UserUncheckedCreateWithoutStaffingPlacementsInputObjectSchema } from './UserUncheckedCreateWithoutStaffingPlacementsInput.schema';
import { UserCreateOrConnectWithoutStaffingPlacementsInputObjectSchema as UserCreateOrConnectWithoutStaffingPlacementsInputObjectSchema } from './UserCreateOrConnectWithoutStaffingPlacementsInput.schema';
import { UserUpsertWithoutStaffingPlacementsInputObjectSchema as UserUpsertWithoutStaffingPlacementsInputObjectSchema } from './UserUpsertWithoutStaffingPlacementsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutStaffingPlacementsInputObjectSchema as UserUpdateToOneWithWhereWithoutStaffingPlacementsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutStaffingPlacementsInput.schema';
import { UserUpdateWithoutStaffingPlacementsInputObjectSchema as UserUpdateWithoutStaffingPlacementsInputObjectSchema } from './UserUpdateWithoutStaffingPlacementsInput.schema';
import { UserUncheckedUpdateWithoutStaffingPlacementsInputObjectSchema as UserUncheckedUpdateWithoutStaffingPlacementsInputObjectSchema } from './UserUncheckedUpdateWithoutStaffingPlacementsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutStaffingPlacementsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutStaffingPlacementsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutStaffingPlacementsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutStaffingPlacementsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutStaffingPlacementsInputObjectSchema), z.lazy(() => UserUpdateWithoutStaffingPlacementsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutStaffingPlacementsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutStaffingPlacementsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutStaffingPlacementsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutStaffingPlacementsNestedInput>;
export const UserUpdateOneRequiredWithoutStaffingPlacementsNestedInputObjectZodSchema = makeSchema();
