import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutAgricultureInventoriesInputObjectSchema as UserCreateWithoutAgricultureInventoriesInputObjectSchema } from './UserCreateWithoutAgricultureInventoriesInput.schema';
import { UserUncheckedCreateWithoutAgricultureInventoriesInputObjectSchema as UserUncheckedCreateWithoutAgricultureInventoriesInputObjectSchema } from './UserUncheckedCreateWithoutAgricultureInventoriesInput.schema';
import { UserCreateOrConnectWithoutAgricultureInventoriesInputObjectSchema as UserCreateOrConnectWithoutAgricultureInventoriesInputObjectSchema } from './UserCreateOrConnectWithoutAgricultureInventoriesInput.schema';
import { UserUpsertWithoutAgricultureInventoriesInputObjectSchema as UserUpsertWithoutAgricultureInventoriesInputObjectSchema } from './UserUpsertWithoutAgricultureInventoriesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutAgricultureInventoriesInputObjectSchema as UserUpdateToOneWithWhereWithoutAgricultureInventoriesInputObjectSchema } from './UserUpdateToOneWithWhereWithoutAgricultureInventoriesInput.schema';
import { UserUpdateWithoutAgricultureInventoriesInputObjectSchema as UserUpdateWithoutAgricultureInventoriesInputObjectSchema } from './UserUpdateWithoutAgricultureInventoriesInput.schema';
import { UserUncheckedUpdateWithoutAgricultureInventoriesInputObjectSchema as UserUncheckedUpdateWithoutAgricultureInventoriesInputObjectSchema } from './UserUncheckedUpdateWithoutAgricultureInventoriesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutAgricultureInventoriesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAgricultureInventoriesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAgricultureInventoriesInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAgricultureInventoriesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutAgricultureInventoriesInputObjectSchema), z.lazy(() => UserUpdateWithoutAgricultureInventoriesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAgricultureInventoriesInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutAgricultureInventoriesNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAgricultureInventoriesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutAgricultureInventoriesNestedInput>;
export const UserUpdateOneRequiredWithoutAgricultureInventoriesNestedInputObjectZodSchema = makeSchema();
