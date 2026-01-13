import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutAgricultureInventoriesInputObjectSchema as UserUpdateWithoutAgricultureInventoriesInputObjectSchema } from './UserUpdateWithoutAgricultureInventoriesInput.schema';
import { UserUncheckedUpdateWithoutAgricultureInventoriesInputObjectSchema as UserUncheckedUpdateWithoutAgricultureInventoriesInputObjectSchema } from './UserUncheckedUpdateWithoutAgricultureInventoriesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutAgricultureInventoriesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAgricultureInventoriesInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutAgricultureInventoriesInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAgricultureInventoriesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAgricultureInventoriesInput>;
export const UserUpdateToOneWithWhereWithoutAgricultureInventoriesInputObjectZodSchema = makeSchema();
