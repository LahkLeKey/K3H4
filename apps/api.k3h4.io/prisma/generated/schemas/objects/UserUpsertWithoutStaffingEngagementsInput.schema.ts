import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutStaffingEngagementsInputObjectSchema as UserUpdateWithoutStaffingEngagementsInputObjectSchema } from './UserUpdateWithoutStaffingEngagementsInput.schema';
import { UserUncheckedUpdateWithoutStaffingEngagementsInputObjectSchema as UserUncheckedUpdateWithoutStaffingEngagementsInputObjectSchema } from './UserUncheckedUpdateWithoutStaffingEngagementsInput.schema';
import { UserCreateWithoutStaffingEngagementsInputObjectSchema as UserCreateWithoutStaffingEngagementsInputObjectSchema } from './UserCreateWithoutStaffingEngagementsInput.schema';
import { UserUncheckedCreateWithoutStaffingEngagementsInputObjectSchema as UserUncheckedCreateWithoutStaffingEngagementsInputObjectSchema } from './UserUncheckedCreateWithoutStaffingEngagementsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutStaffingEngagementsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutStaffingEngagementsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutStaffingEngagementsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutStaffingEngagementsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutStaffingEngagementsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutStaffingEngagementsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutStaffingEngagementsInput>;
export const UserUpsertWithoutStaffingEngagementsInputObjectZodSchema = makeSchema();
