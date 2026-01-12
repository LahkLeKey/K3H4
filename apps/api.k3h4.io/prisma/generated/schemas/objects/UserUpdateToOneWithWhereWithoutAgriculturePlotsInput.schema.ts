import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutAgriculturePlotsInputObjectSchema as UserUpdateWithoutAgriculturePlotsInputObjectSchema } from './UserUpdateWithoutAgriculturePlotsInput.schema';
import { UserUncheckedUpdateWithoutAgriculturePlotsInputObjectSchema as UserUncheckedUpdateWithoutAgriculturePlotsInputObjectSchema } from './UserUncheckedUpdateWithoutAgriculturePlotsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutAgriculturePlotsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAgriculturePlotsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutAgriculturePlotsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAgriculturePlotsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAgriculturePlotsInput>;
export const UserUpdateToOneWithWhereWithoutAgriculturePlotsInputObjectZodSchema = makeSchema();
