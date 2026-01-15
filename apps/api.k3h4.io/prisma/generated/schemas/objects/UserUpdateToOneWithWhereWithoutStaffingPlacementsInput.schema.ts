import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutStaffingPlacementsInputObjectSchema as UserUpdateWithoutStaffingPlacementsInputObjectSchema } from './UserUpdateWithoutStaffingPlacementsInput.schema';
import { UserUncheckedUpdateWithoutStaffingPlacementsInputObjectSchema as UserUncheckedUpdateWithoutStaffingPlacementsInputObjectSchema } from './UserUncheckedUpdateWithoutStaffingPlacementsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutStaffingPlacementsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutStaffingPlacementsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutStaffingPlacementsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutStaffingPlacementsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutStaffingPlacementsInput>;
export const UserUpdateToOneWithWhereWithoutStaffingPlacementsInputObjectZodSchema = makeSchema();
