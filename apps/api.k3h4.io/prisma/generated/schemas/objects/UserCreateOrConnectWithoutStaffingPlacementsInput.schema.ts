import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutStaffingPlacementsInputObjectSchema as UserCreateWithoutStaffingPlacementsInputObjectSchema } from './UserCreateWithoutStaffingPlacementsInput.schema';
import { UserUncheckedCreateWithoutStaffingPlacementsInputObjectSchema as UserUncheckedCreateWithoutStaffingPlacementsInputObjectSchema } from './UserUncheckedCreateWithoutStaffingPlacementsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutStaffingPlacementsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutStaffingPlacementsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutStaffingPlacementsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutStaffingPlacementsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutStaffingPlacementsInput>;
export const UserCreateOrConnectWithoutStaffingPlacementsInputObjectZodSchema = makeSchema();
