import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutStaffingRolesInputObjectSchema as UserUpdateWithoutStaffingRolesInputObjectSchema } from './UserUpdateWithoutStaffingRolesInput.schema';
import { UserUncheckedUpdateWithoutStaffingRolesInputObjectSchema as UserUncheckedUpdateWithoutStaffingRolesInputObjectSchema } from './UserUncheckedUpdateWithoutStaffingRolesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutStaffingRolesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutStaffingRolesInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutStaffingRolesInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutStaffingRolesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutStaffingRolesInput>;
export const UserUpdateToOneWithWhereWithoutStaffingRolesInputObjectZodSchema = makeSchema();
