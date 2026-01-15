import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutStaffingRolesInputObjectSchema as UserUpdateWithoutStaffingRolesInputObjectSchema } from './UserUpdateWithoutStaffingRolesInput.schema';
import { UserUncheckedUpdateWithoutStaffingRolesInputObjectSchema as UserUncheckedUpdateWithoutStaffingRolesInputObjectSchema } from './UserUncheckedUpdateWithoutStaffingRolesInput.schema';
import { UserCreateWithoutStaffingRolesInputObjectSchema as UserCreateWithoutStaffingRolesInputObjectSchema } from './UserCreateWithoutStaffingRolesInput.schema';
import { UserUncheckedCreateWithoutStaffingRolesInputObjectSchema as UserUncheckedCreateWithoutStaffingRolesInputObjectSchema } from './UserUncheckedCreateWithoutStaffingRolesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutStaffingRolesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutStaffingRolesInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutStaffingRolesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutStaffingRolesInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutStaffingRolesInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutStaffingRolesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutStaffingRolesInput>;
export const UserUpsertWithoutStaffingRolesInputObjectZodSchema = makeSchema();
