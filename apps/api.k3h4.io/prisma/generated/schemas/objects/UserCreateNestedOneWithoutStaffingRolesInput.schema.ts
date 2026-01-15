import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutStaffingRolesInputObjectSchema as UserCreateWithoutStaffingRolesInputObjectSchema } from './UserCreateWithoutStaffingRolesInput.schema';
import { UserUncheckedCreateWithoutStaffingRolesInputObjectSchema as UserUncheckedCreateWithoutStaffingRolesInputObjectSchema } from './UserUncheckedCreateWithoutStaffingRolesInput.schema';
import { UserCreateOrConnectWithoutStaffingRolesInputObjectSchema as UserCreateOrConnectWithoutStaffingRolesInputObjectSchema } from './UserCreateOrConnectWithoutStaffingRolesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutStaffingRolesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutStaffingRolesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutStaffingRolesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutStaffingRolesInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutStaffingRolesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutStaffingRolesInput>;
export const UserCreateNestedOneWithoutStaffingRolesInputObjectZodSchema = makeSchema();
