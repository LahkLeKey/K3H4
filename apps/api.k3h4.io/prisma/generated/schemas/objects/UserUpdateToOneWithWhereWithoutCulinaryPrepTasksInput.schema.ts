import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutCulinaryPrepTasksInputObjectSchema as UserUpdateWithoutCulinaryPrepTasksInputObjectSchema } from './UserUpdateWithoutCulinaryPrepTasksInput.schema';
import { UserUncheckedUpdateWithoutCulinaryPrepTasksInputObjectSchema as UserUncheckedUpdateWithoutCulinaryPrepTasksInputObjectSchema } from './UserUncheckedUpdateWithoutCulinaryPrepTasksInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutCulinaryPrepTasksInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutCulinaryPrepTasksInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutCulinaryPrepTasksInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCulinaryPrepTasksInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCulinaryPrepTasksInput>;
export const UserUpdateToOneWithWhereWithoutCulinaryPrepTasksInputObjectZodSchema = makeSchema();
