import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutFreightLoadsInputObjectSchema as UserUpdateWithoutFreightLoadsInputObjectSchema } from './UserUpdateWithoutFreightLoadsInput.schema';
import { UserUncheckedUpdateWithoutFreightLoadsInputObjectSchema as UserUncheckedUpdateWithoutFreightLoadsInputObjectSchema } from './UserUncheckedUpdateWithoutFreightLoadsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutFreightLoadsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutFreightLoadsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutFreightLoadsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutFreightLoadsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutFreightLoadsInput>;
export const UserUpdateToOneWithWhereWithoutFreightLoadsInputObjectZodSchema = makeSchema();
