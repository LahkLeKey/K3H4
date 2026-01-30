import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutActorsInputObjectSchema as UserUpdateWithoutActorsInputObjectSchema } from './UserUpdateWithoutActorsInput.schema';
import { UserUncheckedUpdateWithoutActorsInputObjectSchema as UserUncheckedUpdateWithoutActorsInputObjectSchema } from './UserUncheckedUpdateWithoutActorsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutActorsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutActorsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutActorsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutActorsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutActorsInput>;
export const UserUpdateToOneWithWhereWithoutActorsInputObjectZodSchema = makeSchema();
