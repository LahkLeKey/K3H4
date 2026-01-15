import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutStaffingRolesInputObjectSchema as UserCreateWithoutStaffingRolesInputObjectSchema } from './UserCreateWithoutStaffingRolesInput.schema';
import { UserUncheckedCreateWithoutStaffingRolesInputObjectSchema as UserUncheckedCreateWithoutStaffingRolesInputObjectSchema } from './UserUncheckedCreateWithoutStaffingRolesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutStaffingRolesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutStaffingRolesInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutStaffingRolesInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutStaffingRolesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutStaffingRolesInput>;
export const UserCreateOrConnectWithoutStaffingRolesInputObjectZodSchema = makeSchema();
