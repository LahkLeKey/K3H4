import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutStaffingEngagementsInputObjectSchema as UserCreateWithoutStaffingEngagementsInputObjectSchema } from './UserCreateWithoutStaffingEngagementsInput.schema';
import { UserUncheckedCreateWithoutStaffingEngagementsInputObjectSchema as UserUncheckedCreateWithoutStaffingEngagementsInputObjectSchema } from './UserUncheckedCreateWithoutStaffingEngagementsInput.schema';
import { UserCreateOrConnectWithoutStaffingEngagementsInputObjectSchema as UserCreateOrConnectWithoutStaffingEngagementsInputObjectSchema } from './UserCreateOrConnectWithoutStaffingEngagementsInput.schema';
import { UserUpsertWithoutStaffingEngagementsInputObjectSchema as UserUpsertWithoutStaffingEngagementsInputObjectSchema } from './UserUpsertWithoutStaffingEngagementsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutStaffingEngagementsInputObjectSchema as UserUpdateToOneWithWhereWithoutStaffingEngagementsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutStaffingEngagementsInput.schema';
import { UserUpdateWithoutStaffingEngagementsInputObjectSchema as UserUpdateWithoutStaffingEngagementsInputObjectSchema } from './UserUpdateWithoutStaffingEngagementsInput.schema';
import { UserUncheckedUpdateWithoutStaffingEngagementsInputObjectSchema as UserUncheckedUpdateWithoutStaffingEngagementsInputObjectSchema } from './UserUncheckedUpdateWithoutStaffingEngagementsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutStaffingEngagementsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutStaffingEngagementsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutStaffingEngagementsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutStaffingEngagementsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutStaffingEngagementsInputObjectSchema), z.lazy(() => UserUpdateWithoutStaffingEngagementsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutStaffingEngagementsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutStaffingEngagementsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutStaffingEngagementsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutStaffingEngagementsNestedInput>;
export const UserUpdateOneRequiredWithoutStaffingEngagementsNestedInputObjectZodSchema = makeSchema();
