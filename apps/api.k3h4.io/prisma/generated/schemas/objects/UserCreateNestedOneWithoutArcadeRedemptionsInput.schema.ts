import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutArcadeRedemptionsInputObjectSchema as UserCreateWithoutArcadeRedemptionsInputObjectSchema } from './UserCreateWithoutArcadeRedemptionsInput.schema';
import { UserUncheckedCreateWithoutArcadeRedemptionsInputObjectSchema as UserUncheckedCreateWithoutArcadeRedemptionsInputObjectSchema } from './UserUncheckedCreateWithoutArcadeRedemptionsInput.schema';
import { UserCreateOrConnectWithoutArcadeRedemptionsInputObjectSchema as UserCreateOrConnectWithoutArcadeRedemptionsInputObjectSchema } from './UserCreateOrConnectWithoutArcadeRedemptionsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutArcadeRedemptionsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutArcadeRedemptionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutArcadeRedemptionsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutArcadeRedemptionsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutArcadeRedemptionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutArcadeRedemptionsInput>;
export const UserCreateNestedOneWithoutArcadeRedemptionsInputObjectZodSchema = makeSchema();
