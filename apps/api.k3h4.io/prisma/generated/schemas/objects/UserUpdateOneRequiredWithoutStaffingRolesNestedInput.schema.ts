import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutStaffingRolesInputObjectSchema as UserCreateWithoutStaffingRolesInputObjectSchema } from './UserCreateWithoutStaffingRolesInput.schema';
import { UserUncheckedCreateWithoutStaffingRolesInputObjectSchema as UserUncheckedCreateWithoutStaffingRolesInputObjectSchema } from './UserUncheckedCreateWithoutStaffingRolesInput.schema';
import { UserCreateOrConnectWithoutStaffingRolesInputObjectSchema as UserCreateOrConnectWithoutStaffingRolesInputObjectSchema } from './UserCreateOrConnectWithoutStaffingRolesInput.schema';
import { UserUpsertWithoutStaffingRolesInputObjectSchema as UserUpsertWithoutStaffingRolesInputObjectSchema } from './UserUpsertWithoutStaffingRolesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutStaffingRolesInputObjectSchema as UserUpdateToOneWithWhereWithoutStaffingRolesInputObjectSchema } from './UserUpdateToOneWithWhereWithoutStaffingRolesInput.schema';
import { UserUpdateWithoutStaffingRolesInputObjectSchema as UserUpdateWithoutStaffingRolesInputObjectSchema } from './UserUpdateWithoutStaffingRolesInput.schema';
import { UserUncheckedUpdateWithoutStaffingRolesInputObjectSchema as UserUncheckedUpdateWithoutStaffingRolesInputObjectSchema } from './UserUncheckedUpdateWithoutStaffingRolesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutStaffingRolesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutStaffingRolesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutStaffingRolesInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutStaffingRolesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutStaffingRolesInputObjectSchema), z.lazy(() => UserUpdateWithoutStaffingRolesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutStaffingRolesInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutStaffingRolesNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutStaffingRolesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutStaffingRolesNestedInput>;
export const UserUpdateOneRequiredWithoutStaffingRolesNestedInputObjectZodSchema = makeSchema();
