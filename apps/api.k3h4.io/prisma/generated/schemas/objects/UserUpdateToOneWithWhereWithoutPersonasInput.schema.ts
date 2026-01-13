import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutPersonasInputObjectSchema as UserUpdateWithoutPersonasInputObjectSchema } from './UserUpdateWithoutPersonasInput.schema';
import { UserUncheckedUpdateWithoutPersonasInputObjectSchema as UserUncheckedUpdateWithoutPersonasInputObjectSchema } from './UserUncheckedUpdateWithoutPersonasInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutPersonasInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutPersonasInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutPersonasInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPersonasInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPersonasInput>;
export const UserUpdateToOneWithWhereWithoutPersonasInputObjectZodSchema = makeSchema();
