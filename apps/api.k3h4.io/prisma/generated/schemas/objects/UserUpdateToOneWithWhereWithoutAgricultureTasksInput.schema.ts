import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutAgricultureTasksInputObjectSchema as UserUpdateWithoutAgricultureTasksInputObjectSchema } from './UserUpdateWithoutAgricultureTasksInput.schema';
import { UserUncheckedUpdateWithoutAgricultureTasksInputObjectSchema as UserUncheckedUpdateWithoutAgricultureTasksInputObjectSchema } from './UserUncheckedUpdateWithoutAgricultureTasksInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutAgricultureTasksInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAgricultureTasksInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutAgricultureTasksInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAgricultureTasksInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAgricultureTasksInput>;
export const UserUpdateToOneWithWhereWithoutAgricultureTasksInputObjectZodSchema = makeSchema();
