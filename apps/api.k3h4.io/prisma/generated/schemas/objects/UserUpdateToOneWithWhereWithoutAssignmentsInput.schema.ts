import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutAssignmentsInputObjectSchema as UserUpdateWithoutAssignmentsInputObjectSchema } from './UserUpdateWithoutAssignmentsInput.schema';
import { UserUncheckedUpdateWithoutAssignmentsInputObjectSchema as UserUncheckedUpdateWithoutAssignmentsInputObjectSchema } from './UserUncheckedUpdateWithoutAssignmentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutAssignmentsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAssignmentsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutAssignmentsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAssignmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAssignmentsInput>;
export const UserUpdateToOneWithWhereWithoutAssignmentsInputObjectZodSchema = makeSchema();
