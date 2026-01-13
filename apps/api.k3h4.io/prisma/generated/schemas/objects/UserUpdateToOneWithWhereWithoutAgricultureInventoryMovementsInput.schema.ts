import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutAgricultureInventoryMovementsInputObjectSchema as UserUpdateWithoutAgricultureInventoryMovementsInputObjectSchema } from './UserUpdateWithoutAgricultureInventoryMovementsInput.schema';
import { UserUncheckedUpdateWithoutAgricultureInventoryMovementsInputObjectSchema as UserUncheckedUpdateWithoutAgricultureInventoryMovementsInputObjectSchema } from './UserUncheckedUpdateWithoutAgricultureInventoryMovementsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutAgricultureInventoryMovementsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAgricultureInventoryMovementsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutAgricultureInventoryMovementsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAgricultureInventoryMovementsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAgricultureInventoryMovementsInput>;
export const UserUpdateToOneWithWhereWithoutAgricultureInventoryMovementsInputObjectZodSchema = makeSchema();
