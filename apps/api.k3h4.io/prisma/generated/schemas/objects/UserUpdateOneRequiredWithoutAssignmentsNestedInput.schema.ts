import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutAssignmentsInputObjectSchema as UserCreateWithoutAssignmentsInputObjectSchema } from './UserCreateWithoutAssignmentsInput.schema';
import { UserUncheckedCreateWithoutAssignmentsInputObjectSchema as UserUncheckedCreateWithoutAssignmentsInputObjectSchema } from './UserUncheckedCreateWithoutAssignmentsInput.schema';
import { UserCreateOrConnectWithoutAssignmentsInputObjectSchema as UserCreateOrConnectWithoutAssignmentsInputObjectSchema } from './UserCreateOrConnectWithoutAssignmentsInput.schema';
import { UserUpsertWithoutAssignmentsInputObjectSchema as UserUpsertWithoutAssignmentsInputObjectSchema } from './UserUpsertWithoutAssignmentsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutAssignmentsInputObjectSchema as UserUpdateToOneWithWhereWithoutAssignmentsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutAssignmentsInput.schema';
import { UserUpdateWithoutAssignmentsInputObjectSchema as UserUpdateWithoutAssignmentsInputObjectSchema } from './UserUpdateWithoutAssignmentsInput.schema';
import { UserUncheckedUpdateWithoutAssignmentsInputObjectSchema as UserUncheckedUpdateWithoutAssignmentsInputObjectSchema } from './UserUncheckedUpdateWithoutAssignmentsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutAssignmentsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAssignmentsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAssignmentsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAssignmentsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutAssignmentsInputObjectSchema), z.lazy(() => UserUpdateWithoutAssignmentsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAssignmentsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutAssignmentsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAssignmentsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutAssignmentsNestedInput>;
export const UserUpdateOneRequiredWithoutAssignmentsNestedInputObjectZodSchema = makeSchema();
