import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutAgricultureSlotsInputObjectSchema as UserUpdateWithoutAgricultureSlotsInputObjectSchema } from './UserUpdateWithoutAgricultureSlotsInput.schema';
import { UserUncheckedUpdateWithoutAgricultureSlotsInputObjectSchema as UserUncheckedUpdateWithoutAgricultureSlotsInputObjectSchema } from './UserUncheckedUpdateWithoutAgricultureSlotsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutAgricultureSlotsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAgricultureSlotsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutAgricultureSlotsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAgricultureSlotsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAgricultureSlotsInput>;
export const UserUpdateToOneWithWhereWithoutAgricultureSlotsInputObjectZodSchema = makeSchema();
