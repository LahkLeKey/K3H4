import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutAgriculturePlotsInputObjectSchema as UserCreateWithoutAgriculturePlotsInputObjectSchema } from './UserCreateWithoutAgriculturePlotsInput.schema';
import { UserUncheckedCreateWithoutAgriculturePlotsInputObjectSchema as UserUncheckedCreateWithoutAgriculturePlotsInputObjectSchema } from './UserUncheckedCreateWithoutAgriculturePlotsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutAgriculturePlotsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAgriculturePlotsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutAgriculturePlotsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAgriculturePlotsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutAgriculturePlotsInput>;
export const UserCreateOrConnectWithoutAgriculturePlotsInputObjectZodSchema = makeSchema();
