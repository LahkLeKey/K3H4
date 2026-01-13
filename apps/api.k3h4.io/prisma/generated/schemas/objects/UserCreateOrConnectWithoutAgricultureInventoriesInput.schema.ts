import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutAgricultureInventoriesInputObjectSchema as UserCreateWithoutAgricultureInventoriesInputObjectSchema } from './UserCreateWithoutAgricultureInventoriesInput.schema';
import { UserUncheckedCreateWithoutAgricultureInventoriesInputObjectSchema as UserUncheckedCreateWithoutAgricultureInventoriesInputObjectSchema } from './UserUncheckedCreateWithoutAgricultureInventoriesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutAgricultureInventoriesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAgricultureInventoriesInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutAgricultureInventoriesInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAgricultureInventoriesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutAgricultureInventoriesInput>;
export const UserCreateOrConnectWithoutAgricultureInventoriesInputObjectZodSchema = makeSchema();
