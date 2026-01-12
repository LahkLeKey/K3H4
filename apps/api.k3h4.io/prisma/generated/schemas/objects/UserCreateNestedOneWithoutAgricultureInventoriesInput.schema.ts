import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutAgricultureInventoriesInputObjectSchema as UserCreateWithoutAgricultureInventoriesInputObjectSchema } from './UserCreateWithoutAgricultureInventoriesInput.schema';
import { UserUncheckedCreateWithoutAgricultureInventoriesInputObjectSchema as UserUncheckedCreateWithoutAgricultureInventoriesInputObjectSchema } from './UserUncheckedCreateWithoutAgricultureInventoriesInput.schema';
import { UserCreateOrConnectWithoutAgricultureInventoriesInputObjectSchema as UserCreateOrConnectWithoutAgricultureInventoriesInputObjectSchema } from './UserCreateOrConnectWithoutAgricultureInventoriesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutAgricultureInventoriesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAgricultureInventoriesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAgricultureInventoriesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutAgricultureInventoriesInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAgricultureInventoriesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutAgricultureInventoriesInput>;
export const UserCreateNestedOneWithoutAgricultureInventoriesInputObjectZodSchema = makeSchema();
