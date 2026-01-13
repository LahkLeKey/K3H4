import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutArcadeRedemptionsInputObjectSchema as UserCreateWithoutArcadeRedemptionsInputObjectSchema } from './UserCreateWithoutArcadeRedemptionsInput.schema';
import { UserUncheckedCreateWithoutArcadeRedemptionsInputObjectSchema as UserUncheckedCreateWithoutArcadeRedemptionsInputObjectSchema } from './UserUncheckedCreateWithoutArcadeRedemptionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutArcadeRedemptionsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutArcadeRedemptionsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutArcadeRedemptionsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutArcadeRedemptionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutArcadeRedemptionsInput>;
export const UserCreateOrConnectWithoutArcadeRedemptionsInputObjectZodSchema = makeSchema();
