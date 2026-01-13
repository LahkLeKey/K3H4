import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutAgricultureInventoryMovementsInputObjectSchema as UserCreateWithoutAgricultureInventoryMovementsInputObjectSchema } from './UserCreateWithoutAgricultureInventoryMovementsInput.schema';
import { UserUncheckedCreateWithoutAgricultureInventoryMovementsInputObjectSchema as UserUncheckedCreateWithoutAgricultureInventoryMovementsInputObjectSchema } from './UserUncheckedCreateWithoutAgricultureInventoryMovementsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutAgricultureInventoryMovementsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAgricultureInventoryMovementsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutAgricultureInventoryMovementsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAgricultureInventoryMovementsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutAgricultureInventoryMovementsInput>;
export const UserCreateOrConnectWithoutAgricultureInventoryMovementsInputObjectZodSchema = makeSchema();
