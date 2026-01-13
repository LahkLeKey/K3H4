import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutAssignmentsInputObjectSchema as UserUpdateWithoutAssignmentsInputObjectSchema } from './UserUpdateWithoutAssignmentsInput.schema';
import { UserUncheckedUpdateWithoutAssignmentsInputObjectSchema as UserUncheckedUpdateWithoutAssignmentsInputObjectSchema } from './UserUncheckedUpdateWithoutAssignmentsInput.schema';
import { UserCreateWithoutAssignmentsInputObjectSchema as UserCreateWithoutAssignmentsInputObjectSchema } from './UserCreateWithoutAssignmentsInput.schema';
import { UserUncheckedCreateWithoutAssignmentsInputObjectSchema as UserUncheckedCreateWithoutAssignmentsInputObjectSchema } from './UserUncheckedCreateWithoutAssignmentsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutAssignmentsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAssignmentsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutAssignmentsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAssignmentsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutAssignmentsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutAssignmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutAssignmentsInput>;
export const UserUpsertWithoutAssignmentsInputObjectZodSchema = makeSchema();
